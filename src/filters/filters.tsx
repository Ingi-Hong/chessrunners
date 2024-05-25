import { Button } from "@/components/ui/button";
import { useFilterStore, useOpeningSearch } from "@/global-state";
import { Dispatch, SetStateAction } from "react";
import {
  ColorOptions,
  CreatorOptions,
  TimeOptions,
} from "./checkbox-filters/checkbox-filters";
import EloSlider from "./elo/elo";
import OpeningFilters from "./opening-search/OpeningFilter";
export default function Filters() {
  const isOpen = useOpeningSearch((state) => state.isOpen);
  const selPgns = useFilterStore((state) => state.selPgns);
  const setIsOpen = useOpeningSearch((state) => state.setIsOpen) as Dispatch<
    SetStateAction<boolean>
  >;
  return (
    <div className="flex-col justify-between h-[calc(100%-44.44px)] sm:h-[calc(100%-96px)] border-black border-r-4 w-54 p-4 border-box hidden md:flex font-public">
      <div className="flex flex-col gap-2 items-start">
        <label className="text-xl">Creators</label>
        <CreatorOptions className="flex flex-col gap-2" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label className="text-xl">Plays As</label>
        <ColorOptions className="flex flex-col gap-2" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label className="text-xl">Elo</label>
        <EloSlider />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label className="text-xl">Time Standard</label>
        <TimeOptions className="flex flex-col gap-2" />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label className="text-xl">Openings</label>
        <Button variant="neo" onClick={() => setIsOpen(true)}>
          Opening Explorer ({selPgns.length})
        </Button>
        <OpeningFilters setExpand={setIsOpen} expand={isOpen} />
      </div>
    </div>
  );
}
