# Branding Plan — nasaq.id

Status: draft untuk direview.
Dibuat: 2026-08-06. Sumber audit: homepage funnel, lib/data/*, header, UI_UX_PROGRESS.md.

---

## 1. Audit: kenapa branding-nya kerasa gak jelas

### Temuan inti: 4 identitas lagi berebut di satu situs

| Identitas | Dimana muncul | Masalah |
|---|---|---|
| Studio web dev umum | Descriptor hero: "website, android, admin system" + services | Terlalu luas, gak beda dari ribuan agency lain |
| Pembuat sistem operasional | Hero headline: "Sistem yang dipakai admin, bukan yang cuma dilirik" | Ini yang paling kuat — tapi tenggelam |
| Personal portfolio | founder story, CV PDF, github nohypelabs | Dua brand (nasaq.id vs nohypelabs) bikin bingung |
| Agency funnel | Pricing, CTA, mitra strip | Baru, tapi belum nyambung sama cerita sistem |

**Akar masalah:** situs ini gak bisa jawab satu kalimat: *"Kami itu apa, buat siapa, dan kenapa beda?"* Tiap section jawab beda.

### Temuan pendukung

1. **Hero vs isi gak sinkron.** Hero bilang "sistem yang dipakai admin" (spesifik, kuat), tapi 3 baris di bawahnya bilang "company profile, dashboard, dan app Android" (broad). Visitor dikasih dua janji sekaligus.
2. **Target pembeli gak didefinisikan.** Siapa yang harus konversi? Pemilik toko ritel? Manajer logistik? HRD yang butuh company profile? Kalau semua, gak ada yang kebawa.
3. **Proof bagus tapi tercecer.** Ada 4 surface bukti di homepage: live metrics, storytelling, grid project, testimonial. Masing-masing keren, tapi bersaing — visitor gak tau mana yang harus dipercaya duluan.
4. **Mitra strip lemah.** Dari 7 mitra, cuma 2 yang punya logo asli (J&T, Prenacons). Sisanya inisial (SQ, WC, LP, QH, NQ) — ini malah bikin kredibilitas turun, kebalikan dari tujuannya.
5. **Harga Rp 500rb ngerusak posisi.** Anchor harga terendah bikin kesan "murah", padahal konten di atasnya ngejual "premium sistem custom". Dua sinyal yang bertentangan.
6. **Dua brand paralel.** nasaq.id (studio) vs nohypelabs (personal). Untuk konversi B2B, satu brand saja yang di depan.
7. **Bahasa campur.** Mayoritas Indonesia (bagus buat target UKM lokal) tapi ada sisa EN di beberapa tempat. Pilih satu primary.

### Yang SUDAH kuat (jangan dibuang)

- **Hero headline** "Sistem yang dipakai admin, bukan yang cuma dilirik." — ini aset branding paling berharga di situs. Spesifik, percaya diri, beda.
- **Cerita problem/solusi** (stok selisih, admin lembur rename foto, inspeksi tanpa bukti) — ini nyambung banget ke pain nyata UKM.
- **Flagship proof**: Serat QC (J&T, 112K+ resi), LakuPOS, WC Check — angka riil, bukan stock photo.
- **Live metrics** — bukti integrasi real-time yang gak dimiliki kompetitor.
- **Estetika brutalist mono** — konsisten, beda dari template agency.

---

## 2. Platform Brand Baru

### Positioning statement (satu kalimat)

> **nasaq.id adalah studio website & sistem operasional digital untuk bisnis Indonesia — company profile, dashboard internal, aplikasi Android lapangan, dan sistem custom yang benar-benar dipakai tim tiap hari.**

### Kenapa ini pas

- **Target diperluas ke semua bisnis** (keputusan owner, 2026-08-06): tidak dikunci ke UKM operasional, tapi tetap pakai "sistem yang dipakai tim" sebagai diferensiator utama.
- **Bedanya tetap jelas**: bukan "kami bikin website" (semua orang bisa), tapi "kami bikin sistem yang dipakai admin" — itu cerita yang bisa dibuktikan lewat case study.
- **Nyambung ke semua aset yang ada**: hero headline, problem/solusi, flagship projects, live metrics — semua nyambung ke positioning ini tanpa nulis ulang dari nol.
- **Company profile & website tetap dijual**, sebagai pintu masuk layanan (default: entry point — konfirmasi owner pending).

### Siapa target utamanya

**Primary buyer:** pemilik/direktur UKM 10-200 karyawan di sektor ritel, logistik, jasa lapangan, dan operasional — yang operasionalnya masih Excel, kertas, dan chat.

**Sinyal yang mereka cari:** "apakah lo udah pernah ngerjain masalah kayak gue?" → karena itu case study & angka harus di depan, bukan daftar teknologi.

### Brand voice

- Tegas, teknis, tanpa basa-basi (match sama estetika brutalist)
- Bahasa Indonesia primary, EN hanya kalau dibutuhkan
- Ngomongin *problem operasional*, bukan fitur: "stok selisih" bukan "inventory management module"

---

## 3. Rencana Eksekusi (3 fase)

### Fase 1 — Konsistensi pesan (copy & data, tanpa UI overhaul) — ✅ SELESAI (commit ec9c685)

1. **Rewrite descriptor hero** → "nasaq.id · studio website & sistem operasional digital" ✅
2. **Rewrite sub-headline hero** → satu kalimat yang ngunci positioning ✅ (copy existing sudah selaras, dipertahankan)
3. **Rename 3 services** biar nyambung ke positioning ✅ (Dashboard Operasional flagship #1, Aplikasi Android Lapangan #2, Website & Company Profile #3 entry point)
4. **Update translations** en/id sekalian. ⏳ (translations/index.ts sudah en=id identik, tidak ada yang berubah — verify ulang saat tambah copy baru)
5. **Mitra wajib logo asli** ✅ — hanya J&T + Prenacons yang tampil
6. **Satu brand di depan** ✅ — contact handles @nasaq-id/@nasaq_id; URL github/x masih nohypelabs sampai akun baru dibuat

### Fase 2 — Struktur homepage (potong yang bersaing) — ✅ SELESAI (commit 9620055)

Sekarang 9 section. Target: **6 section, satu CTA per layar.** ✅

1. **Cover** (hero + stats) — CTA: kirim brief ✅
2. **Mitra** (hanya yang ada logo) — strip tipis ✅
3. **Problem/solusi** (pertahankan, ini jantungnya) ✅
4. **Flagship proof** — live strip + storytelling + project grid digabung satu blok (id=live-data dipertahankan) ✅
5. **Pricing entry** — anchor Rp 1,5jt ✅
6. **Testimoni + CTA** (digabung) ✅

### Fase 3 — Trust & konversi (konten baru)

1. **Case study template before/after** yang konsisten ✅ — sudah terstandar di ProjectDetailClient (problem → painPoints → solution → metrics before/after → testimonial). Verifikasi: 7/7 project punya caseStudy lengkap.
2. **Tambah 1-2 testimoni** dari client riil ⏳ — butuh data dari client (minta ke client LakuPOS/WC Check/Serat QC). JANGAN dikarang.
3. **Ganti anchor harga** ✅ — Basic (is_popular, Rp 1,5-3jt) sudah jadi centerpiece di tengah grid + badge Terpopuler; homepage anchor Rp 1,5jt.
4. **FAQ** tambah 2 pertanyaan keberatan utama UKM ✅ — "tidak paham teknis" + "kalau sistem error gimana?" (commit 2d204c9)
5. **Bonus: 4 error lint pre-existing dibersihkan** ✅ — prefer-const live-metrics, ScrollTrigger unused, Android3DViewer setState-in-effect → derived state

---

## 4. Keputusan yang harus lo ambil

| # | Keputusan | Opsi | Status |
|---|---|---|---|
| 1 | Satu brand utama | nasaq.id vs nohypelabs | ✅ **nasaq.id** (nohypelabs akan diganti) |
| 2 | Target utama | semua bisnis vs UKM operasional | ✅ **Semua bisnis** |
| 3 | Posisi company profile | Produk utama vs entry point | ✅ **Entry point** — jual sistem sebagai produk utama |
| 4 | Anchor harga | Rp 500rb vs Rp 1,5jt vs tanpa angka | ✅ **Rp 1,5jt** (Basic, is_popular) |
| 5 | Mitra tanpa logo | Pertahankan vs hapus vs ganti logo | ✅ **Pakai logo** — semua mitra wajib logo asli, tanpa logo = tidak ditampilkan |

---

## 5. Yang TIDAK dikerjakan (anti-scope-creep)

- ❌ Ganti nama domain / rebrand total — nasaq.id sudah bagus
- ❌ Ganti estetika visual — brutalist mono sudah jadi identitas
- ❌ Tambah halaman baru — 4 halaman existing sudah cukup
- ❌ Bikin konten blog — belum saatnya, fokus konversi dulu
- ❌ Reintroduce /about, /blog, /pricing dll (per CLAUDE.md)
