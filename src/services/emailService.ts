import { supabase } from "@/integrations/supabase/client";

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('send-welcome-email', {
      body: {
        to: email.toLowerCase().trim(),
        name: name.trim(),
      },
    });

    if (error) {
      console.error('Error sending welcome email:', error);
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error);
  }
}