const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

fs.mkdirSync(DATA_DIR, { recursive: true });

function load() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); }
  catch { return []; }
}
function save(tasks) { fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2)); }

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok", app: "DeadlineKu" }));

// Fitur 1: lihat semua tugas
app.get("/api/tasks", (req, res) => res.json(load()));

// Fitur 2: tambah tugas
app.post("/api/tasks", (req, res) => {
  const { course, title, deadline } = req.body || {};
  if (!course || !title || !deadline) {
    return res.status(400).json({ error: "course, title, dan deadline wajib diisi" });
  }
  const tasks = load();
  const task = { id: Date.now().toString(36), course, title, deadline, done: false };
  tasks.push(task);
  save(tasks);
  console.log(`[+] Tugas ditambah: ${course} - ${title}`);
  res.status(201).json(task);
});

// Fitur 3: tandai selesai / belum
app.patch("/api/tasks/:id", (req, res) => {
  const tasks = load();
  const t = tasks.find((x) => x.id === req.params.id);
  if (!t) return res.status(404).json({ error: "tugas tidak ditemukan" });
  t.done = !t.done;
  save(tasks);
  console.log(`[~] Tugas ${t.done ? "selesai" : "dibuka lagi"}: ${t.title}`);
  res.json(t);
});

// Fitur 4: hapus tugas
app.delete("/api/tasks/:id", (req, res) => {
  const tasks = load().filter((x) => x.id !== req.params.id);
  save(tasks);
  console.log(`[-] Tugas dihapus: ${req.params.id}`);
  res.status(204).end();
});

// Bind ke 0.0.0.0 supaya bisa diakses dari luar container
app.listen(PORT, "0.0.0.0", () => console.log(`DeadlineKu jalan di port ${PORT}`));
