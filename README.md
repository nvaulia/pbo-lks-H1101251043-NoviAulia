
# REST API Perpustakaan

## Identitas Mahasiswa

- Nama: Novi Aulia
- NIM: H1101251043
- Kelas: [Isi Kelas Kamu]
- Mata Kuliah: Pemrograman Berorientasi Objek

## Deskripsi Proyek

REST API Perpustakaan merupakan proyek aplikasi pengelolaan data perpustakaan yang dibuat menggunakan PHP dan MySQL. Aplikasi ini mengintegrasikan backend REST API dengan frontend berbasis HTML, CSS, dan JavaScript. Pengguna dapat mengelola data buku dan kategori melalui halaman aplikasi.

## Daftar Fitur

### 1. Dashboard
- Menampilkan total data buku.
- Menampilkan total kategori buku.
- Menampilkan daftar buku terbaru.
- Menampilkan ringkasan data dari API.

### 2. Manajemen Buku
- Menampilkan seluruh data buku.
- Menambahkan data buku.
- Mengubah data buku.
- Menghapus data buku.
- Mengambil data buku melalui REST API.

### 3. Manajemen Kategori
- Menampilkan seluruh data kategori.
- Menambahkan kategori baru.
- Mengubah data kategori.
- Menghapus kategori.
- Menampilkan notifikasi setelah operasi CRUD.

### 4. Integrasi Backend dan Frontend
- Menghubungkan frontend dengan backend menggunakan REST API.
- Menggunakan database MySQL untuk menyimpan data.
- Mengatur akses API menggunakan CORS.
- Menguji endpoint API menggunakan Postman.

## Teknologi yang Digunakan

- PHP
- MySQL
- HTML
- CSS
- JavaScript
- Tailwind CSS
- Postman
- Visual Studio Code

## Cara Menjalankan Proyek

### 1. Persiapan

Pastikan perangkat sudah memiliki:
- PHP.
- MySQL.
- Composer.
- Visual Studio Code.

Pastikan database MySQL sudah aktif dan konfigurasi koneksi database pada backend sudah sesuai dengan pengaturan lokal.

### 2. Menjalankan Backend

Buka terminal pada Visual Studio Code, kemudian masuk ke folder backend:

bash
cd rest-api-perpustakaan


Jalankan server backend dengan perintah:

bash
php -S localhost:8000 -t public

Backend berjalan melalui alamat:

http://localhost:8000

### 3. Menjalankan Frontend

Buka terminal baru di Visual Studio Code. Masuk ke folder frontend:

bash
cd frontend-perpustakaan

Jalankan server frontend:
bash
php -S localhost:3000


Frontend berjalan melalui alamat:

http://localhost:3000

### 4. Membuka Aplikasi

Buka browser, kemudian akses alamat berikut:

http://localhost:3000

Pastikan server backend dan frontend tetap berjalan selama aplikasi digunakan.

## Struktur Proyek

text
pbo-lks-H1101251043-NoviAulia/
├── rest-api-perpustakaan/
│   ├── public/
│   ├── src/
│   ├── vendor/
│   └── ...
├── frontend-perpustakaan/
│   ├── index.html
│   ├── css/
│   └── js/
├── pertemuan-01/
├── pertemuan-02/
├── pertemuan-03/
├── pertemuan-04/
├── pertemuan-05/
├── pertemuan-06/
├── pertemuan-07/
├── screenshot-final/
├── .gitignore
└── README.md

## Penutup

Proyek ini dibuat sebagai bagian dari penyelesaian Lembar Kerja Praktikum Pemrograman Berorientasi Objek. Melalui proyek ini, mahasiswa mempraktikkan pembuatan REST API, pengelolaan database MySQL, implementasi operasi CRUD, serta integrasi backend dan frontend.
