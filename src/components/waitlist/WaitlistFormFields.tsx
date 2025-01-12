import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface WaitlistFormFieldsProps {
  name: string;
  email: string;
  age: string;
  updates: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAgeChange: (value: string) => void;
  onUpdatesChange: (checked: boolean) => void;
}

export function WaitlistFormFields({
  name,
  email,
  age,
  updates,
  onNameChange,
  onEmailChange,
  onAgeChange,
  onUpdatesChange,
}: WaitlistFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age">Child's Age</Label>
        <Select value={age} onValueChange={onAgeChange} required>
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
          onCheckedChange={(checked) => onUpdatesChange(checked as boolean)}
        />
        <Label htmlFor="updates" className="text-sm">
          Send me regular launchpad updates
        </Label>
      </div>
    </>
  );
}