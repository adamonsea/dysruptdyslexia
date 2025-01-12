import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add console logs to help debug
console.log('Supabase URL:', !!supabaseUrl ? 'Present' : 'Missing');
console.log('Supabase Anon Key:', !!supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing required Supabase environment variables. Please ensure both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.');
  // Instead of throwing an error, we'll create a dummy client that will be replaced once the variables are available
  export const supabase = createClient('https://placeholder-url.supabase.co', 'placeholder-key');
} else {
  export const supabase = createClient(supabaseUrl, supabaseAnonKey);
}