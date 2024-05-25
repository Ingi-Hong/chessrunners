import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/global-state";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EloSlider() {
  const setMinElo = useFilterStore((state) => state.setMinElo);
  const setMaxElo = useFilterStore((state) => state.setMaxElo);
  const rawMin = useFilterStore((state) => state.rawMin);
  const setRawMin = useFilterStore((state) => state.setRawMin);
  const rawMax = useFilterStore((state) => state.rawMax);
  const setRawMax = useFilterStore((state) => state.setRawMax);
  const minElo = useFilterStore((state) => state.minElo);
  const maxElo = useFilterStore((state) => state.maxElo);
  const [max, setMax] = useState(rawMax || maxElo);
  const [min, setMin] = useState(rawMin || minElo);
  const [valid, setValid] = useState(true);

  const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id == "min") {
      setRawMin(parseInt(value));
      setMin(parseInt(value));
      if (!rawMax || parseInt(value) <= (rawMax as number)) {
        setValid(true);
      } else {
        setValid(false);
      }
      return;
    }

    //max
    setRawMax(parseInt(value));
    setMax(parseInt(value));
    if (!rawMin || parseInt(value) >= (rawMin as number)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSave = () => {
    setMaxElo(rawMax as Number | undefined);
    setMinElo(rawMin as Number | undefined);
    setValid(false);
  };

  console.log("raw", rawMin, minElo);

  return (
    <div className="grid grid-cols-2 grid-rows-3 place-items-start items-center gap-2 box-border">
      <label htmlFor="min">Min</label>
      <Input
        value={min as number}
        onChange={(e) => handleEloChange(e)}
        id="min"
        className="w-[5rem]"
        type="number"
      />
      <label htmlFor="max">Max</label>
      <Input
        type="number"
        value={max as number}
        onChange={(e) => handleEloChange(e)}
        id="max"
        className="w-[5rem]"
      />
      <Button
        variant="neo"
        className="place-self-center col-span-2"
        disabled={!valid}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
}
