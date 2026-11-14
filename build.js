#!/usr/bin/env node
// Bygger slides.html av källfilerna i src/.
//
//   node build.js           bygg en gång
//   node build.js --watch   bygg om varje gång en fil i src/ sparas
//
// slides.html är en GENERERAD fil – ändra aldrig i den, ändra i src/ och bygg om.
// Skriptet har inga beroenden (ingen npm install). Det gör tre saker:
//   1. Varje <link rel="stylesheet"> och <script src> i src/index.html ersätts med filens innehåll.
//   2. Typsnitt och logga som CSS:en pekar på med url("…") bäddas in som data-URI.
//   3. Alla filer i src/slides/ läggs in i mapp- och filnamnsordning.
// Resultatet är en enda fil som öppnas med dubbelklick och fungerar offline.
// Bilderna (img/ och png/svg i roten) ligger kvar som egna filer bredvid slides.html.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'slides.html');
const MIME = { woff2: 'font/woff2', svg: 'image/svg+xml' };

const read = (file) => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

// url("../../fonts/x.woff2") -> url("data:font/woff2;base64,…"). Sökvägen räknas från CSS-filen.
function inlineUrls(css, cssFile) {
  return css.replace(/url\("([^":]+\.(woff2|svg))"\)/g, (_, rel, ext) => {
    const file = path.resolve(path.dirname(cssFile), rel);
    return `url("data:${MIME[ext]};base64,${fs.readFileSync(file).toString('base64')}")`;
  });
}

// Alla .html under src/slides/, sorterade på sökväg: 0-intro/010-… före 1-llm/000-… osv.
function slideFiles(dir = path.join(SRC, 'slides')) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
    .flatMap((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return slideFiles(full);
      return e.name.endsWith('.html') ? [full] : [];
    });
}

const rel = (file) => path.relative(ROOT, file).split(path.sep).join('/');

function build() {
  let html = read(path.join(SRC, 'index.html'));

  // Ersättningen är en funktion, inte en sträng: i en sträng skulle "$&" och "$1" i innehållet tolkas som mönster.
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) => {
    const file = path.join(SRC, href);
    return `<style>\n/* ${rel(file)} */\n${inlineUrls(read(file), file).trim()}\n</style>`;
  });
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) => {
    const file = path.join(SRC, src);
    return `<script>\n// ${rel(file)}\n${read(file).trim()}\n</script>`;
  });

  const files = slideFiles();
  const slides = files.map((f) => `<!-- ${rel(f)} -->\n${read(f).trim()}\n`).join('\n');
  const marker = /<!-- build:slides[^>]*-->\n?/;
  if (!marker.test(html)) throw new Error('Hittar inte <!-- build:slides --> i src/index.html');
  html = html.replace(marker, () => slides);

  html = html.replace(/<!doctype html>\n/i, (m) => `${m}<!-- GENERERAD FIL. Ändra i src/ och kör: node build.js -->\n`);
  fs.writeFileSync(OUT, html);
  console.log(`slides.html: ${files.length} slides, ${Math.round(Buffer.byteLength(html) / 1024)} kB`);
}

function safeBuild() {
  try { build(); } catch (err) { console.error('Bygget misslyckades:', err.message); return false; }
  return true;
}

if (process.argv.includes('--watch')) {
  safeBuild();
  let timer;
  // Editorer sparar ofta i flera steg – vänta tills det varit tyst i 100 ms innan vi bygger.
  fs.watch(SRC, { recursive: true }, () => { clearTimeout(timer); timer = setTimeout(safeBuild, 100); });
  console.log('Bevakar src/ … Ctrl+C avslutar.');
} else if (!safeBuild()) {
  process.exit(1);
}
