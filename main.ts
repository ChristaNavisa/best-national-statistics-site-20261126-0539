// Angka Nusantara — program penyerahan (entrypoint).
// Menyalin app/ dan screenshots/ dari repositori ke direktori keluaran,
// lalu menulis dossier.json dengan buildDossier dari vendor/makefun-frontend.ts.
// Pustaka standar Node saja. Jalur dihitung dari lokasi berkas ini,
// bukan dari direktori kerja. Direktori keluaran sendiri TIDAK PERNAH dihapus:
// hanya isinya yang dibersihkan, satu demi satu.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Bersihkan isi direktori keluaran tanpa menghapus direktorinya sendiri:
// /output pada grader adalah volume yang dipasang, menghapusnya gagal.
function clearContents(dir) {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main() {
  const appDir = join(repoRoot, "app");
  const shotsDir = join(repoRoot, "screenshots");
  if (!existsSync(appDir)) throw new Error("app/ tidak ditemukan di " + appDir);
  if (!existsSync(shotsDir)) throw new Error("screenshots/ tidak ditemukan di " + shotsDir);

  clearContents(outDir);
  cpSync(appDir, join(outDir, "app"), { recursive: true });
  cpSync(shotsDir, join(outDir, "screenshots"), { recursive: true });

  const dossier = buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
    app_path_max_bytes: 1000,
  });
  const dossierPath = join(outDir, "dossier.json");
  writeFileSync(dossierPath, dossier);
  // Periksa hasil sebelum selesai: index dan dossier harus ada dan berisi.
  if (!existsSync(join(outDir, "app", "index.html"))) {
    throw new Error("app/index.html hilang dari keluaran");
  }
  if (dossier.length === 0) throw new Error("dossier.json kosong");
}

main();
