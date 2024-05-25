import { Button } from "@/components/ui/button";
import { ChessGame } from "@/database/queries";
import { useFilterStore } from "@/global-state";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ChessGame>[] = [
  {
    accessorKey: "creator",
    header: "Creator",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.original.color;

      return color.charAt(0).toUpperCase() + color.slice(1);
    },
  },
  {
    accessorKey: "elo",
    header: () => {
      const setSortBy = useFilterStore((state) => state.setSortBy);
      const handleClick = () => {
        setSortBy("elo");
      };

      return (
        <Button variant="header" onClick={handleClick}>
          Elo
          <svg
            width="1.4rem"
            height="1.4rem"
            viewBox="100 50 2 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M87.547 130L76 110H85.547V70H89.547V110H99.094L87.547 130ZM111.547 70L100 90H109.547V130H113.547V90H123.094L111.547 70Z"
              fill="black"
            />
          </svg>
        </Button>
      );
    },
  },
  {
    accessorKey: "time_control",
    header: "Time Control",
  },
  {
    accessorKey: "opening_pgn",
    header: "Opening PGN",
  },
  {
    id: "watch",
    cell: ({ row }) => {
      const url = row.original.url;

      return (
        <Button variant="neoSimple" asChild>
          <a href={url} target="_blank">
            Watch
          </a>
        </Button>
      );
    },
  },
];
