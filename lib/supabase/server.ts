import { cookies } from 'next/headers';

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client that returns empty results
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            order: () => Promise.resolve({ data: [], error: null }),
          }),
          order: () => Promise.resolve({ data: [], error: null }),
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
          }),
        }),
        update: () => ({
          eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
        }),
        delete: () => ({
          eq: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
        }),
      }),
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
        signUp: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null }),
        exchangeCodeForSession: () => Promise.resolve({ error: null }),
      },
    } as unknown as ReturnType<typeof import('@supabase/supabase-js').createClient>;
  }

  const { createServerClient } = await import('@supabase/ssr');
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server component, ignore
        }
      },
    },
  });
}
