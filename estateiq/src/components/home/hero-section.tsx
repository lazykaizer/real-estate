"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, TrendingUp, Shield, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/stores";
import type { SearchTab } from "@/types";

const TABS: { label: string; value: SearchTab }[] = [
  { label: "Buy", value: "buy" },
  { label: "Rent", value: "rent" },
  { label: "Sold", value: "sold" },
];

const POPULAR_SEARCHES = [
  "Homes in Mumbai",
  "2BHK Apartments",
  "Villas in Bangalore",
  "Homes under ₹1 Cr",
  "New Projects",
];

const TRUST_STATS = [
  { icon: TrendingUp, label: "Real-time market valuation" },
  { icon: Shield, label: "Verified property listings" },
  { icon: Users, label: "Direct agent connection" },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<SearchTab>("buy");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setFilters } = useSearchStore();

  const handleSearch = async () => {
    if (!query) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();

      if (data.filters) {
        setFilters({
          ...data.filters,
          tab: activeTab,
        });
      } else {
        setFilters({ query, tab: activeTab });
      }

      router.push(activeTab === "rent" ? "/rent" : "/buy");
    } catch (error) {
      console.error("Search Error:", error);
      router.push(`${activeTab === "rent" ? "/rent" : "/buy"}?q=${encodeURIComponent(query)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4"
        >
          Find Your Perfect Place
          <br />
          <span className="text-blue-light">with EstateIQ</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-white/70 mb-8 max-w-2xl mx-auto"
        >
          India&apos;s smartest property search — browse verified listings,
          explore neighbourhoods, and connect with top agents.
        </motion.p>

        {/* Search Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-modal p-2 md:p-3"
        >
          {/* Tabs */}
          <div className="flex gap-1 mb-3 border-b px-2">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab.value
                  ? "text-blue"
                  : "text-gray-mid hover:text-gray-dark"
                  }`}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="hero-tab"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-blue rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-mid" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for: 'Modern 3BHK in Mumbai under 5Cr' or 'Villas in Pune'..."
                className="pl-11 h-12 text-base border-none bg-gray-light focus-visible:ring-blue"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-md border border-blue-100 pointer-events-none">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Premium Search</span>
              </div>
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !query}
              size="lg"
              className="bg-slate-900 hover:bg-black text-white font-bold px-8 h-12 min-w-[120px] rounded-xl transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Explore"
              )}
            </Button>
          </div>
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-white/50">Popular:</span>
          {POPULAR_SEARCHES.map((ps) => (
            <button
              key={ps}
              onClick={() => {
                setQuery(ps);
                router.push(`/buy?q=${encodeURIComponent(ps)}`);
              }}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              {ps}
            </button>
          ))}
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {TRUST_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 text-white/80"
            >
              <stat.icon className="h-5 w-5 text-green-light" />
              <span className="text-sm font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
