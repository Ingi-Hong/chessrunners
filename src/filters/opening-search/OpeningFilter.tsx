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
  small?: boolean;
}) {
  const [search, setSearch] = useState("");
  //TODO refactor to map instead of array
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
    const currPgns = selPgns.filter((pgn) => !flatPgns.includes(pgn));
    setSelPgns(currPgns.concat(flatPgns));
  };

  return (
    <Modal active={expand} setActive={setExpand}>
      <div className="h-5/6 w-4/5">
        <div className="flex flex-row h-full gap-1 sm:gap-2">
          <div className="h-full flex-1 flex flex-col gap-1 sm:gap-2 box-border">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Try "Queen's Gambit" or "1.e4 e5"`}
            />
            <div className="overflow-x-auto h-full border-2 rounded-base bg-white">
              {data?.data &&
                data.data.map((opening: OpeningResponse) => (
                  <OpeningCard key={opening.opening} opening={opening} />
                ))}
            </div>
            <div className="flex gap-1 ">
              <Button
                variant="neo"
                disabled={data?.data?.length === 0 || data === undefined}
                onClick={selectAll}
                className="bg-white"
              >
                Select All{" "}
                {data?.data?.length == undefined ||
                  (data?.data?.length !== 0 &&
                    `(${data?.data?.reduce(
                      (curr, opening) => opening.opening_pgns.length + curr,
                      0
                    )})`)}
              </Button>
              <Button
                variant="neo"
                onClick={() => setSelPgns([])}
                disabled={selPgns.length == 0}
                className="bg-white "
              >
                <text className="sm:hidden">Clear</text>
                <text className="hidden sm:block">Clear Selected</text>
                {selPgns.length !== 0 && `(${selPgns.length})`}
              </Button>
            </div>
          </div>
          <div className="flex-1 items-start justify-start content-start flex-wrap overflow-y-auto overflow-x-hidden gap-1 bg-white border-2 p-1 rounded-base hidden sm:flex">
            {(!selPgns || selPgns.length == 0) && (
              <p className="place-self-center">No openings selected.</p>
            )}
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
