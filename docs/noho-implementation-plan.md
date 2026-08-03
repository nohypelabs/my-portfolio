# noho.ink — Hasil Scrape & Rencana Implementasi untuk nasaq.id

Sumber: `https://noho.ink/` (scrape 2026-08-03, via curl — WebFetch diblokir 403).
Aset mentah hasil scrape ada di `/tmp/noho/` (index.html, 3 CSS, 2 JS bundle).

---

## BAGIAN 1 — HASIL SCRAPE

### 1.1 Stack yang terdeteksi

| Layer | Teknologi | Bukti |
|---|---|---|
| Builder | **Webflow (export statis)** | `webflow.shared.min.css`, `noho.webflow.overrides.min.css`, `w-richtext`/`w-form` classes, `<script type="text/x-wf-template">`, font ikon `webflow-icons` base64 |
| Hosting | **Cloudflare** | `server: cloudflare`, `cf-ray`, `/cdn-cgi/scripts/.../email-decode.min.js`, beacon `static.cloudflareinsights.com` |
| Perf | **HTTP 103 Early Hints** | Response `103` dengan `link: <...noho.bundle.min.js>; rel=preload` sebelum `200` |
| DOM lib | jQuery | `/assets/vendor/jquery.min.js` |
| Animasi | **GSAP** + ScrollTrigger + CustomEase + SplitText | vendor files terpisah, 35× `ScrollTrigger` di bundle |
| Smooth scroll | **Lenis** | `/assets/vendor/lenis.min.js`, 55× di bundle |
| Carousel | **Embla** + plugin auto-scroll | `embla-carousel.umd.js`, `embla-carousel-auto-scroll.umd.js` |
| 3D | **`<model-viewer>`** (Google) | tag `model-viewer`, lazy via `ensureModelViewerLibrary()` |
| Font | **Switzer** (Fontshare, gratis) + Switzer Variable | 4 `@font-face`, woff2/woff/ttf, `font-display: swap` |
| Gambar | WebP + `srcset` responsif (500/800/1080/1278w) | preload hero `fetchpriority="high"` |

**Semua vendor di-selfhost** (`/assets/vendor/...`), tidak ada CDN pihak ketiga selain beacon CF. Bundle sendiri dipecah dua: `noho.bundle.min.js` (76 KB, kritis) + `noho.bundle.deferred-slim.min.js` (164 B, loader untuk bundle berat).

### 1.2 Sistem warna (lengkap)

Tema **tidak** pakai class CSS. Palet disimpan sebagai objek JS lalu di-*tween* GSAP ke inline style `<html>` selama 0.6s — makanya transisi temanya mulus per-variabel.

```js
const setTheme = (name, instant = false) => {
  const vars = themes[name], tl = gsap.timeline();
  for (const [k, v] of Object.entries(vars))
    instant ? $("html").css(k, v)
            : tl.to($("html"), { duration: .6, css: { [k]: v } }, 0);
  // → dispatch "noho:themestart" lalu "noho:themechange"
}
```

**Light** (warm sand / clay — bukan putih netral):

| Token | Nilai |
|---|---|
| `--bg-page` | `#F1EEE9` |
| `--bg-element` | `#E7E2DA` |
| `--bg-element-second` | `#D7D1C7` |
| `--bg-element-third` / `--bg-element-hover` | `#CDC0B0` |
| `--txt-main` | `#3C3C3C` |
| `--txt-main-opacity-med` / `-max` | `rgba(60,60,60,.6)` / `.4` |
| `--bg-btn-pm` / `--txt-btn-pm` | `#3C3C3C` / `#FFFFFF` |
| `--bg-btn-sc` / `--txt-btn-sc` | `#FFFFFF` / `#3C3C3C` |
| `--bg-btn-big` / `--txt-btn-big` | `#3C3C3C` / `#FFFFFF` |
| `--bg-form-element` | `#FFFFFF` |
| `--bg-header` | `#FFFFFF` |
| `--bg-switch` / `--bg-switch-active` / `--bg-inner-switch` | `#D7D1C7` / `#3C3C3C` / `#FFFFFF` |
| `--icon-contrast` | `#3C3C3C` |

**Dark** (warm brown — bukan abu/hitam netral, ini kuncinya):

| Token | Nilai |
|---|---|
| `--bg-page` | `#2E241C` |
| `--bg-element` | `#46362A` |
| `--bg-element-second` | `#584537` |
| `--bg-element-third` | `#715946` |
| `--bg-element-hover` | `#785B46` |
| `--txt-main` | `#F0E9E4` |
| `--txt-main-opacity-med` / `-max` | `rgba(236,223,214,.6)` / `.5` |
| `--bg-btn-pm` / `--txt-btn-pm` | `#ECDFD6` / `#1C0D0D` |
| `--bg-btn-sc` / `--txt-btn-sc` | `#2E241C` / `#FFFFFF` |
| `--bg-btn-big` / `--txt-btn-big` | `#362920` / `#E7E2DA` |
| `--bg-form-element` | `#ECDFD6` |
| `--text-form-header` | `#796153` |
| `--bg-header` / `--bg-inner-switch` | `#F2ECE9` |
| `--icon-contrast` | `#FFFFFF` |

Token semantik tambahan: `--indicator-green: #88c159`, `--indicator-red: #dc5b5b`, `--dim-gray: #686868`.

**Insight:** cuma ~24 token, tanpa skala 50–900. Netral hangat + 2 indikator. Tidak ada warna aksen brand sama sekali — kontras & foto yang jadi aksen.

### 1.3 Tipografi

- Skala **vw murni**: `.page { font-size: 1vw }` jadi basis, semua turunan pakai `em`/`vw`.
- `.h1` desktop `6.25vw` (line-height .95) → mobile `15.625vw` (line-height 1.0)
- `.h2_sb` `5.556vw`
- Elemen kecil juga vw: `.color-pick { width: 1.0417vw }`, `.header-burger-button-logo { 1.6667vw }`
- Angka aneh itu hasil Webflow: `1.0417vw` = 20px @ 1920px viewport, `2.083vw` = 40px, `6.25vw` = 120px.

Efeknya: layout **skala proporsional sempurna** di semua lebar desktop, tapi butuh breakpoint mobile terpisah (mereka lompat ke 15.625vw).

### 1.4 Motion system

**CustomEase yang didefinisikan:**
```js
CustomEase.create("custom-our",    "0.17, 0.17, 0.0, 1.0")   // ease utama
CustomEase.create("custom-popup",  "0.6, 0.0, 0.0, 1.0")
CustomEase.create("custom-slogan", "0.17, 0.17, 0.255, 0.902")
CustomEase.create("cascade",  "M0,0 C0.2,0 0.1,1 1,1")
CustomEase.create("hero1",    "M0,0 C0.64,0.0 0.47,0.57 1,1")
CustomEase.create("hero2",    "M0,0 C0.16,0.56 0.44,1.0 1,1")
CustomEase.create("preloader","M0,0 C0.5,0.0 0.0,1.0 1,1")
```

**Konfigurasi Lenis:**
```js
{ duration: 3, smoothWheel: true, syncTouch: true,
  syncTouchLerp: 0.075, gestureOrientation: "vertical", allowNestedScroll: true }
```
`duration: 3` itu **sangat** lambat/berat — ini sumber rasa "mahal"-nya. Lenis di-drive `gsap.ticker` (bukan rAF sendiri) + `gsap.ticker.lagSmoothing(0)`, dan tiap `scroll` manggil `ScrollTrigger.update()`.

**Primitif reveal universal** — semua judul/teks/kartu lewat satu fungsi:
```js
addAppearanceByTrigger({
  element, trigger, duration: 1, stagger: 0.12, delay: 0,
  initialY: "100%", ease: "custom-our",
  scrollTrigger: { start: `top${start}% top${tstart}%`,
                   toggleActions: "play none none none", once: true }
})
```
Pola: **mask reveal** — teks dipecah per baris/huruf (`.letter`, `.title-line`, `display:inline-block`), di-set `y: 100%` di dalam parent `overflow:hidden`, lalu naik ke 0 dengan stagger 0.12s. `once: true` — tidak pernah replay.

**Sistem reduce-motion** (ini yang paling niat): tiap animasi didaftarkan via `registerReducedAnimation(id, { element, animation, handler, snap })`. Saat user toggle, `snapAnimationEntry()` kill tween + ScrollTrigger, lalu `gsap.set(el, {y:0})` — animasi *dibatalkan ke posisi akhir*, bukan sekadar diperpendek. Bisa di-restore lagi tanpa reload.

### 1.5 Fitur khas noho

1. **Energy rating widget** — badge High/Med/Low di header. Naik-turun berdasar kombinasi dark mode + reduce animation. Copy-nya: *"Dark mode and reduce animation options allow you to save about 35% of your device battery, reducing the ecological footprint."* Storage: `localStorage["theme"]`, `localStorage["nohoReduceAnimations"]`.
2. **Preloader + intro** — `html.noho-intro-active` mematikan `model-viewer` (`content-visibility:hidden; contain:strict`) supaya GPU fokus ke intro.
3. **Screensaver** — `#noho-screensaver` canvas fullscreen z-index 100000, aktif saat idle, punya mode `is-loose`.
4. **Footer reveal mask** — `.noho-footer-reveal-mask` tinggi tetap + footer `position:absolute` di dalamnya → footer "terungkap" saat scroll (parallax reveal), dengan `clampScrollToFooter()`.
5. **Scrollbar disembunyikan total** — `scrollbar-width:none` + `::-webkit-scrollbar{display:none}` di `html, body, *`.
6. **Rotasi warna kartu** — `nth-child(3n+1/2/3)` dapat `--bg-element` / `-third` / `-second`, dan `nth-child(3n+1)` vs `(3n+2)` mirror kiri/kanan. Layout selang-seling tanpa data tambahan.
7. **Touch guard 3D** — `.noho-model-touch-guard` 15% kiri/kanan di layar sentuh supaya orbit model tidak membajak scroll vertikal.
8. **Runtime pause** — `html.noho-site-runtime-paused` matikan model-viewer saat tab tidak aktif.
9. **Deferred heavy bundle** — model-viewer & efek berat baru di-load lewat `scheduleDeferredHeavyBundle()` setelah intro.

---

## BAGIAN 2 — RENCANA IMPLEMENTASI UNTUK nasaq.id

### 2.0 Kondisi repo sekarang (sudah dicek)

Sudah ada: Next 16 App Router, React 19, Tailwind v4, `framer-motion`, `next-themes`, `@google/model-viewer`, `lenis` **(terinstal tapi belum dipakai sama sekali)**, `EnergySaverContext` + `EnergySaverPanel` (dark + reduce motion + badge energy — konsepnya sudah meniru noho), `TextReveal`, `ScrollReveal`, `Marquee`, `StorytellingSection`, `MagneticButton`, `TiltCard`, `PageTransition`.

Palet sekarang: **glass indigo `#5d51ff` + `#f6f6f9`** — arah visualnya bertolak belakang dengan noho (warm clay, flat, tanpa aksen). Ini keputusan terbesar yang harus diambil.

### 2.1 Keputusan yang perlu lo ambil dulu

| # | Keputusan | Opsi | Rekomendasi |
|---|---|---|---|
| A | **Palet** | (1) Adopsi warm clay noho penuh (2) Pertahankan indigo glass, ambil struktur token-nya saja (3) Warm clay + 1 aksen nasaq | **(3)** — ambil kehangatan & keteduhan noho, tetap punya identitas. Kalau ambil (1) mentah, situs lo jadi kembaran noho. |
| B | **GSAP vs Framer Motion** | (1) Tambah GSAP+ScrollTrigger (2) Framer Motion saja (3) Hybrid | **(3)** — Framer Motion untuk komponen/layout/exit, GSAP ScrollTrigger untuk scroll-driven & pin. ScrollTrigger tidak ada padanan setara di FM. SplitText sekarang gratis di GSAP 3.13+. |
| C | **Skala vw** | (1) vw murni ala noho (2) `clamp()` (3) Tailwind default | **(2)** — dapat efek proporsional tanpa teks mikroskopis di layar kecil & tanpa masalah a11y zoom. vw murni gagal WCAG 1.4.4. |
| D | **Font Switzer** | pakai / tidak | Boleh — Switzer gratis (Fontshare, ITF Free Font License), selfhost woff2. Alternatif tetap: Outfit/Inter yang sudah ada. |

> Catatan legal: **jangan** copy aset (foto, model 3D, `.webp`) atau teks marketing noho. Yang direplikasi adalah *pola teknis & sistem desain* — itu tidak dilindungi. Font Switzer ambil resmi dari Fontshare, bukan dari `/assets/fonts/` mereka.

### 2.2 Fase implementasi

#### Fase 1 — Fondasi token & tipografi (paling berdampak, risiko rendah)
1. Rombak `app/globals.css`: ganti struktur token ke model noho — `--bg-page`, `--bg-element`, `--bg-element-second/third/hover`, `--txt-main`, `--txt-main-opacity-med/max`, `--bg-btn-pm/sc/big` + pasangan `--txt-*`. Buang skala warna yang tidak terpakai.
2. Definisikan light & dark sebagai dua blok token warm (turunkan dari tabel §1.2, geser hue ke identitas nasaq).
3. Ganti `.dark {}` swap → tetap pakai `next-themes` (`class` strategy). **Jangan** tiru tween GSAP per-variabel noho: cukup `transition: background-color .6s, color .6s` di `html` + `color-scheme`. Hasil visual mirip, kode jauh lebih sederhana, dan bebas FOUC karena `next-themes` inject script.
4. Skala tipografi `clamp()`: `--fs-h1: clamp(2.75rem, 6.25vw, 7.5rem)` (angka 6.25vw diambil langsung dari noho), `--fs-h2: clamp(2rem, 5.556vw, 6.5rem)`, dst. Line-height `.95` untuk display.
5. Opsional: selfhost Switzer di `public/fonts/`, daftarkan via `next/font/local` di `app/layout.tsx`.

**File:** `app/globals.css`, `app/layout.tsx`, `components/layout/ThemeProvider.tsx`

#### Fase 2 — Smooth scroll (Lenis sudah terinstal, tinggal dinyalakan)
6. Buat `components/SmoothScrollProvider.tsx` (client): init Lenis dengan opsi noho, tapi **`duration: 1.2`**, bukan 3 — 3 detik terasa laggy buat situs jasa yang tujuannya konversi; noho mampu karena itu situs katalog kontemplatif.
7. Drive dari `gsap.ticker` (kalau Fase 3 jalan) atau rAF biasa. Wajib: `lenis.stop()` saat mobile sidebar/modal terbuka, dan reset scroll pada route change (integrasi dengan `PageTransition.tsx`).
8. Hormati `prefers-reduced-motion` **dan** state `EnergySaverContext.reduceMotion` → Lenis mati total, balik ke native scroll.
9. Sembunyikan scrollbar (`scrollbar-width:none` + `::-webkit-scrollbar`) — tapi hanya di `body`, jangan `*`, supaya panel/modal yang scrollable tetap bisa dinavigasi.

**File baru:** `components/SmoothScrollProvider.tsx` · **Ubah:** `app/(dashboard)/layout.tsx`, `contexts/`

#### Fase 3 — Motion primitives
10. `pnpm add gsap` (3.13+, SplitText & ScrollTrigger sudah gratis di lisensi standar).
11. Buat `lib/motion/eases.ts` — daftarkan CustomEase `custom-our`, `custom-popup`, `cascade` (nilai dari §1.4).
12. Buat `components/motion/MaskReveal.tsx` — primitif universal pengganti `addAppearanceByTrigger`:
    - props: `as`, `stagger = 0.12`, `duration = 1`, `initialY = "100%"`, `once = true`, `split = "lines" | "words" | "chars" | "none"`
    - parent `overflow:hidden`, child `y:100% → 0`, ease `custom-our`
    - **wajib**: kalau `reduceMotion` aktif → langsung `y:0` tanpa animasi (tiru `snapAnimationEntry`)
13. Refactor `TextReveal.tsx` & `ScrollReveal.tsx` supaya jadi tipis di atas `MaskReveal` — jangan biarkan tiga sistem reveal hidup bareng.
14. Registry reduce-motion: extend `EnergySaverContext` dengan `registerReducedAnimation(id, {kill, snap})` supaya toggle bisa membatalkan animasi berjalan tanpa reload (persis mekanisme noho).

**File baru:** `lib/motion/eases.ts`, `components/motion/MaskReveal.tsx` · **Ubah:** `components/TextReveal.tsx`, `components/ScrollReveal.tsx`, `contexts/EnergySaverContext.tsx`

#### Fase 4 — Pola layout
15. **Rotasi warna kartu** untuk `/projects` & pricing: `nth-child(3n+1/2/3)` → `--bg-element` / `-third` / `-second`. Nol data tambahan, langsung terasa "designed".
16. **Layout mirror selang-seling** untuk case study: `nth-child(3n+1)` konten kiri, `(3n+2)` kanan.
17. **Footer reveal mask** — footer absolute di dalam mask ber-tinggi tetap, terungkap saat scroll. Ganti `components/layout/Footer.tsx` jadi varian ini (efek "mewah" dengan biaya paling murah).
18. Marquee/mitra strip: pertimbangkan Embla + auto-scroll kalau `Marquee.tsx` sekarang masih CSS-only dan patah di resize; kalau sudah mulus, biarkan.

**File:** `app/globals.css`, `components/layout/Footer.tsx`, `components/ui/ProjectCard.tsx`, `app/(dashboard)/projects/page.tsx`

#### Fase 5 — Energy saver (naikkan yang sudah ada)
19. `EnergySaverPanel.tsx` sekarang cuma dua switch + badge. Tambah: **panel dropdown** dengan copy penjelasan ala noho (tulis versi lo sendiri dalam Bahasa Indonesia, di `lib/translations/index.ts` untuk `id` **dan** `en`).
20. Sambungkan reduce-motion ke rem yang nyata: matikan Lenis, matikan autoplay 3D/`model-viewer`, hentikan marquee, skip mask reveal. Sekarang toggle-nya harus benar-benar mengubah beban render, bukan cuma badge.
21. Tiru `html.noho-site-runtime-paused`: pause `model-viewer` & rAF saat `document.hidden` (Page Visibility API).

**File:** `components/layout/EnergySaverPanel.tsx`, `contexts/EnergySaverContext.tsx`, `lib/translations/index.ts`, `components/studio/Android3DViewer.tsx`

#### Fase 6 — Performa (agar berat animasi tidak merusak Core Web Vitals)
22. Lazy-load `Android3DViewer` + `model-viewer` via `next/dynamic({ ssr:false })`, trigger `IntersectionObserver` — tiru `ensureModelViewerLibrary()`/`scheduleDeferredHeavyBundle()`.
23. Preload hero image `fetchpriority="high"` + `sizes` responsif (`next/image` sudah handle srcset).
24. Selfhost semua font, `font-display: swap`, subset latin.
25. Ukur sebelum/sesudah: `pnpm build` + Lighthouse. Target LCP < 2.5s, CLS < 0.1 — Lenis `duration` tinggi + mask reveal gampang bikin INP jelek kalau tidak dijaga.

#### Fase 7 — Aksesibilitas (yang noho sendiri lalai)
26. `prefers-reduced-motion: reduce` harus **default** mematikan mask reveal & Lenis, bukan menunggu user klik toggle.
27. Scrollbar tersembunyi → pastikan navigasi keyboard & focus ring tetap jelas.
28. Cek kontras: `--txt-main-opacity-max` (opacity .4/.5) kemungkinan besar **gagal** WCAG AA untuk teks kecil. Pakai hanya untuk teks besar/dekoratif.
29. `clamp()` (Keputusan C) sudah menyelamatkan zoom 200%.

### 2.3 Urutan eksekusi yang disarankan

```
Fase 1 (token+tipografi)  ← mulai di sini, dampak visual terbesar
   ↓
Fase 2 (Lenis)  ‖  Fase 4 (layout patterns)   ← bisa paralel
   ↓
Fase 3 (motion primitives)  ← butuh Fase 2 kalau pakai gsap.ticker
   ↓
Fase 5 (energy saver)  ← butuh Fase 2 & 3 supaya toggle-nya bermakna
   ↓
Fase 6 (perf) → Fase 7 (a11y)  ← verifikasi akhir
```

### 2.4 Risiko

| Risiko | Mitigasi |
|---|---|
| Lenis `duration:3` bikin situs terasa lambat/tidak responsif | Pakai 1.2; situs lo tujuannya konversi, bukan katalog kontemplatif |
| vw murni gagal a11y & jelek di ultrawide | `clamp()` (Keputusan C) |
| Tiga sistem reveal hidup bersamaan (FM + GSAP + CSS) | Fase 3 langkah 13 — konsolidasi ke `MaskReveal` |
| Bundle membengkak (GSAP ~70 KB + Lenis + FM) | Import selektif GSAP; pertimbangkan cabut Framer Motion kalau GSAP menutup semua kebutuhan |
| Mirip berlebihan dengan noho | Keputusan A opsi (3) + copy & aset orisinal |
| `--txt-main-opacity-max` gagal kontras | Batasi untuk teks ≥ 24px |

---

## Lampiran — lokasi aset scrape

```
/tmp/noho/index.html                        133 KB
/tmp/noho/webflow.shared.min.css            116 KB
/tmp/noho/noho.webflow.overrides.min.css     19 KB
/tmp/noho/noho.bundle.min.css                21 KB
/tmp/noho/noho.bundle.min.js                 76 KB  ← palet tema, Lenis opts, motion system
/tmp/noho/noho.bundle.deferred-slim.min.js  164 B
```

> `/tmp` terhapus saat reboot. Kalau perlu permanen, salin ke `docs/vendor-research/`.
