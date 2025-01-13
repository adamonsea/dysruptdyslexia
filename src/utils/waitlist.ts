import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WaitlistEntry {
  name: string;
  email: string;
  child_age: string;
  wants_updates: boolean;
}

export async function submitWaitlistEntry(entry: WaitlistEntry): Promise<boolean> {
  try {
    // Check if email already exists
    const { data: existingEntries } = await supabase
      .from('waitlist_entries')
      .select('email')
      .eq('email', entry.email.toLowerCase().trim());

    if (existingEntries && existingEntries.length > 0) {
      toast.error("This email is already registered");
      return false;
    }

    // Insert into waitlist_entries table
    const { error: insertError } = await supabase
      .from('waitlist_entries')
      .insert([
        {
          name: entry.name.trim(),
          email: entry.email.toLowerCase().trim(),
          child_age: entry.child_age,
          wants_updates: entry.wants_updates,
        }
      ]);

    if (insertError) {
      throw insertError;
    }

    return true;
  } catch (error: any) {
    console.error("Signup error:", error);
    toast.error(error.message || "An error occurred. Please try again later.");
    return false;
  }
}