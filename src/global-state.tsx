import { create } from "zustand";

export type FilterStore = {
  selColor: Array<"black" | "white">;
  setSelColor: (selColor: Array<"black" | "white">) => void;
  selCreator: string[];
  setSelCreator: (selCreator: string[]) => void;
  rawMin: Number | undefined;
  setRawMin: (rawMin: Number | undefined) => void;
  rawMax: Number | undefined;
  setRawMax: (rawMax: Number | undefined) => void;
  minElo: Number | undefined;
  setMinElo: (minElo: Number | undefined) => void;
  maxElo: Number | undefined;
  setMaxElo: (maxElo: Number | undefined) => void;
  selTimes: string[];
  setSelTimes: (selTimes: string[]) => void;
  selPgns: string[];
  setSelPgns: (selPgns: string[]) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  selColor: [],
  setSelColor: (selColor: Array<"black" | "white">) =>
    set(() => ({ selColor })),
  selCreator: [],
  setSelCreator: (selCreator: string[]) => set(() => ({ selCreator })),
  rawMin: 0,
  setRawMin: (rawMin) => set({ rawMin }),
  rawMax: 2700,
  setRawMax: (rawMax) => set({ rawMax }),
  minElo: 0,
  setMinElo: (minElo) => set({ minElo }),
  maxElo: 2700,
  setMaxElo: (maxElo) => set({ maxElo }),
  selTimes: [],
  setSelTimes: (selTimes) => set({ selTimes }),
  selPgns: [],
  setSelPgns: (selPgns) => set({ selPgns }),
}));

type OpeningSearchState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const useOpeningSearch = create<OpeningSearchState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));
