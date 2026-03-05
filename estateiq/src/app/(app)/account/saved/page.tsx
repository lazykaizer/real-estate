"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSavedHomesStore } from "@/stores";
import { createClient } from "@/lib/supabase/client";
import { mapDbProperties } from "@/lib/map-property";
import PropertyCard from "@/components/property-card";
import Link from "next/link";
import type { Property } from "@/types";

export default function SavedHomesPage() {
  const { savedIds, toggle } = useSavedHomesStore();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      if (savedIds.size === 0) {
        setSavedProperties([]);
        setIsLoading(false);
        return;
      }

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .in("id", Array.from(savedIds));

        if (error) throw error;
        setSavedProperties(mapDbProperties(data));
      } catch (err) {
        console.error("Error fetching saved properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaved();
  }, [savedIds]);

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-gray-light">
        <Loader2 className="h-8 w-8 animate-spin text-blue" />
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-gray-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Button asChild variant="ghost" size="sm">
              <Link href="/account">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <h1 className="text-xl font-bold text-navy">
                Saved Homes ({savedProperties.length})
              </h1>
            </div>
          </div>

          {savedProperties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((property, index) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} index={index} />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 z-10 h-8 w-8 p-0 rounded-full"
                    onClick={() => toggle(property.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-16 text-center">
                <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-navy mb-2">
                  No Saved Homes Yet
                </h2>
                <p className="text-sm text-gray-mid mb-6 max-w-md mx-auto">
                  Click the heart icon on any property to save it here. You can
                  compare and track your favourite properties.
                </p>
                <Button asChild className="bg-blue hover:bg-blue/90 text-white">
                  <Link href="/buy">Start Browsing</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
