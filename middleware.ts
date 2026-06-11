import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_EMAIL = 'admin@nasaq.id';

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip auth checks if Supabase is not configured
  if (!supabaseUrl || !supabaseKey) {
    // Only block admin routes when Supabase is not configured
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
    const isAdminLogin = request.nextUrl.pathname === '/admin/login';

    if (isAdminRoute && !isAdminLogin) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Block order route when Supabase is not configured
    if (request.nextUrl.pathname === '/order') {
      return NextResponse.redirect(new URL('/pricing', request.url));
    }

    return NextResponse.next();
  }

  // Supabase is configured — do full auth check
  const { createServerClient } = await import('@supabase/ssr');

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  // Protect admin routes (except /admin/login)
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const isAdminLogin = request.nextUrl.pathname === '/admin/login';

  if (isAdminRoute && !isAdminLogin) {
    if (!user || user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect order route - require auth
  if (request.nextUrl.pathname === '/order' && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
