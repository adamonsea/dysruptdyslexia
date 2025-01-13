import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://madczfhstgndxbndiqtk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZGN6ZmhzdGduZHhibmRpcXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MDkxODUsImV4cCI6MjA1MjI4NTE4NX0.p39CEnisjPbQlknMhTDVg1oC6kMQKnDfS8c0rwqhzK8";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

// Sanitize URL by removing any trailing colons, slashes, or whitespace
const sanitizedUrl = supabaseUrl.trim().replace(/[:\/]+$/, '');

export const supabase = createClient(sanitizedUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});