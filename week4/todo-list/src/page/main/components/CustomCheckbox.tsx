import { Checkbox } from "@/components/ui/checkbox";

interface CustomCheckboxProps {
  isChecked: boolean;
  setIsChecked: (props: boolean) => void;
}

export default function CustomCheckbox({
  isChecked,
  setIsChecked,
}: CustomCheckboxProps) {
  return <Checkbox checked={isChecked} onCheckedChange={setIsChecked} />;
}
