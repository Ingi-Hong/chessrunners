import Badge from "@/components/badge";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OpeningResponse, getOpenings } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import OpeningCard from "./OpeningCard";
export default function OpeningFilters({
  expand,
  setExpand,
}: {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}) {
  const [search, setSearch] = useState("");
  const selPgns = useFilterStore((state) => state.selPgns);
  const setSelPgns = useFilterStore((state) => state.setSelPgns);

  const { data } = useQuery({
    queryKey: ["openings", search],
    queryFn: () => getOpenings(search),
    enabled: search !== "",
  });

  const selectAll = () => {
    if (!data?.data) return;
    const pgns = data?.data?.map((opening) => opening.opening_pgns);
    const flatPgns = pgns?.flat();
    console.log(flatPgns);
    setSelPgns(flatPgns);
  };

  return (
    <Modal active={expand} setActive={setExpand}>
      <div className="h-4/5 w-4/5">
        <div className="flex flex-row h-full gap-4">
          <div className="h-full flex-1 flex flex-col gap-2 box-border">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Try "Queen's Gambit" or "1.e4 e5"`}
            />
            <div className="overflow-y-auto h-full border-2">
              {data?.data &&
                data.data.map((opening: OpeningResponse) => (
                  <OpeningCard key={opening.opening} opening={opening} />
                ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="neo"
                disabled={data?.data?.length === 0 || data === undefined}
                onClick={selectAll}
              >
                Select All{" "}
                {data?.data?.length == undefined ||
                  (data?.data?.length !== 0 && `(${data?.data?.length})`)}
              </Button>
              <Button
                variant="neo"
                onClick={() => setSelPgns([])}
                disabled={selPgns.length == 0}
                className="bg-white"
              >
                Clear Selected {selPgns.length !== 0 && `(${selPgns.length})`}
              </Button>
            </div>
          </div>
          <div className="flex-1 flex items-start justify-start content-start flex-wrap overflow-y-auto overflow-x-hidden gap-1">
            {selPgns.map((pgn) => (
              <Badge
                text={pgn}
                className="lg:whitespace-nowrap whitespace-normal"
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
