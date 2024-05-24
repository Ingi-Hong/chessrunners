import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { supabase } from "./database";

export type eloRange = {
  min: Number;
  max: Number;
};

export type FilterParams = {
  creators: string[];
  colors: Array<"Black" | "White">;
  eloRange: eloRange;
  timeControl: TimeControl[];
  openings: string[];
};

export type ChessGame = {
  created_at: string;
  creator: string;
  url: string;
  opening_pgn: string;
  color: "black" | "white";
  time_control: string;
  elo: number;
  id: string;
  opponent_result: string;
  pgn: string;
};

export const getVideos = async (
  filters: FilterParams
): Promise<PostgrestSingleResponse<ChessGame[]>> => {
  const andFilters = [];

  if (filters.creators.length > 0) {
    andFilters.push(["in", "creator", filters.creators]);
  }

  if (filters.colors.length > 0) {
    andFilters.push(["in", "color", filters.colors]);
  }

  if (filters.eloRange.min) {
    andFilters.push(["gte", "elo", filters.eloRange.min]);
  }

  if (filters.eloRange.max) {
    andFilters.push(["lte", "elo", filters.eloRange.max]);
  }

  if (filters.timeControls) {
    andFilters.push(["in", "time_control", filters.timeControls]);
  }

  if (filters.openings.length > 0) {
    andFilters.push(["in", "opening_pgn", filters.openings]);
  }

  return andFilters
    .reduce((acc, [filter, ...args]) => {
      return acc[filter](...args);
    }, supabase.from("videos").select())
    .throwOnError();
};

export type OpeningResponse = {
  opening: string;
  opening_pgns: string[];
};

export const getOpenings = async (
  searchString: string
): Promise<PostgrestSingleResponse<OpeningResponse[]>> => {
  let searchType = "";
  if (searchString.startsWith("1")) {
    searchType = "search_openings_by_pgn";
    searchString = searchString.replace(/\.\s+/g, ".");
  } else {
    searchType = "search_openings_by_prefix";
    searchString = searchString.replace(/ /g, "+");
  }

  return supabase
    .rpc(searchType, {
      prefix: searchString,
    })
    .throwOnError();
};

export type TimeControl = {
  time_control: string;
};
export const getTimeControls = async (): Promise<
  PostgrestSingleResponse<TimeControl[]>
> => {
  return supabase.from("unique_time_control_view").select().throwOnError();
};
