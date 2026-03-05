"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/data/mock";

const STATS = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "₹50Cr+", label: "Deals Closed" },
  { value: "4.8/5", label: "App Rating" },
  { value: "5,000+", label: "Verified Agents" },
];

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-xl bg-teal-light p-6"
            >
              <p className="text-2xl md:text-3xl font-bold text-teal">
                {stat.value}
              </p>
              <p className="text-sm text-gray-mid mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-navy">
            What Our Users Say
          </h2>
          <p className="text-gray-mid mt-1">
            Real stories from real people
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="relative rounded-xl border bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow"
            >
              <Quote className="h-8 w-8 text-blue-light mb-3" />
              <p className="text-sm text-gray-dark mb-4 leading-relaxed">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-gray-mid">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
