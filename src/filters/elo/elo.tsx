import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/global-state";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EloSlider() {
  const setMinElo = useFilterStore((state) => state.setMinElo);
  const setMaxElo = useFilterStore((state) => state.setMaxElo);
  const [valid, setValid] = useState(true);

  const [rawMin, setRawMin] = useState<undefined | Number | null | string>(
    null
  );
  const [rawMax, setRawMax] = useState<undefined | Number | null | string>(
    null
  );

  const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id == "min") {
      setRawMin(value);
      if (!rawMax || parseInt(value) <= (rawMax as number)) {
        setValid(true);
      } else {
        setValid(false);
      }
      return;
    }

    //max
    setRawMax(value);
    if (!rawMin || parseInt(value) >= (rawMin as number)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSave = () => {
    setMaxElo(rawMax);
    setMinElo(rawMin);
    setValid(false);
  };

  return (
    <div className="grid grid-cols-2 grid-rows-3 place-items-start items-center gap-2 box-border">
      <label htmlFor="min">Min</label>
      <Input
        value={rawMin as number}
        onChange={(e) => handleEloChange(e)}
        id="min"
        className="w-[5rem]"
        type="number"
      />
      <label htmlFor="max">Max</label>
      <Input
        type="number"
        value={rawMax as number}
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
