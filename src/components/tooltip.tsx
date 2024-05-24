type Props = {
  elementToHover: React.ReactNode;
  tooltip: React.ReactNode;
};

export default function Tooltip({ elementToHover, tooltip }: Props) {
  return (
    <div className="group relative cursor-default text-center font-base m-0 p-0">
      {elementToHover}
      <div className="pointer-events-none absolute -left-1/2 translate-x-1/2 top-8 z-10 w-28 rounded-base border-2 border-black bg-main px-3 py-2 text-center text-xs opacity-0 transition-all group-hover:opacity-100">
        {tooltip}
      </div>
    </div>
  );
}
