"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Key, Loader2, SlidersHorizontal, TrendingUp, Building2, BadgeCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PropertyCard from "@/components/property-card";
import { useSearchStore, useUIStore } from "@/stores";
import { createClient } from "@/lib/supabase/client";
import { mapDbProperties } from "@/lib/map-property";
import type { Property } from "@/types";

export default function RentPage() {
  const { filters, setFilters, setQuery } = useSearchStore();
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [isDbLoading, setIsDbLoading] = useState(true);

  useEffect(() => {
    setFilters({ tab: "rent" });

    const fetchProperties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("listing_type", "rent")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data) setDbProperties(mapDbProperties(data));
      } catch (err) {
        console.error("Error fetching rentals:", err);
      } finally {
        setIsDbLoading(false);
      }
    };

    fetchProperties();
  }, [setFilters]);

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
          ...data.filters,
          tab: "rent",
          query: data.filters.query || filters.query,
        });
      }
    } catch (error) {
      console.error("AI Search Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredProperties = useMemo(() => {
    const results = dbProperties.filter((p) => {
      const q = filters.query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
      );
    });
    return results;
  }, [filters.query, dbProperties]);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Premium Header Container */}
      <div className="relative overflow-hidden bg-slate-900 pb-20 pt-12 md:pb-24 md:pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 opacity-100" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 px-2" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                <Key className="h-3.5 w-3.5" /> Premium Rentals
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                Find Your Next <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Luxury Stay.</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed mx-auto md:mx-0">
                Discover curated homes and premium stays. Verified listings with 24/7 support and transparent rental process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    value={filters.query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                    placeholder="Area, project, or lifestyle..."
                    className="pl-14 h-16 text-lg bg-white/95 rounded-2xl border-none focus-visible:ring-2 focus-visible:ring-blue-500 text-slate-950 font-bold"
                  />
                  <Button
                    onClick={handleAiSearch}
                    disabled={isAiLoading}
                    className="absolute right-2 top-2 bottom-2 px-8 rounded-xl bg-slate-900 hover:bg-black text-white font-black shadow-lg transition-all active:scale-95"
                  >
                    {isAiLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Find Homes"
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  {[
                    { icon: BadgeCheck, label: "Verified Only" },
                    { icon: TrendingUp, label: "Market Growth: +3.8%" },
                    { icon: Building2, label: "Managed Stays" }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 py-1.5 px-3 rounded-lg border border-white/5">
                      <badge.icon className="h-3.5 w-3.5 text-blue-400" />
                      {badge.label}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Available Markets</h2>
            <p className="text-slate-500 font-medium mt-1">
              Showing <span className="text-blue-600 font-bold">{filteredProperties.length}</span> luxury rentals matching your search
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl border-slate-200 font-bold h-11">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Show Filters
            </Button>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <PropertyCard property={property} index={i} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-50/10 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No Direct Matches
              </h3>
              <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">
                We couldn't find any rentals matching these criteria. Try adjusting your search or filters.
              </p>
              <Button
                onClick={() => setQuery("")}
                className="bg-slate-900 text-white font-black rounded-2xl h-14 px-10 hover:bg-black shadow-xl"
              >
                Reset Search
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
