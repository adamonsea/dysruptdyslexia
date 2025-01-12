import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add console logs to help debug
console.log('Supabase URL:', !!supabaseUrl ? 'Present' : 'Missing');
console.log('Supabase Anon Key:', !!supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required Supabase environment variables. Please ensure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
}

// Create the client with either the real credentials or placeholder values
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);