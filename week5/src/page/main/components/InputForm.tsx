import { Input } from "@/components/ui/input";

interface InputFormProps {
  iValue: string;
  setIValue: (props: string) => void;
}

export default function InputForm({ iValue, setIValue }: InputFormProps) {
  return (
    <Input
      className="w-full"
      value={iValue}
      onChange={(e) => setIValue(e.target.value)}
    />
  );
}
