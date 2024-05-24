import { Button } from "@/components/ui/button";
import { useOpeningSearch } from "@/global-state";
import {
  ColorOptions,
  CreatorOptions,
  TimeOptions,
} from "./checkbox-filters/checkbox-filters";
import EloSlider from "./elo/elo";
import OpeningFilters from "./opening-search/OpeningFilter";
export default function Filters() {
  const isOpen = useOpeningSearch((state) => state.isOpen);
  const setIsOpen = useOpeningSearch((state) => state.setIsOpen);
  return (
    <div className="flex-col justify-between h-[calc(100%-96px)] border-black border-r-4 w-52 p-4 border-box hidden md:flex font-public">
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
          Opening Explorer
        </Button>
        <OpeningFilters setExpand={setIsOpen} expand={isOpen} />
      </div>
    </div>
  );
}
