import Option from "@/components/option";
import { getTimeControls } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useQuery } from "@tanstack/react-query";

type OptionProps = {
  className?: string;
};

export function CreatorOptions({ className }: OptionProps) {
  const setCreators = useFilterStore((state) => state.setSelCreator);
  const selectedCreators = useFilterStore((state) => state.selCreator);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const creator = (e.target as HTMLButtonElement).value as string;
    if (selectedCreators.includes(creator)) {
      setCreators(selectedCreators.filter((val) => val !== creator));
    } else {
      setCreators([...selectedCreators, creator]);
    }
  };

  return (
    <div className={className}>
      <Option
        value="Eric Rosen"
        label="Eric Rosen"
        handleClick={handleClick}
        checked={selectedCreators.includes("Eric Rosen")}
      />
      <Option
        value="Daniel Naroditsky"
        label="Daniel Naroditsky"
        handleClick={handleClick}
        checked={selectedCreators.includes("Daniel Naroditsky")}
      />
    </div>
  );
}

export function ColorOptions({ className }: OptionProps) {
  const setColors = useFilterStore((state) => state.setSelColor);
  const selectedColors = useFilterStore((state) => state.selColor);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const color = (e.target as HTMLButtonElement).value as "black" | "white";
    if (selectedColors.includes(color)) {
      setColors(selectedColors.filter((val) => val !== color));
    } else {
      setColors([...selectedColors, color]);
    }
  };

  console.log("selcolor", selectedColors);

  return (
    <div className={className}>
      <Option
        checked={selectedColors.includes("white")}
        value="white"
        label="White"
        handleClick={handleClick}
      />
      <Option
        checked={selectedColors.includes("black")}
        value="black"
        label="Black"
        handleClick={handleClick}
      />
    </div>
  );
}

export function TimeOptions({ className }: OptionProps) {
  const selTimes = useFilterStore((state) => state.selTimes);
  const setSelTimes = useFilterStore((state) => state.setSelTimes);

  const { data } = useQuery({
    queryKey: ["time-control"],
    queryFn: getTimeControls,
    refetchOnMount: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const time = (e.target as HTMLButtonElement).value as string;
    if (selTimes.includes(time)) {
      setSelTimes(selTimes.filter((val) => val !== time));
    } else {
      setSelTimes([...selTimes, time]);
    }
  };

  return (
    <div className={className}>
      {data?.data &&
        data.data.map((option) => {
          const timeControl = option.time_control;
          return (
            <Option
              value={timeControl}
              label={timeControl}
              handleClick={handleClick}
              checked={selTimes.includes(timeControl)}
            />
          );
        })}
    </div>
  );
}
