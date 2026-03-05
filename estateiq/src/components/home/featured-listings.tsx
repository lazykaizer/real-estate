"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/property-card";
import { createClient } from "@/lib/supabase/client";
import { mapDbProperties } from "@/lib/map-property";
import Link from "next/link";
import type { Property } from "@/types";

export default function FeaturedListings() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .limit(8); // Get latest properties instead of mock

        if (error) throw error;
        setProperties(mapDbProperties(data));
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[30%] h-[30%] bg-blue-50/50 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Featured Homes
            </h2>
            <p className="text-slate-500 mt-4 text-xl font-medium max-w-xl leading-relaxed">
              Discover our hand-picked collection of premium properties across the most desirable locations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-10 pt-4 snap-x snap-mandatory scrollbar-hide min-h-[480px]"
          style={{ scrollbarWidth: "none" }}
        >
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-4 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-200">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600/20" />
              <p className="text-lg font-bold">Curating your experience...</p>
            </div>
          ) : properties.length > 0 ? (
            properties.map((property, i) => (
              <div
                key={property.id}
                className="min-w-[340px] md:min-w-[380px] snap-start flex-shrink-0"
              >
                <PropertyCard property={property} index={i} />
              </div>
            ))
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200 p-12">
              <p className="text-2xl font-black text-slate-900 mb-2">No listings found</p>
              <p className="text-lg font-medium">Start by posting your first property to see it here!</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="h-16 px-10 rounded-2xl border-slate-200 text-slate-900 font-bold text-lg hover:bg-slate-900 hover:text-white transition-all shadow-sm"
          >
            <Link href="/buy">Explore All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
