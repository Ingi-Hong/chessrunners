import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { OpeningResponse, getOpenings } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import OpeningCard from "./OpeningCard";
import Badge from "@/components/badge";
export default function OpeningFilters({
  expand,
  setExpand = () => {},
}: {
  expand: boolean;
  setExpand: (b: boolean) => void;
}) {
  const [search, setSearch] = useState("");
  const [shouldRender, setRender] = useState(expand);
  const selPgns = useFilterStore((state) => state.selPgns);
  const setSelPgns = useFilterStore((state) => state.setSelPgns);

  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["openings", search],
    queryFn: () => getOpenings(search),
    enabled: search !== "",
  });

  const handleClose = () => {
    setExpand(false);
  };

  useLayoutEffect(() => {
    if (expand) {
      setRender(true);
    }
  });

  const onAnimationEnd = () => {
    if (!expand) {
      setRender(false);
    }
  };

  const selectAll = () => {
    if (!data?.data) return;
    const pgns = data?.data?.map((opening) => opening.opening_pgns);
    const flatPgns = pgns?.flat();
    console.log(flatPgns);
    setSelPgns(flatPgns);
  };

  let containerClass =
    "grid place-items-center w-svw h-svh fixed pl-24 pr-24 z-50 bg-black bg-opacity-50 top-0 left-0 box-border";
  let cardClass =
    "flex flex-col place-content-between w-full h-[90svh] p-6 m-0 box-border rounded-base";

  if (expand) {
    containerClass += " animate-fadeIn";
    cardClass += " animate-fadeInLong";
  } else {
    containerClass += " animate-fadeOut";
  }

  return (
    shouldRender && (
      <div className={containerClass} onAnimationEnd={onAnimationEnd}>
        <Card className={cardClass}>
          <div className="h-4/6">
            <div className="flex flex-row h-full gap-4">
              <div className="h-full flex-1 flex flex-col gap-2 box-border">
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={`Try "Queen's Gambit" or "1.e4 e5"`}
                />
                <div className="overflow-y-auto h-full">
                  {data?.data &&
                    data.data.map((opening: OpeningResponse) => (
                      <OpeningCard key={opening.opening} opening={opening} />
                    ))}
                </div>
                <div>
                  <Button
                    variant="neo"
                    disabled={data?.data?.length > 0 ? "" : "hidden"}
                    onClick={selectAll}
                  >
                    Select All{" "}
                    {data?.data?.length == undefined ||
                      (data?.data?.length !== 0 && `(${data?.data?.length})`)}
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
          <div className="w-full flex justify-end items-end gap-4">
            <Button
              variant="neo"
              onClick={() => setSelPgns([])}
              disabled={selPgns.length == 0}
            >
              Clear Selected {selPgns.length !== 0 && `(${selPgns.length})`}
            </Button>
            <Button variant="neo" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Card>
      </div>
    )
  );
}
