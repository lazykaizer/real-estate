"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  MapPin,
  X,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PropertyCard from "@/components/property-card";
import { useSearchStore, useUIStore } from "@/stores";
import { createClient } from "@/lib/supabase/client";
import { mapDbProperties } from "@/lib/map-property";
import type { Property, PropertyType, SortOption } from "@/types";

const PROPERTY_TYPES: { label: string; value: PropertyType }[] = [
  { label: "Apartment", value: "apartment" },
  { label: "Villa", value: "villa" },
  { label: "Plot", value: "plot" },
  { label: "Commercial", value: "commercial" },
  { label: "PG", value: "pg" },
];

const BED_OPTIONS = [1, 2, 3, 4, 5];
const BATH_OPTIONS = [1, 2, 3];

const AMENITIES = [
  "gym", "pool", "parking", "security", "lift",
  "power-backup", "gas-pipeline", "clubhouse",
];

const PRICE_CHIPS = [
  { label: "₹25L", value: 2500000 },
  { label: "₹50L", value: 5000000 },
  { label: "₹1Cr", value: 10000000 },
  { label: "₹2Cr", value: 20000000 },
  { label: "₹5Cr", value: 50000000 },
];

function FilterPanel() {
  const { filters, setFilters, resetFilters } = useSearchStore();

  const toggleArrayItem = <T,>(arr: T[], item: T): T[] =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">MIN</span>
          <Input
            type="number"
            placeholder="0"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setFilters({ minPrice: Number(e.target.value) || 0 })
            }
            className="pl-10 text-xs font-bold h-10 border-slate-100 bg-slate-50/50 rounded-xl"
          />
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">MAX</span>
          <Input
            type="number"
            placeholder="Any"
            value={filters.maxPrice === 500000000 ? "" : filters.maxPrice}
            onChange={(e) =>
              setFilters({
                maxPrice: Number(e.target.value) || 500000000,
              })
            }
            className="pl-10 text-xs font-bold h-10 border-slate-100 bg-slate-50/50 rounded-xl"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {PRICE_CHIPS.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setFilters({ maxPrice: chip.value })}
            className={`rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all duration-300 ${filters.maxPrice === chip.value
              ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10"
              : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
              }`}
          >
            Upto {chip.label}
          </button>
        ))}
      </div>

      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Space & Lifestyle</h4>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2.5">Bedrooms</p>
            <div className="flex gap-2">
              {BED_OPTIONS.map((b) => (
                <button
                  key={b}
                  onClick={() =>
                    setFilters({ beds: toggleArrayItem(filters.beds, b) })
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black border transition-all duration-300 ${filters.beds.includes(b)
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                    : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                    }`}
                >
                  {b}{b === 5 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2.5">Bathrooms</p>
            <div className="flex gap-2">
              {BATH_OPTIONS.map((b) => (
                <button
                  key={b}
                  onClick={() =>
                    setFilters({ baths: toggleArrayItem(filters.baths, b) })
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black border transition-all duration-300 ${filters.baths.includes(b)
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20"
                    : "bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                    }`}
                >
                  {b}{b === 3 ? "+" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Property Type</h4>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((pt) => (
            <button
              key={pt.value}
              onClick={() =>
                setFilters({
                  propertyType: toggleArrayItem(
                    filters.propertyType,
                    pt.value
                  ),
                })
              }
              className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all duration-300 ${filters.propertyType.includes(pt.value)
                ? "bg-slate-900 text-white border-slate-900 shadow-lg"
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                }`}
            >
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Amenities</h4>
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map((a) => (
            <button
              key={a}
              onClick={() =>
                setFilters({
                  amenities: toggleArrayItem(filters.amenities, a),
                })
              }
              className={`rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-wider border transition-all duration-300 ${filters.amenities.includes(a)
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-900"
                }`}
            >
              {a.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Status */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Verification</h4>
        <div className="space-y-3">
          {["RERA Verified", "Ready to Move", "Ready to Register"].map(
            (s) => (
              <label
                key={s}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${filters.special.includes(s) ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200 group-hover:border-blue-400'}`}>
                  <Checkbox
                    checked={filters.special.includes(s)}
                    onCheckedChange={() =>
                      setFilters({
                        special: toggleArrayItem(filters.special, s),
                      })
                    }
                    className="h-4 w-4 border-none data-[state=checked]:bg-transparent shadow-none"
                  />
                </div>
                <span className={`text-xs font-bold transition-all ${filters.special.includes(s) ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{s}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={resetFilters}
          className="w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  );
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="pt-24 min-h-screen bg-gray-light" />}>
      <BuyPageInner />
    </Suspense>
  );
}

function BuyPageInner() {
  const { filters, setFilters, setQuery } = useSearchStore();
  const { viewMode, setViewMode } = useUIStore();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(true);
  const searchParams = useSearchParams();

  // Fetch real properties from Supabase
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("listing_type", "sale")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setDbProperties(mapDbProperties(data));
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setIsDbLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleAiSearch = async () => {
    if (!filters.query) return;

    setIsAiLoading(true);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: filters.query }),
      });

      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();

      if (data.filters) {
        setFilters({
          ...filters,
          query: data.filters.query || filters.query,
          minPrice: data.filters.minPrice || 0,
          maxPrice: data.filters.maxPrice || 500000000,
          beds: data.filters.beds || [],
          propertyType: data.filters.propertyType || [],
          special: data.filters.special || [],
        });
      }
    } catch (error) {
      console.error("AI Search Error", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    const q = searchParams.get("q") || searchParams.get("location") || "";
    if (q) setQuery(q);
  }, [searchParams, setQuery]);

  const filteredProperties = useMemo(() => {
    // Only use DB properties
    let results = [...dbProperties];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.locality.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (filters.minPrice > 0) {
      results = results.filter((p) => p.price >= filters.minPrice);
    }
    if (filters.maxPrice < 500000000) {
      results = results.filter((p) => p.price <= filters.maxPrice);
    }
    if (filters.beds.length > 0) {
      results = results.filter((p) => filters.beds.includes(p.beds));
    }
    if (filters.baths.length > 0) {
      results = results.filter((p) => filters.baths.includes(p.baths));
    }
    if (filters.propertyType.length > 0) {
      results = results.filter((p) =>
        filters.propertyType.includes(p.propertyType)
      );
    }
    if (filters.amenities.length > 0) {
      results = results.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );
    }

    if (filters.special.length > 0) {
      results = results.filter((p) =>
        filters.special.every((s) => {
          switch (s) {
            case "RERA Verified": return p.isVerified;
            case "Price Drop": return p.isPriceDropped;
            case "New Construction": return p.yearBuilt >= 2024;
            case "Ready to Move": return p.status === "active";
            default: return true;
          }
        })
      );
    }

    // Sort
    switch (filters.sort) {
      case "price-low":
        results.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        results.sort((a, b) => a.daysListed - b.daysListed);
        break;
      case "price-drop":
        results.sort(
          (a, b) =>
            (b.isPriceDropped ? 1 : 0) - (a.isPriceDropped ? 1 : 0)
        );
        break;
      default:
        // relevant — featured first
        results.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
    }

    return results;
  }, [filters]);

  const activeFilterCount =
    filters.beds.length +
    filters.baths.length +
    filters.propertyType.length +
    filters.amenities.length +
    filters.special.length +
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 500000000 ? 1 : 0);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-light">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b sticky top-16 lg:top-20 z-30 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">

          {/* Property Filter Bar */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-blue-600/5 blur-3xl -z-10 rounded-full" />
            <div className="relative flex items-center bg-white border border-slate-200 rounded-3xl p-1.5 shadow-xl shadow-slate-200/40 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <div className="flex items-center flex-1 px-5">
                <Search className="h-5 w-5 text-slate-400 mr-4" />
                <Input
                  value={filters.query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter city, locality, or your dream project name..."
                  className="w-full bg-transparent border-none text-slate-900 placeholder:text-slate-400 font-bold focus-visible:ring-0 text-base py-7 shadow-none"
                />
              </div>
              <Button
                onClick={handleAiSearch}
                disabled={isAiLoading || !filters.query}
                className="rounded-2xl px-10 py-7 bg-slate-900 hover:bg-black text-white font-black shadow-2xl transition-all active:scale-95"
              >
                {isAiLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Searching Markets...
                  </>
                ) : (
                  "Find Homes"
                )}
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-3 ml-6 font-bold text-[10px] uppercase tracking-widest text-slate-400">
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> 250k+ Listings</span>
              <span className="flex items-center gap-1.5"><Badge className="h-1.5 w-1.5 rounded-full bg-emerald-500 p-0" /> Verified Only</span>
              <span className="flex items-center gap-1.5 text-blue-500"><TrendingUp className="h-3 w-3" /> Market Growth: +4.2%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">

            {/* Sort */}
            <Select
              value={filters.sort}
              onValueChange={(v) => setFilters({ sort: v as SortOption })}
            >
              <SelectTrigger className="w-40 h-10 hidden sm:flex">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevant">Most Relevant</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-drop">Price Drop</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="hidden md:flex items-center border rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${viewMode === "grid"
                  ? "bg-blue text-white"
                  : "text-gray-mid hover:text-blue"
                  }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${viewMode === "list"
                  ? "bg-blue text-white"
                  : "text-gray-mid hover:text-blue"
                  }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden relative"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-blue text-white text-[10px]">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-52 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-slate-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-h-[calc(100vh-220px)] overflow-y-auto">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h3 className="text-lg font-black text-slate-900">Filters</h3>
                {activeFilterCount > 0 && (
                  <Badge className="bg-blue-600 text-white rounded-full px-2.5">
                    {activeFilterCount}
                  </Badge>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Results Count & AI Insights Tab */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <p className="text-sm text-slate-600 font-medium">
                <span className="font-black text-slate-900 text-lg mr-1">
                  {filteredProperties.length}
                </span>
                properties found matching your criteria
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={() => useSearchStore.getState().resetFilters()}
                  className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Property Grid */}
            {filteredProperties.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredProperties.map((property, i) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <PropertyCard
                      property={property}
                      index={i}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative overflow-hidden group py-32 bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 to-transparent pointer-events-none" />
                <div className="relative z-10 max-w-sm mx-auto">
                  <div className="w-24 h-24 bg-white shadow-xl shadow-slate-200/50 rounded-full flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-500">
                    <Search className="h-10 w-10 text-slate-300" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    No Direct Matches
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-10 px-4">
                    We couldn't find any properties matching these exact criteria. Try broadening your search or resetting filters.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => useSearchStore.getState().resetFilters()}
                    className="h-14 bg-slate-900 text-white rounded-2xl font-black px-10 hover:bg-black transition-all shadow-xl shadow-slate-900/20"
                  >
                    Explore All Markets
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
