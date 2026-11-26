// Per halaman situs: tiap fungsi mengembalikan HTML lengkap halamannya.
// Semua angka berasal dari data.js — tidak ada angka yang ditulis di sini.

import { COUNTRY, YEARS, SERIES, HEADLINE, AGE_GROUPS, SECTORS, PROVINCES, FACTS, HEALTH, EDUCATION, SOURCES, METHOD_NOTE } from "./data.js";
import { barChart, lineChart, hbarChart, fmtId } from "./charts.js";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sourceNote(text) {
  return `<p class="source">Sumber: ${esc(text)}</p>`;
}

function kpiCard(item) {
  return `<article class="kpi"><p class="kpi-value">${esc(item.value)}</p>` +
    `<p class="kpi-label">${esc(item.label)}</p>` +
    `<p class="kpi-meta">${esc(item.year)} · ${esc(item.source)}</p></article>`;
}

function statRows(items) {
  return `<dl class="stats">` + items.map((it) =>
    `<div class="stat"><dt>${esc(it.label)}</dt><dd>${esc(it.value)}</dd>` +
    `<dd class="stat-source">${esc(it.source)}</dd></div>`).join("") + `</dl>`;
}

function yearPairs(seriesKey) {
  const s = SERIES[seriesKey];
  return YEARS.map((y) => ({ label: String(y), value: s.values[y] }));
}

function sectionHead(title, intro) {
  return `<header class="page-head"><h1>${esc(title)}</h1><p>${esc(intro)}</p></header>`;
}

// ---------------------------------------------------------------- beranda
export function renderHome() {
  const popPairs = yearPairs("population");
  const topProv = PROVINCES.slice(0, 5).map((p) => ({ label: p.name, value: p.pop }));
  const facts = FACTS.map((f) =>
    `<div class="fact"><p class="fact-value">${esc(f.value)}</p><p class="fact-label">${esc(f.label)}</p><p class="fact-source">${esc(f.source)}</p></div>`).join("");
  return `
  ${sectionHead("Indonesia dalam angka", COUNTRY.tagline + " " + COUNTRY.updated + ".")}
  <section class="kpis" aria-label="Angka utama">${HEADLINE.map(kpiCard).join("")}</section>
  <section class="panel">
    <h2>Penduduk 2019–2024</h2>
    <p class="panel-intro">Penduduk Indonesia bertambah sekitar 15 juta jiwa dalam enam tahun — dari 266,9 juta (2019) menjadi 281,6 juta (2024).</p>
    ${lineChart(popPairs, { format: (v) => fmtId(v, 1) + " jt" })}
    ${sourceNote(SERIES.population.source)}
    <p><a class="more" href="#/penduduk">Lihat halaman Penduduk →</a></p>
  </section>
  <section class="panel">
    <h2>Provinsi terpadat</h2>
    <p class="panel-intro">Tiga provinsi di Pulau Jawa menampung lebih dari separuh penduduk Indonesia.</p>
    ${hbarChart(topProv, { format: (v) => fmtId(v, 1) + " jt" })}
    ${sourceNote("BPS, perkiraan pertengahan tahun 2024")}
    <p><a class="more" href="#/provinsi">Lihat semua provinsi →</a></p>
  </section>
  <section class="panel">
    <h2>Sekilas Indonesia</h2>
    <div class="facts">${facts}</div>
    <p><a class="more" href="#/sumber">Semua sumber dan metode →</a></p>
  </section>`;
}

// ---------------------------------------------------------------- penduduk
export function renderPenduduk(state) {
  const popPairs = yearPairs("population");
  const agePairs = AGE_GROUPS.map((a) => ({ label: a.group, value: a.share }));
  const rows = provinceRows(sortedProvinces(state));
  return `
  ${sectionHead("Penduduk", "Berapa banyak, di mana tinggal, dan bagaimana komposisi umurnya.")}
  <section class="panel">
    <h2>Pertumbuhan penduduk 2019–2024</h2>
    ${lineChart(popPairs, { format: (v) => fmtId(v, 1) + " jt" })}
    ${sourceNote(SERIES.population.source)}
  </section>
  <section class="panel">
    <h2>Komposisi umur, 2024</h2>
    <p class="panel-intro">Indonesia masih dalam bonus demografi: hampir 7 dari 10 penduduk berada di usia kerja (15–64 tahun).</p>
    ${hbarChart(agePairs, { format: (v) => fmtId(v, 1) + "%" })}
    <p class="panel-intro">0–14 tahun: ≈ 69,0 juta jiwa · 15–64 tahun: ≈ 194,0 juta jiwa · 65+ tahun: ≈ 18,6 juta jiwa.</p>
    ${sourceNote("BPS, perkiraan 2024 (dibulatkan)")}
  </section>
  <section class="panel">
    <h2>Provinsi berpenduduk terbanyak</h2>
    <p class="panel-intro">Klik judul kolom untuk mengurutkan. Data lengkap ada di halaman Provinsi.</p>
    ${provinceTable(rows, state)}
    ${sourceNote("BPS, perkiraan pertengahan tahun 2024")}
    <p><a class="more" href="#/provinsi">Buka halaman Provinsi →</a></p>
  </section>`;
}

// ---------------------------------------------------------------- ekonomi
export function renderEkonomi(state) {
  const y = state.year;
  const unit = state.unit;
  const gdpSeries = unit === "usd" ? SERIES.gdpUsd : SERIES.gdpIdr;
  const gdpFmt = unit === "usd"
    ? (v) => "US$ " + fmtId(v / 1000, 2) + " tr"
    : (v) => "Rp " + fmtId(v, 0) + " tr";
  const gdpPairs = YEARS.map((yr) => ({ label: String(yr), value: gdpSeries.values[yr] }));
  const growthPairs = yearPairs("gdpGrowth");
  const inflPairs = yearPairs("inflation");
  const hi = YEARS.indexOf(y);
  const options = YEARS.map((yr) => `<option value="${yr}"${yr === y ? " selected" : ""}>${yr}</option>`).join("");
  const sectorPairs = SECTORS.map((s) => ({ label: s.name, value: s.share }));
  return `
  ${sectionHead("Ekonomi", "Pertumbuhan, harga, pekerjaan, dan kemiskinan — tahun demi tahun.")}
  <section class="panel controls">
    <label for="year-select">Pilih tahun:</label>
    <select id="year-select">${options}</select>
    <span class="control-note">Grafik dan angka di bawah mengikuti tahun yang dipilih.</span>
  </section>
  <section class="kpis" aria-label="Angka tahun ${y}">
    ${kpiCard({ value: fmtId(SERIES.gdpGrowth.values[y], 2) + "%", label: "Pertumbuhan ekonomi", year: String(y), source: "BPS" })}
    ${kpiCard({ value: fmtId(SERIES.inflation.values[y], 2) + "%", label: "Inflasi", year: String(y), source: "BPS" })}
    ${kpiCard({ value: fmtId(SERIES.unemployment.values[y], 2) + "%", label: "Pengangguran terbuka", year: "Agustus " + y, source: "BPS" })}
    ${kpiCard({ value: fmtId(SERIES.poverty.values[y], 2) + "%", label: "Penduduk miskin", year: String(y), source: "BPS" })}
  </section>
  <section class="panel">
    <h2>Pertumbuhan ekonomi 2019–2024</h2>
    <p class="panel-intro">Kontraksi 2020 adalah dampak pandemi COVID-19; sejak 2022 pertumbuhan kembali stabil di atas 5%.</p>
    ${barChart(growthPairs, { highlight: hi, format: (v) => fmtId(v, 2) + "%" })}
    ${sourceNote(SERIES.gdpGrowth.source)}
  </section>
  <section class="panel">
    <h2>Inflasi 2019–2024</h2>
    <p class="panel-intro">Lonjakan 2022 mengikuti penyesuaian harga BBM bersubsidi; 2024 inflasi kembali ke 1,57%.</p>
    ${lineChart(inflPairs, { highlight: hi, format: (v) => fmtId(v, 2) + "%" })}
    ${sourceNote(SERIES.inflation.source)}
  </section>
  <section class="panel">
    <h2>Besaran ekonomi (PDB)</h2>
    <div class="toggle" role="group" aria-label="Satuan PDB">
      <button type="button" data-unit="usd"${unit === "usd" ? ' aria-pressed="true" class="on"' : ""}>Dolar AS</button>
      <button type="button" data-unit="idr"${unit === "idr" ? ' aria-pressed="true" class="on"' : ""}>Rupiah</button>
    </div>
    ${barChart(gdpPairs, { highlight: hi, format: gdpFmt })}
    ${sourceNote(gdpSeries.source)}
    <p class="panel-intro">PDB per kapita 2024: sekitar US$ 4.960 (IMF). PDB 2024 dalam rupiah: Rp 22.139 triliun (BPS).</p>
  </section>
  <section class="panel">
    <h2>Sektor penyumbang PDB terbesar, 2024</h2>
    ${hbarChart(sectorPairs, { format: (v) => fmtId(v, 1) + "%" })}
    ${sourceNote("BPS, distribusi PDB atas dasar harga berlaku, 2024")}
  </section>`;
}

// ---------------------------------------------------------------- kesehatan
export function renderKesehatan() {
  return `
  ${sectionHead("Kesehatan", "Berapa lama hidup, seberapa sehat anak-anak, dan sejauh apa layanan kesehatan menjangkau.")}
  <section class="panel">
    <h2>Angka kesehatan utama</h2>
    ${statRows(HEALTH)}
  </section>
  <section class="panel">
    <h2>Yang perlu dibaca bersama angka ini</h2>
    <p class="panel-intro">Harapan hidup naik dari sekitar 72 tahun (2019) menjadi sekitar 74 tahun (2023) menurut Bank Dunia. Stunting turun perlahan — 21,5% balita pada 2023 menurut Survei Status Gizi Indonesia — dan masih menjadi pekerjaan rumah terbesar di bidang kesehatan anak. Jaminan Kesehatan Nasional kini menjangkau hampir seluruh penduduk.</p>
    <p><a class="more" href="#/sumber">Lihat sumber angka kesehatan →</a></p>
  </section>`;
}

// ---------------------------------------------------------------- pendidikan
export function renderPendidikan() {
  return `
  ${sectionHead("Pendidikan", "Siapa yang bisa membaca, berapa lama bersekolah, dan sejauh apa pendidikan menjangkau.")}
  <section class="panel">
    <h2>Angka pendidikan utama</h2>
    ${statRows(EDUCATION)}
  </section>
  <section class="panel">
    <h2>Yang perlu dibaca bersama angka ini</h2>
    <p class="panel-intro">Hampir semua anak usia sekolah dasar sudah bersekolah (99,7%), tetapi rata-rata lama sekolah baru 9,3 tahun — setara kelas 3 SMP. Artinya, tantangan pendidikan Indonesia kini bukan lagi akses ke sekolah dasar, melainkan menuntaskan pendidikan menengah dan tinggi.</p>
    <p><a class="more" href="#/sumber">Lihat sumber angka pendidikan →</a></p>
  </section>`;
}

// ---------------------------------------------------------------- provinsi
export function sortedProvinces(state) {
  const list = [...PROVINCES];
  const key = state.sortKey || "pop";
  const dir = state.sortDir === "asc" ? 1 : -1;
  list.sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === "string") return av.localeCompare(bv, "id") * dir;
    return (av - bv) * dir;
  });
  return list;
}

function provinceRows(list) {
  return list.map((p) =>
    `<tr><td>${esc(p.name)}</td><td>${esc(p.capital)}</td>` +
    `<td class="num">${fmtId(p.pop, 1)}</td><td class="num">${fmtId(p.density, 0)}</td></tr>`).join("");
}

function provinceTable(rows, state) {
  const arrow = (key) => state.sortKey === key ? (state.sortDir === "asc" ? " ▲" : " ▼") : "";
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr>
      <th><button type="button" data-sort="name">Provinsi${arrow("name")}</button></th>
      <th><button type="button" data-sort="capital">Ibu kota${arrow("capital")}</button></th>
      <th><button type="button" data-sort="pop">Penduduk (juta)${arrow("pop")}</button></th>
      <th><button type="button" data-sort="density">Kepadatan (jiwa/km²)${arrow("density")}</button></th>
    </tr></thead>
    <tbody id="province-rows">${rows}</tbody>
  </table></div>`;
}

export function renderProvinsi(state) {
  const rows = provinceRows(sortedProvinces(state));
  return `
  ${sectionHead("Provinsi", "Sepuluh provinsi berpenduduk terbanyak di Indonesia. Cari dan urutkan sesuka Anda.")}
  <section class="panel controls">
    <label for="province-search">Cari provinsi:</label>
    <input id="province-search" type="search" placeholder="mis. Jawa, Sumatera…" value="${esc(state.query || "")}">
  </section>
  <section class="panel">
    <h2>Tabel provinsi</h2>
    <p class="panel-intro">Klik judul kolom untuk mengurutkan. Kepadatan dihitung dari penduduk dibagi luas daratan provinsi (perkiraan BPS, 2024).</p>
    ${provinceTable(rows, state)}
    ${sourceNote("BPS, perkiraan pertengahan tahun 2024")}
  </section>
  <section class="panel">
    <h2>Catatan</h2>
    <p class="panel-intro">Jawa Barat, Jawa Timur, dan Jawa Tengah — ditambah Banten dan DKI Jakarta — menampung sekitar 56% penduduk Indonesia di Pulau Jawa, padahal luas Jawa hanya sekitar 7% daratan Indonesia. Itulah mengapa kepadatan DKI Jakarta (16.080 jiwa/km²) dua ratus kali lipat Riau (79 jiwa/km²).</p>
  </section>`;
}

// ---------------------------------------------------------------- sumber
export function renderSumber() {
  const rows = SOURCES.map((s) =>
    `<tr><td>${esc(s.org)}</td><td>${esc(s.what)}</td><td>${esc(s.site)}</td></tr>`).join("");
  return `
  ${sectionHead("Sumber dan metode", "Dari mana setiap angka berasal, dan bagaimana situs ini menyajikannya.")}
  <section class="panel">
    <h2>Daftar sumber</h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Lembaga</th><th>Data yang dipakai</th><th>Situs</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>
  </section>
  <section class="panel">
    <h2>Metode</h2>
    <p class="panel-intro">${esc(METHOD_NOTE)}</p>
    <p class="panel-intro">Angka Nusantara adalah situs independen yang dibuat untuk menampilkan data publik. Situs ini bukan situs resmi pemerintah dan tidak berafiliasi dengan BPS, Bank Dunia, IMF, atau instansi mana pun.</p>
  </section>`;
}
