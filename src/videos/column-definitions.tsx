import { Button } from "@/components/ui/button";
import { ChessGame } from "@/database/queries";
import { ColumnDef } from "@tanstack/react-table";

//export type ChessGame = {
//     created_at: string;
//     creator: string;
//     url: string;
//     opening_pgn: string;
//     color: "black" | "white";
//     time_control: string;
//     elo: number;
//     id: string;
//     opponent_result: string;
//     pgn: string;
//   };

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
    header: "Elo",
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
