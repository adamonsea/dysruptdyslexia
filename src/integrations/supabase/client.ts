// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://madczfhstgndxbndiqtk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hZGN6ZmhzdGduZHhibmRpcXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MDkxODUsImV4cCI6MjA1MjI4NTE4NX0.p39CEnisjPbQlknMhTDVg1oC6kMQKnDfS8c0rwqhzK8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);