import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  label: string;
  value: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Option({ label, value, handleClick }: Option) {
  return (
    <div className="flex gap-x-1 items-center box-border">
      <Checkbox
        className="-translate-y-[1px]"
        id={value}
        onClick={(e) => handleClick(e)}
        value={value}
      />
      <label className="nowrap" htmlFor={value}>
        {label}
      </label>
    </div>
  );
}
