# Angka Nusantara — Statistik Indonesia

[![Angka Nusantara](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ChristaNavisa/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ChristaNavisa/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Situs statistik Indonesia yang berdiri sendiri: penduduk, ekonomi, kesehatan,
pendidikan, dan provinsi — tiap angka disertai sumber dan tahunnya.

## Isi situs

- **Beranda** — angka utama 2024, grafik penduduk, provinsi terpadat.
- **Penduduk** — tren 2019–2024, komposisi umur, tabel provinsi yang bisa diurutkan.
- **Ekonomi** — pemilih tahun 2019–2024, pengalih satuan PDB (dolar/rupiah),
  grafik pertumbuhan, inflasi, dan sektor penyumbang PDB.
- **Kesehatan** — harapan hidup, kematian bayi, stunting, layanan kesehatan.
- **Pendidikan** — melek huruf, lama sekolah, partisipasi sekolah.
- **Provinsi** — tabel 10 provinsi terpadat dengan pencarian dan pengurutan.
- **Sumber** — daftar lengkap sumber data dan metode.

Semua angka berasal dari BPS, Bank Dunia, IMF, Kemenkes, BPJS Kesehatan,
dan APJII; tiap angka diberi label sumber dan tahun. Situs bekerja tanpa
jaringan: tanpa pustaka luar, tanpa font web, tanpa permintaan jaringan.

## Struktur

- `app/index.html` — kerangka halaman
- `app/style.css` — seluruh gaya
- `app/data.js` — semua angka beserta sumber dan tahun
- `app/charts.js` — grafik SVG buatan sendiri (batang, garis, batang horizontal)
- `app/pages.js` — tiap halaman situs
- `app/app.js` — perute hash dan pengendali (pemilih tahun, pengurutan, pencarian)
- `main.ts` — program penyerahan: menyalin `app/` dan `screenshots/` ke
  `/output` dan menulis `dossier.json`
- `vendor/makefun-frontend.ts` — pustaka dossier dari kit, tanpa perubahan

## Lisensi

MIT. Lihat `LICENSE`.
