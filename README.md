# DeadlineKu

Tracker deadline tugas kuliah untuk mahasiswa Sistem Informasi. Aplikasi memiliki *panic meter* yang berubah dari Santai sampai Panik berdasarkan seberapa dekat deadline tugas.

**Fitur utama:**
1. Menambahkan tugas.
2. Melihat daftar tugas dan hitung mundur deadline.
3. Menandai tugas sebagai selesai.
4. Menghapus tugas.

**Stack:** Node.js 20 + Express. Data tugas disimpan dalam file JSON menggunakan Docker volume.

## Prasyarat

- Docker Desktop sudah berjalan.
- Git.
- Periksa instalasi dengan `docker version` dan `docker compose version`.
- Versi yang diuji: Docker 28.5.1 dan Docker Compose v2.40.2-desktop.1.

## 1. Clone dan konfigurasi

```powershell
git clone https://github.com/ashilaazka/deadlineku.git
cd deadlineku
Copy-Item .env.example .env
```

Variabel di `.env.example`:

| Variabel | Fungsi | Default |
|---|---|---|
| `PORT` | Port aplikasi di dalam container | `3000` |
| `HOST_PORT` | Port aplikasi di komputer | `8080` |

## 2. Build dan jalankan

```powershell
docker compose up --build -d
```

## 3. Cek aplikasi

- Aplikasi: http://localhost:8080
- Health check: http://localhost:8080/health
- Respons health check yang diharapkan: `{"status":"ok","app":"DeadlineKu"}`

## 4. Periksa status dan logs

```powershell
docker compose ps
docker compose logs
docker compose logs -f
docker image ls
```

Tekan `Ctrl+C` untuk berhenti mengikuti log secara langsung.

## 5. Stop dan bersihkan

```powershell
docker compose down
```

Perintah tersebut menghentikan dan menghapus container, tetapi data tetap tersimpan di Docker volume.

**Peringatan:** Perintah berikut juga menghapus volume beserta data tugas yang tersimpan. Gunakan hanya jika data memang ingin dihapus.

```powershell
docker compose down -v
```

## Troubleshooting

| Masalah | Solusi |
|---|---|
| `Cannot connect to the Docker daemon` | Pastikan Docker Desktop sudah berjalan. |
| Port 8080 sudah dipakai | Ubah `HOST_PORT` di `.env`, lalu jalankan `docker compose up -d` lagi. |
| Browser tidak bisa terhubung | Periksa `docker compose ps` dan `docker compose logs`. |
| `.env` tidak ditemukan | Jalankan `Copy-Item .env.example .env` di PowerShell. |

## Known limitations

- Data disimpan dalam file JSON. Penyimpanan ini cocok untuk demonstrasi, tetapi tidak dirancang untuk banyak pengguna yang mengakses data secara bersamaan.