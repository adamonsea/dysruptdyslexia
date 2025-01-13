import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { WaitlistFormFields } from "./waitlist/WaitlistFormFields";
import { validateEmail } from "@/utils/validation";
import { submitWaitlistEntry } from "@/utils/waitlist";
import { sendWelcomeEmail } from "@/services/emailService";

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

  const resetForm = () => {
    setName("");
    setEmail("");
    setAge("");
    setUpdates(false);
  };

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
      const success = await submitWaitlistEntry({
        name,
        email,
        child_age: age,
        wants_updates: updates,
      });

      if (success) {
        await sendWelcomeEmail(email, name);
        toast.success("Successfully joined the waitlist!");
        onOpenChange(false);
        resetForm();
      }
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