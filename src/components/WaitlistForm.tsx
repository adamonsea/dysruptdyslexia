import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { WaitlistFormFields } from "./waitlist/WaitlistFormFields";
import { validateEmail } from "@/utils/validation";

interface WaitlistFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistForm({ open, onOpenChange }: WaitlistFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [updates, setUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!age) {
      toast.error("Please select your child's age");
      return;
    }

    setIsSubmitting(true);

    try {
      // First, check if the email already exists in the waitlist
      const { data: existingEntries } = await supabase
        .from('waitlist_entries')
        .select('email')
        .eq('email', email.toLowerCase().trim());

      if (existingEntries && existingEntries.length > 0) {
        toast.error("This email is already registered");
        setIsSubmitting(false);
        return;
      }

      // Insert into waitlist_entries table
      const { error: insertError } = await supabase
        .from('waitlist_entries')
        .insert([
          {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            child_age: age,
            wants_updates: updates,
          }
        ]);

      if (insertError) {
        throw insertError;
      }

      toast.success("Successfully joined the waitlist!");
      onOpenChange(false);
      
      // Reset form
      setName("");
      setEmail("");
      setAge("");
      setUpdates(false);
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] font-poppins">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join the Waitlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <WaitlistFormFields
            name={name}
            email={email}
            age={age}
            updates={updates}
            onNameChange={setName}
            onEmailChange={setEmail}
            onAgeChange={setAge}
            onUpdatesChange={setUpdates}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Join Waitlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}