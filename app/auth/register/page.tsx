'use client';

import { motion } from 'framer-motion';
import { UserPlus, Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="w-full max-w-sm">
          <motion.div variants={fadeInUp} className="bg-white border border-neutral-200 rounded-xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-6 h-6 text-[#0D9488]" />
            </div>
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-2">Registrasi Berhasil!</h2>
            <p className="text-[12px] text-neutral-500 mb-4">
              Silakan cek email Anda untuk verifikasi. Setelah itu bisa login.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F766E] transition-colors"
            >
              Ke Halaman Login
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="w-full max-w-sm">
        <motion.div variants={fadeInUp} className="bg-white border border-neutral-200 rounded-xl p-6">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1
              className="text-[24px] text-neutral-900 mb-1"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 350, letterSpacing: '-0.03em' }}
            >nasaq.id</h1>
            <p className="text-[12px] text-neutral-500">Buat akun baru</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Nama Lengkap</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors"
                  placeholder="Min. 6 karakter"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0D9488] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F766E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Mendaftar...</>
              ) : (
                <><UserPlus className="w-4 h-4" /> Daftar</>
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-[12px] text-neutral-500">
            Sudah punya akun?{' '}
            <Link href="/auth/login" className="text-[#0D9488] hover:underline">Masuk</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
