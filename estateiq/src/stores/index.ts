import { create } from "zustand";
import type { Property, SearchFilters, SearchTab } from "@/types";

/* ─── Search / Filter Store ─── */
interface SearchState {
  filters: SearchFilters;
  setTab: (tab: SearchTab) => void;
  setQuery: (query: string) => void;
  setFilters: (partial: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: SearchFilters = {
  tab: "buy",
  query: "",
  minPrice: 0,
  maxPrice: 500000000,
  beds: [],
  baths: [],
  propertyType: [],
  furnishing: "any",
  postedBy: [],
  minArea: 0,
  maxArea: 10000,
  amenities: [],
  sort: "relevant",
  special: [],
};

export const useSearchStore = create<SearchState>((set) => ({
  filters: { ...DEFAULT_FILTERS },
  setTab: (tab) => set((s) => ({ filters: { ...s.filters, tab } })),
  setQuery: (query) => set((s) => ({ filters: { ...s.filters, query } })),
  setFilters: (partial) =>
    set((s) => ({ filters: { ...s.filters, ...partial } })),
  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),
}));

/* ─── Saved Homes Store ─── */
interface SavedHomesState {
  savedIds: Set<string>;
  toggle: (id: string) => void;
  isSaved: (id: string) => boolean;
}

export const useSavedHomesStore = create<SavedHomesState>((set, get) => ({
  savedIds: new Set<string>(),
  toggle: (id) =>
    set((s) => {
      const next = new Set(s.savedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { savedIds: next };
    }),
  isSaved: (id) => get().savedIds.has(id),
}));

/* ─── Compare Properties Store ─── */
interface CompareState {
  properties: Property[];
  add: (property: Property) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>((set) => ({
  properties: [],
  add: (property) =>
    set((s) => {
      if (s.properties.length >= 4) return s;
      if (s.properties.find((p) => p.id === property.id)) return s;
      return { properties: [...s.properties, property] };
    }),
  remove: (id) =>
    set((s) => ({ properties: s.properties.filter((p) => p.id !== id) })),
  clear: () => set({ properties: [] }),
}));

/* ─── UI State Store ─── */
interface UIState {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  mapVisible: boolean;
  setMapVisible: (visible: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  mapVisible: true,
  setMapVisible: (visible) => set({ mapVisible: visible }),
  viewMode: "grid",
  setViewMode: (mode) => set({ viewMode: mode }),
}));
