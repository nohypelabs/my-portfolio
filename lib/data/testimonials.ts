export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating: number;
  project?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "A.S.",
    role: "Operations Manager",
    company: "Fasilitas Gedung — Pengguna WC Check",
    content: "Sistem WC Check ngubah cara tim kami inspeksi. Scan QR dan checklist langsung dari HP, gak perlu form kertas lagi. Dashboard-nya bikin monitoring jadi gampang. Efisiensi inspeksi naik sekitar 70%.",
    rating: 5,
    project: "WC Check"
  },
  {
    id: "2",
    name: "R.W.",
    role: "Supervisor Operasional",
    company: "J&T Express — Pengguna Serat QC",
    content: "Verifikasi selisih berat yang dulu makan 4-5 jam sekarang selesai dalam 30 menit. Scan barcode + watermark GPS otomatis di tiap foto, gak perlu rename manual satu-satu. Udah 80K+ resi diproses tanpa masalah.",
    rating: 5,
    project: "Serat QC"
  },
  {
    id: "3",
    name: "H.M.",
    role: "Pemilik Toko",
    company: "Retail — Pengguna LakuPOS",
    content: "Kasir dan stok jadi satu aplikasi. Scanner barcode dari kamera HP langsung kedetect, stok antar outlet auto sync. Yang paling saya suka: QRIS langsung masuk, gak perlu cek manual.",
    rating: 5,
    project: "LakuPOS"
  },
  {
    id: "4",
    name: "N.K.",
    role: "Pemilik Usaha",
    company: "E-Commerce — Pengguna Qohira",
    content: "Sekarang semua pesanan dan konfirmasi bayar masuk satu tempat. Customer upload bukti transfer, saya verifikasi dari dashboard, notifikasi otomatis ke buyer. Gak perlu cek WA terus.",
    rating: 5,
    project: "Qohira"
  }
];
