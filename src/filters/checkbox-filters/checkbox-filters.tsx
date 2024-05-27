import Option from "@/components/option";
import RadioGroup from "@/components/radiogroup";
import { getTimeControls } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

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
    const childrenString = (e.target as HTMLButtonElement).dataset.children;
    let children: string[] = [];
    if (childrenString) {
      children = JSON.parse(childrenString) as string[];
    }
    if (selTimes.includes(time)) {
      let filtered = selTimes.filter((val) => val !== time);
      children.forEach(
        (child: string) => (filtered = filtered.filter((val) => val !== child))
      );
      setSelTimes(filtered);
    } else {
      setSelTimes([...selTimes, ...children, time]);
    }
  };

  const opts = useMemo(() => {
    const opt = data?.data?.reduce((curr, val) => {
      const timeControl = val.time_control;
      if (curr.get(timeControl)) {
        return curr;
      }
      if (!timeControl.includes("+")) {
        curr.set(timeControl, []);
        return curr;
      }
      const timeArray = timeControl.split("+");
      const oldChildren = curr.get(timeArray[0]) as string[];
      if (!oldChildren) {
        curr.set(timeArray[0], [timeControl]);
      } else {
        curr.set(timeArray[0], [...oldChildren, timeControl]);
      }
      return curr;
    }, new Map<string, string[]>());
    return opt;
  }, [data?.data]);

  return (
    <div className={className}>
      {opts &&
        opts?.size > 0 &&
        Array.from(opts.keys())
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map((parent) => {
            const children = opts.get(parent);
            return (
              <Option
                value={parent}
                label={parent}
                handleClick={handleClick}
                checked={selTimes.includes(parent)}
                children={children}
              />
            );
          })}
    </div>
  );
}
