// Angka Nusantara — perute dan pengendali.
// Satu halaman, rute hash: #/ #/penduduk #/ekonomi #/kesehatan
// #/pendidikan #/provinsi #/sumber. Semua kendali bekerja tanpa jaringan.

import { renderHome, renderPenduduk, renderEkonomi, renderKesehatan, renderPendidikan, renderProvinsi, renderSumber, sortedProvinces } from "./pages.js";
import { fmtId } from "./charts.js";

const state = {
  year: 2024,
  unit: "usd",
  sortKey: "pop",
  sortDir: "desc",
  query: "",
};

const ROUTES = {
  "": { title: "Beranda", render: () => renderHome() },
  penduduk: { title: "Penduduk", render: () => renderPenduduk(state) },
  ekonomi: { title: "Ekonomi", render: () => renderEkonomi(state) },
  kesehatan: { title: "Kesehatan", render: () => renderKesehatan() },
  pendidikan: { title: "Pendidikan", render: () => renderPendidikan() },
  provinsi: { title: "Provinsi", render: () => renderProvinsi(state) },
  sumber: { title: "Sumber", render: () => renderSumber() },
};

const NAV = [
  ["", "Beranda"],
  ["penduduk", "Penduduk"],
  ["ekonomi", "Ekonomi"],
  ["kesehatan", "Kesehatan"],
  ["pendidikan", "Pendidikan"],
  ["provinsi", "Provinsi"],
  ["sumber", "Sumber"],
];

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return ROUTES[hash] ? hash : "";
}

function paintNav(route) {
  document.querySelectorAll("#main-nav a").forEach((a) => {
    const r = a.getAttribute("href").replace(/^#\/?/, "");
    if (r === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}

function wireProvinceTable() {
  const tbody = document.getElementById("province-rows");
  if (!tbody) return;
  const paint = () => {
    const q = (state.query || "").toLowerCase();
    const list = sortedProvinces(state).filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)
    );
    tbody.innerHTML = list.map((p) =>
      `<tr><td>${p.name}</td><td>${p.capital}</td>` +
      `<td class="num">${fmtId(p.pop, 1)}</td><td class="num">${fmtId(p.density, 0)}</td></tr>`).join("") ||
      `<tr><td colspan="4">Tidak ada provinsi yang cocok dengan “${state.query}”.</td></tr>`;
  };
  document.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-sort");
      if (state.sortKey === key) state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      else { state.sortKey = key; state.sortDir = key === "name" || key === "capital" ? "asc" : "desc"; }
      render();
    });
  });
  const search = document.getElementById("province-search");
  if (search) {
    search.addEventListener("input", () => { state.query = search.value; paint(); });
  }
}

function wirePage(route) {
  if (route === "ekonomi") {
    const select = document.getElementById("year-select");
    if (select) {
      select.addEventListener("change", () => { state.year = Number(select.value); render(); });
    }
    document.querySelectorAll("[data-unit]").forEach((btn) => {
      btn.addEventListener("click", () => { state.unit = btn.getAttribute("data-unit"); render(); });
    });
  }
  if (route === "penduduk" || route === "provinsi") wireProvinceTable();
}

function render() {
  const route = currentRoute();
  const view = document.getElementById("view");
  view.innerHTML = ROUTES[route].render();
  paintNav(route);
  document.title = `Angka Nusantara — ${ROUTES[route].title} · Statistik Indonesia`;
  wirePage(route);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
