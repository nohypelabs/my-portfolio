'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Shield } from 'lucide-react';

const ADMIN_EMAIL = 'admin@nasaq.id';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/admin/login');
        return;
      }
      if (data.user.email !== ADMIN_EMAIL) {
        router.push('/');
        return;
      }
      setIsAuthorized(true);
    }).finally(() => setLoading(false));
  }, [router]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Shield className="w-10 h-10 text-red-400" />
        <p className="text-[14px] text-neutral-600">Unauthorized</p>
      </div>
    );
  }

  return <>{children}</>;
}
