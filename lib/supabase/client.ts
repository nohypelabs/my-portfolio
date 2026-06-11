import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for when Supabase is not configured
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
      },
    } as unknown as ReturnType<typeof createBrowserClient>;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
