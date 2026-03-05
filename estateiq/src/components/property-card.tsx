"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Bed, Bath, Maximize, MapPin, Camera, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSavedHomesStore } from "@/stores";
import { formatPrice, formatPricePerSqft } from "@/data/mock";
import { useRequireAuth } from "@/hooks/use-require-auth";
import type { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const { isSaved, toggle } = useSavedHomesStore();
  const { requireAuthAction } = useRequireAuth();
  const saved = isSaved(property.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Container */}
      <Link href={`/property/${property.id}`} className="block relative aspect-[1.1/1] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Glossy Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-5 left-5 flex flex-wrap gap-2">
          {property.daysListed < 7 && (
            <Badge className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border-none px-3 py-1.5 rounded-lg shadow-lg">
              New Listing
            </Badge>
          )}
          {property.isFeatured && (
            <Badge className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border-none px-3 py-1.5 rounded-lg shadow-lg">
              Featured
            </Badge>
          )}
        </div>

        {/* Price Point on Image */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
            <span className="text-xl font-black text-slate-900 leading-none">
              {formatPrice(property.price)}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              requireAuthAction(() => toggle(property.id));
            }}
            className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-md shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 active:scale-95 group"
            aria-label={saved ? "Remove from saved" : "Save property"}
          >
            <Heart
              className={`h-5 w-5 transition-all duration-300 ${saved ? "fill-red-500 text-red-500" : "text-slate-400 group-hover:text-red-400"
                }`}
            />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1 truncate max-w-[200px]">
            {property.locality}, {property.city}
          </span>
        </div>

        <Link href={`/property/${property.id}`}>
          <h3 className="text-xl font-black text-slate-900 line-clamp-1 hover:text-blue-600 transition-colors mb-4 tracking-tight">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-4 py-4 border-y border-slate-50 mb-4">
          {(property.beds ?? 0) > 0 && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Beds</span>
              <span className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <Bed className="h-4 w-4 text-blue-500" /> {property.beds}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Baths</span>
            <span className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Bath className="h-4 w-4 text-blue-500" /> {property.baths ?? 0}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Area</span>
            <span className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
              <Maximize className="h-4 w-4 text-blue-500" /> {(property.sqft ?? 0).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400">
              {property.postedBy} · {property.daysListed}d ago
            </span>
          </div>
          {property.isVerified && (
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded-lg">
              <CheckCircle className="h-3 w-3 text-emerald-600" />
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-wider">Verified</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
