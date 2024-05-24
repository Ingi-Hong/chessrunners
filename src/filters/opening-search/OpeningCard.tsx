import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { OpeningResponse } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useCallback, useEffect, useState } from "react";
const isChecked = (list: string[], value: string): boolean => {
  return list.includes(value);
};

const PGN = ({
  pgn,
  selPgns,
  setSelPgns,
  setComplete,
  siblings,
  complete,
}: {
  pgn: string;
  selPgns: string[];
  setSelPgns: (selPgns: string[]) => void;
  setComplete: (b: boolean) => void;
  siblings: string[];
  complete: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(selPgns.includes(pgn));

  const checker = useCallback(() => {
    if (selPgns.includes(pgn)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    setComplete(isComplete(selPgns, siblings));
  }, [selPgns, pgn]);

  const onClick = () => {
    let newPgns = [];
    if (isChecked) {
      newPgns = selPgns.filter((currPgn) => pgn !== currPgn);
    } else {
      newPgns = [...selPgns, pgn];
    }
    setIsChecked(!isChecked);
    setComplete(isComplete(newPgns, siblings));
    setSelPgns(newPgns);
  };

  useEffect(() => {
    checker();
  }, [complete, selPgns]);

  return (
    <div className="flex flex-row place-items-center pl-8 gap-1 cursor-pointer box-border">
      <Checkbox id={pgn} checked={isChecked || complete} onClick={onClick} />
      <label className="cursor-pointer" id={pgn}>
        {pgn}
      </label>
    </div>
  );
};

type OpeningCardProps = {
  opening: OpeningResponse;
};

const isComplete = (list: string[], children: string[]) => {
  for (const child of children) {
    if (!list.includes(child)) {
      return false;
    }
  }
  return true;
};

export default function OpeningCard({ opening }: OpeningCardProps) {
  const selPgns = useFilterStore((state) => state.selPgns);
  const [complete, setComplete] = useState(
    isComplete(selPgns, opening.opening_pgns)
  );

  const setSelPgns = useFilterStore((state) => state.setSelPgns);
  const handleSelectAll = () => {
    const children = opening.opening_pgns;
    if (complete) {
      const newPgns = selPgns.filter((pgn) => {
        for (const child of children) {
          if (pgn == child) {
            return false;
          }
        }
        return true;
      });
      setSelPgns(newPgns);
      setComplete(false);
    } else {
      const newPgns = [...selPgns];
      for (const child of children) {
        if (!newPgns.includes(child)) {
          newPgns.push(child);
        }
      }
      setSelPgns(newPgns);
      setComplete(true);
    }
  };

  const handleClick = (e) => {
    const id = e?.target?.id;
    if (id.startsWith("1.")) {
      if (selPgns.includes(id)) {
        const newPgns = [...selPgns];
        setSelPgns(newPgns.filter((pgn) => pgn !== id));
      } else {
        setSelPgns([...selPgns, id]);
      }
    } else {
      handleSelectAll();
    }
  };

  return (
    <Card className="">
      <div
        className="flex flex-col gap-0.5 p-4 cursor-pointer box-border"
        onClick={(e) => handleClick(e)}
      >
        <div className="flex flex-row place-items-center gap-1 cursor-pointer box-border box-border">
          <Checkbox
            id={opening.opening}
            checked={complete}
            onClick={(e) => handleSelectAll(e)}
          />
          <label className="cursor-pointer" id={opening.opening}>
            {opening.opening}
          </label>
        </div>
        {opening.opening_pgns.map((pgn) => (
          <PGN
            key={pgn}
            pgn={pgn}
            selPgns={selPgns}
            setSelPgns={setSelPgns}
            setComplete={setComplete}
            siblings={opening.opening_pgns}
            complete={complete}
          />
        ))}
      </div>
    </Card>
  );
}
