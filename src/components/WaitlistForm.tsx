import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface WaitlistFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistForm({ open, onOpenChange }: WaitlistFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [updates, setUpdates] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    // Here you would typically send the data to your backend
    toast.success("Thank you for joining the waitlist!");
    onOpenChange(false);
    
    // Reset form
    setName("");
    setEmail("");
    setAge("");
    setUpdates(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] font-poppins">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join the Waitlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Child's Age</Label>
            <Select value={age} onValueChange={setAge} required>
              <SelectTrigger>
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 15 }, (_, i) => i + 4).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age} years
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="updates"
              checked={updates}
              onCheckedChange={(checked) => setUpdates(checked as boolean)}
            />
            <Label htmlFor="updates" className="text-sm">
              Send me regular launchpad updates
            </Label>
          </div>
          <Button type="submit" className="w-full">
            Join Waitlist
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}