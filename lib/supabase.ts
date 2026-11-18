import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
 * Supabase setup:
 *   create table waitlist (
 *     id uuid default gen_random_uuid() primary key,
 *     email text unique not null,
 *     source text,
 *     created_at timestamptz default now()
 *   );
 *   alter table waitlist enable row level security;
 *   create policy "Allow insert" on waitlist for insert with check (true);
 *
 * Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.
 * Without them the forms run in demo mode.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) client = createClient(url, anonKey);
  return client;
}

export function scrollToHeroForm() {
  document.getElementById("hero-email")?.focus({ preventScroll: true });
  document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
}
