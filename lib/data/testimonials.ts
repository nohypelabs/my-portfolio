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
    content: "Sistem WC Check mengubah cara tim kami melakukan inspeksi. Scan QR code dan checklist langsung dari HP — tidak perlu form kertas lagi. Dashboard real-time bikin monitoring jadi gampang. Efisiensi inspeksi naik sekitar 70%.",
    rating: 5,
    project: "WC Check"
  },
  {
    id: "2",
    name: "R.W.",
    role: "Supervisor Operasional",
    company: "J&T Express — Pengguna Serat QC",
    content: "Proses verifikasi selisih berat yang dulu makan 4-5 jam sekarang selesai dalam 30 menit. Barcode scan + GPS watermark otomatis di setiap foto — gak perlu rename manual satu-satu. Sudah 80K+ resi diproses tanpa masalah.",
    rating: 5,
    project: "Serat QC"
  },
  {
    id: "3",
    name: "H.M.",
    role: "Pemilik Toko",
    company: "Retail — Pengguna LakuPOS",
    content: "Kasir dan manajemen stok jadi satu aplikasi. Barcode scanner dari kamera HP langsung detect, stok antar outlet auto sync. Yang paling saya suka: QRIS payment langsung masuk, gak perlu cek manual.",
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
