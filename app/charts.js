// Grafik SVG buatan sendiri: diagram batang dan diagram garis.
// Tanpa pustaka, tanpa jaringan. Setiap grafik mengembalikan string SVG
// lengkap dengan label sumbu, nilai, dan keterangan sumber.

const INK = "#1c2b29";
const MUTED = "#5c6f6c";
const TEAL = "#0e4f4a";
const AMBER = "#e8a33d";
const GRID = "#e3ddd0";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Format angka Indonesia: koma sebagai pemisah desimal.
export function fmtId(n, decimals = 1) {
  return Number(n)
    .toFixed(decimals)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(step)));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const out = [];
  for (let v = start; v <= max + 1e-9; v += s) out.push(v);
  return out;
}

// Diagram batang vertikal dari pasangan {label, value}.
// opts: {width, height, highlight (indeks batang yang ditonjolkan), format}
export function barChart(pairs, opts = {}) {
  const W = opts.width || 640;
  const H = opts.height || 300;
  const padL = 56;
  const padR = 12;
  const padT = 18;
  const padB = 34;
  const cw = W - padL - padR;
  const ch = H - padT - padB;
  const values = pairs.map((p) => p.value);
  let min = Math.min(0, ...values);
  let max = Math.max(...values);
  if (max === min) max = min + 1;
  const ticks = niceTicks(min, max);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const y = (v) => padT + ch - ((v - min) / (max - min)) * ch;
  const slot = cw / pairs.length;
  const bw = Math.min(46, slot * 0.62);
  const fmt = opts.format || ((v) => fmtId(v));
  let grid = "";
  for (const t of ticks) {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmt(t))}</text>`;
  }
  let bars = "";
  pairs.forEach((p, i) => {
    const x = padL + i * slot + (slot - bw) / 2;
    const top = y(Math.max(p.value, 0));
    const base = y(Math.min(p.value, 0));
    const hot = opts.highlight === i;
    bars += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, base - top).toFixed(1)}" rx="3" fill="${hot ? AMBER : TEAL}"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(fmt(p.value))}</text>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Diagram batang">${grid}${bars}` +
    `<line x1="${padL}" y1="${y(0)}" x2="${W - padR}" y2="${y(0)}" stroke="${MUTED}" stroke-width="1"/></svg>`;
}

// Diagram garis dari pasangan {label, value}.
// opts: {width, height, highlight, format, fill}
export function lineChart(pairs, opts = {}) {
  const W = opts.width || 640;
  const H = opts.height || 300;
  const padL = 56;
  const padR = 16;
  const padT = 22;
  const padB = 34;
  const cw = W - padL - padR;
  const ch = H - padT - padB;
  const values = pairs.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const ticks = niceTicks(min, max);
  const y = (v) => padT + ch - ((v - min) / (max - min)) * ch;
  const x = (i) => padL + (pairs.length === 1 ? cw / 2 : (i / (pairs.length - 1)) * cw);
  const fmt = opts.format || ((v) => fmtId(v));
  let grid = "";
  for (const t of ticks) {
    grid += `<line x1="${padL}" y1="${y(t)}" x2="${W - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${esc(fmt(t))}</text>`;
  }
  const pts = pairs.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(" ");
  const area = `${padL},${y(min).toFixed(1)} ${pts} ${x(pairs.length - 1).toFixed(1)},${y(min).toFixed(1)}`;
  let dots = "";
  pairs.forEach((p, i) => {
    const hot = opts.highlight === i;
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="${hot ? 6 : 4}" fill="${hot ? AMBER : TEAL}" stroke="#fff" stroke-width="2"/>` +
      `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(fmt(p.value))}</text>` +
      `<text x="${x(i).toFixed(1)}" y="${H - 12}" text-anchor="middle" font-size="11" fill="${MUTED}">${esc(p.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Diagram garis">` +
    `<polygon points="${area}" fill="${TEAL}" opacity="0.08"/>${grid}` +
    `<polyline points="${pts}" fill="none" stroke="${TEAL}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Diagram batang horizontal untuk daftar berlabel panjang (sektor, provinsi).
export function hbarChart(pairs, opts = {}) {
  const W = opts.width || 640;
  const rowH = opts.rowHeight || 34;
  const H = pairs.length * rowH + 30;
  const padL = 210;
  const padR = 56;
  const max = Math.max(...pairs.map((p) => p.value)) * 1.08;
  const fmt = opts.format || ((v) => fmtId(v));
  let rows = "";
  pairs.forEach((p, i) => {
    const y = 14 + i * rowH;
    const w = ((p.value / max) * (W - padL - padR)).toFixed(1);
    rows += `<text x="${padL - 10}" y="${y + 13}" text-anchor="end" font-size="12" fill="${INK}">${esc(p.label)}</text>` +
      `<rect x="${padL}" y="${y}" width="${w}" height="18" rx="3" fill="${i === 0 ? AMBER : TEAL}"/>` +
      `<text x="${padL + Number(w) + 8}" y="${y + 13}" font-size="12" font-weight="700" fill="${INK}">${esc(fmt(p.value))}</text>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Diagram batang horizontal">${rows}</svg>`;
}
