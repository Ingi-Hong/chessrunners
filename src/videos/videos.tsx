import { FilterParams, getVideos } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./column-definitions";
import { DataTable } from "./data-table";
export default function Videos() {
  const colors = useFilterStore((state) => state.selColor);
  const creators = useFilterStore((state) => state.selCreator);
  const eloMin = useFilterStore((state) => state.minElo);
  const eloMax = useFilterStore((state) => state.maxElo);
  const timeControl = useFilterStore((state) => state.selTimes);
  const selPgns = useFilterStore((state) => state.selPgns);

  const filters: FilterParams = {
    colors,
    creators,
    eloRange: { min: eloMin, max: eloMax },
    timeControl,
    openings: selPgns,
  };

  const { isPending, isError, data, error, isFetching } = useQuery({
    queryKey: ["videos", filters],
    queryFn: () => getVideos(filters),
  });

  return (
    <div className="mx-auto box-border overflow-auto h-[calc(100%-96px)] w-full">
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}
