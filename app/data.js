// Angka Nusantara — data statistik Indonesia.
// Setiap angka dibulatkan dengan jujur dan selalu disertai sumber + tahun.
// Sumber: BPS (Badan Pusat Statistik), Bank Dunia (World Bank), IMF, Kemenkes, APJII.
// Tidak ada angka yang diambil dari internet saat halaman dibuka: semua angka
// tertulis di file ini, jadi situs bekerja tanpa jaringan.

export const COUNTRY = {
  name: "Indonesia",
  tagline: "Angka resmi Indonesia, satu tempat.",
  updated: "Diperbarui November 2026",
};

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];

// Seri tahunan 2019-2024. Nilai "sekitar" ditandai dengan pembulatan yang wajar.
export const SERIES = {
  population: {
    label: "Penduduk",
    unit: "juta jiwa",
    source: "BPS, estimasi pertengahan tahun (2020: hasil Sensus Penduduk)",
    values: { 2019: 266.9, 2020: 270.2, 2021: 273.9, 2022: 275.8, 2023: 278.7, 2024: 281.6 },
  },
  gdpGrowth: {
    label: "Pertumbuhan ekonomi",
    unit: "% per tahun",
    source: "BPS, pertumbuhan PDB riil (y-on-y)",
    values: { 2019: 5.02, 2020: -2.07, 2021: 3.7, 2022: 5.31, 2023: 5.05, 2024: 5.03 },
  },
  inflation: {
    label: "Inflasi",
    unit: "% per tahun",
    source: "BPS, inflasi IHK Desember ke Desember (y-on-y)",
    values: { 2019: 2.72, 2020: 1.68, 2021: 1.87, 2022: 5.51, 2023: 2.61, 2024: 1.57 },
  },
  unemployment: {
    label: "Pengangguran terbuka",
    unit: "% angkatan kerja",
    source: "BPS, Tingkat Pengangguran Terbuka, Agustus",
    values: { 2019: 5.28, 2020: 7.07, 2021: 6.49, 2022: 5.86, 2023: 5.45, 2024: 4.91 },
  },
  poverty: {
    label: "Kemiskinan",
    unit: "% penduduk",
    source: "BPS, persentase penduduk miskin (September; 2020 Maret)",
    values: { 2019: 9.22, 2020: 10.19, 2021: 9.71, 2022: 9.57, 2023: 9.36, 2024: 8.57 },
  },
  gdpUsd: {
    label: "PDB nominal",
    unit: "miliar dolar AS",
    source: "IMF, World Economic Outlook (perkiraan)",
    values: { 2019: 1120, 2020: 1060, 2021: 1190, 2022: 1320, 2023: 1370, 2024: 1400 },
  },
  gdpIdr: {
    label: "PDB harga berlaku",
    unit: "triliun rupiah",
    source: "BPS, PDB atas dasar harga berlaku",
    values: { 2019: 15834, 2020: 15434, 2021: 16977, 2022: 19588, 2023: 20892, 2024: 22139 },
  },
};

// Kartu utama di beranda — angka terbaru (2024, kecuali disebut lain).
export const HEADLINE = [
  { key: "population", value: "281,6 jt", label: "Penduduk", year: "2024", source: "BPS" },
  { key: "gdpGrowth", value: "5,03%", label: "Pertumbuhan ekonomi", year: "2024", source: "BPS" },
  { key: "inflation", value: "1,57%", label: "Inflasi", year: "2024", source: "BPS" },
  { key: "unemployment", value: "4,91%", label: "Pengangguran terbuka", year: "Agustus 2024", source: "BPS" },
  { key: "poverty", value: "8,57%", label: "Penduduk miskin", year: "September 2024", source: "BPS" },
  { key: "gdpUsd", value: "US$ 1,40 tr", label: "PDB nominal", year: "2024", source: "IMF" },
];

// Struktur umur penduduk 2024 (perkiraan BPS, dibulatkan).
export const AGE_GROUPS = [
  { group: "0–14 tahun", share: 24.5, millions: 69.0, note: "anak-anak" },
  { group: "15–64 tahun", share: 68.9, millions: 194.0, note: "usia kerja" },
  { group: "65+ tahun", share: 6.6, millions: 18.6, note: "lansia" },
];

// Lima sektor terbesar penyumbang PDB 2024 (BPS, % PDB).
export const SECTORS = [
  { name: "Industri pengolahan", share: 18.7 },
  { name: "Perdagangan besar dan eceran", share: 13.0 },
  { name: "Pertanian, kehutanan, perikanan", share: 12.1 },
  { name: "Konstruksi", share: 10.0 },
  { name: "Pertambangan dan penggalian", share: 8.4 },
];

// 10 provinsi berpenduduk terbanyak, 2024 (perkiraan BPS, juta jiwa; kepadatan jiwa/km2).
export const PROVINCES = [
  { name: "Jawa Barat", pop: 50.4, density: 1424, capital: "Bandung" },
  { name: "Jawa Timur", pop: 41.8, density: 874, capital: "Surabaya" },
  { name: "Jawa Tengah", pop: 37.9, density: 1104, capital: "Semarang" },
  { name: "Sumatera Utara", pop: 16.0, density: 220, capital: "Medan" },
  { name: "Banten", pop: 12.4, density: 1286, capital: "Serang" },
  { name: "DKI Jakarta", pop: 10.7, density: 16080, capital: "Jakarta" },
  { name: "Sulawesi Selatan", pop: 9.5, density: 204, capital: "Makassar" },
  { name: "Lampung", pop: 9.4, density: 273, capital: "Bandar Lampung" },
  { name: "Sumatera Selatan", pop: 9.0, density: 98, capital: "Palembang" },
  { name: "Riau", pop: 6.9, density: 79, capital: "Pekanbaru" },
];

// Fakta singkat: negara.
export const FACTS = [
  { label: "Luas daratan", value: "1,91 jt km²", source: "BPS, 2024" },
  { label: "Jumlah provinsi", value: "38", source: "BPS, 2024" },
  { label: "Kabupaten / kota", value: "514", source: "BPS, 2024" },
  { label: "Kepadatan penduduk", value: "≈ 148 jiwa/km²", source: "BPS, 2024" },
  { label: "Usia median", value: "≈ 30,5 tahun", source: "BPS, 2024" },
  { label: "Pengguna internet", value: "221,6 jt (79,5%)", source: "APJII, 2024" },
];

// Kesehatan.
export const HEALTH = [
  { label: "Harapan hidup saat lahir", value: "≈ 74 tahun", source: "Bank Dunia, 2023" },
  { label: "Kematian bayi", value: "≈ 18 per 1.000 kelahiran hidup", source: "Bank Dunia, 2023" },
  { label: "Balita stunting", value: "21,5%", source: "SSGI Kemenkes, 2023" },
  { label: "Puskesmas", value: "lebih dari 10.000 unit", source: "Kemenkes, 2023" },
  { label: "Peserta JKN (BPJS Kesehatan)", value: "≈ 98% penduduk", source: "BPJS Kesehatan, 2024" },
  { label: "Indeks Pembangunan Manusia", value: "75,02", source: "BPS, 2024" },
];

// Pendidikan.
export const EDUCATION = [
  { label: "Melek huruf usia 15+", value: "96,0%", source: "BPS, 2023" },
  { label: "Rata-rata lama sekolah", value: "9,3 tahun", source: "BPS, 2024" },
  { label: "Harapan lama sekolah", value: "≈ 13,5 tahun", source: "BPS, 2024" },
  { label: "Partisipasi sekolah usia 7–12", value: "99,7%", source: "BPS, 2023" },
  { label: "Partisipasi pendidikan tinggi", value: "≈ 32%", source: "BPS, 2023" },
  { label: "Sekolah dasar (SD/MI)", value: "lebih dari 148.000 sekolah", source: "Kemendikbudristek, 2023" },
];

// Daftar sumber lengkap untuk halaman Sumber.
export const SOURCES = [
  { org: "BPS — Badan Pusat Statistik", what: "Penduduk, PDB, inflasi, pengangguran, kemiskinan, IPM, pendidikan", site: "bps.go.id" },
  { org: "IMF — International Monetary Fund", what: "PDB nominal dolar AS (World Economic Outlook)", site: "imf.org" },
  { org: "Bank Dunia (World Bank)", what: "Harapan hidup, kematian bayi", site: "worldbank.org" },
  { org: "Kemenkes — Kementerian Kesehatan", what: "Stunting (SSGI), jumlah puskesmas", site: "kemkes.go.id" },
  { org: "BPJS Kesehatan", what: "Cakupan kepesertaan JKN", site: "bpjs-kesehatan.go.id" },
  { org: "APJII — Asosiasi Penyelenggara Jasa Internet Indonesia", what: "Pengguna internet Indonesia", site: "apjii.or.id" },
  { org: "Kemendikbudristek", what: "Jumlah sekolah dasar", site: "kemdikbud.go.id" },
];

export const METHOD_NOTE =
  "Semua angka di situs ini dibulatkan ke satu desimal agar mudah dibaca; " +
  "angka aslinya dapat dicek pada publikasi sumber yang tercantum di tiap grafik dan tabel. " +
  "Tahun yang tercantum adalah tahun data, bukan tahun publikasi. " +
  "Situs ini bukan situs resmi pemerintah dan tidak berafiliasi dengan BPS atau instansi mana pun.";
