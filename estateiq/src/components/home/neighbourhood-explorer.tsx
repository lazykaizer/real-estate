"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin, Star, Footprints } from "lucide-react";
import { MOCK_NEIGHBOURHOODS, formatPrice } from "@/data/mock";

export default function NeighbourhoodExplorer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-navy">
            Explore Neighbourhoods
          </h2>
          <p className="text-gray-mid mt-1">
            Discover the perfect area to call home
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_NEIGHBOURHOODS.map((nb, i) => (
            <motion.div
              key={nb.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={`/buy?q=${encodeURIComponent(nb.name)}`}
                className="group block overflow-hidden rounded-xl border bg-white shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={nb.image}
                    alt={nb.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="text-lg font-bold">{nb.name}</h3>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {nb.city}
                    </p>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="font-bold text-blue text-sm">
                      {formatPrice(nb.avgPrice)}
                    </p>
                    <p className="text-gray-mid">Avg. Price</p>
                  </div>
                  <div>
                    <p className="font-bold text-green text-sm flex items-center justify-center gap-0.5">
                      <Footprints className="h-3.5 w-3.5" />
                      {nb.walkScore}
                    </p>
                    <p className="text-gray-mid">Walk Score</p>
                  </div>
                  <div>
                    <p className="font-bold text-teal text-sm flex items-center justify-center gap-0.5">
                      <Star className="h-3.5 w-3.5" />
                      {nb.schoolRating}
                    </p>
                    <p className="text-gray-mid">Schools</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
