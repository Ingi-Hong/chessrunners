import { FilterParams, getVideos } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column-definitions";
import { DataTable } from "./data-table";
import { ColorOptions } from "@/filters/checkbox-filters/checkbox-filters";

export default function Videos() {
  const colors = useFilterStore((state) => state.selColor);
  const creators = useFilterStore((state) => state.selCreator);
  const eloMin = useFilterStore((state) => state.minElo);
  const eloMax = useFilterStore((state) => state.maxElo);
  const timeControl = useFilterStore((state) => state.selTimes);
  const selPgns = useFilterStore((state) => state.selPgns);
  const sortBy = useFilterStore((state) => state.sortBy);
  const isDesc = useFilterStore((state) => state.isDesc);

  const filters: FilterParams = {
    colors,
    creators,
    eloRange: { min: eloMin as Number, max: eloMax as Number },
    timeControl,
    openings: selPgns,
    sortBy,
    isDesc,
  };

  const { data } = useQuery({
    queryKey: ["videos", filters],
    queryFn: () => getVideos(filters),
  });

  return (
    <div className="mx-auto box-border overflow-auto h-[calc(100%-44.44px)] sm:h-[calc(100%-96px)] w-full bg-bg">
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}
