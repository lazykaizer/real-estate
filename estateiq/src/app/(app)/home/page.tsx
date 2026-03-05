"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  TrendingUp,
  BarChart3,
  Activity,
  Sparkles,
  MapPin,
  ArrowUpRight,
  Loader2,
  Bookmark,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import FeaturedListings from "@/components/home/featured-listings";
import ValuationWidget from "@/components/home/valuation-widget";
import HowItWorks from "@/components/home/how-it-works";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ activeListings: 0, savedProperties: 0, marketTrend: "+5.2%" });

  useEffect(() => {
    const supabase = createClient();
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }

      const [listingsCount, savedCount] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("saved_properties").select("id", { count: "exact", head: true })
      ]);

      setStats({
        activeListings: listingsCount.count || 0,
        savedProperties: savedCount.count || 0,
        marketTrend: "+4.8%"
      });
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pt-20">
      {/* ── Dashboard Header ── */}
      <div className="relative overflow-hidden bg-white pb-24 md:pb-32">
        {/* Full Visibility House Background with wide blend */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-white" />
          <div
            className="absolute inset-0 opacity-[0.9] bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop)',
              backgroundAttachment: 'scroll'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white" />
        </div>

        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-24 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 px-8 py-8 rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white/50 shadow-2xl"
            >
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-sm">
                Hi, {user?.user_metadata?.firstName || user?.email?.split('@')[0] || "there"}
                <span className="inline-block animate-bounce-subtle ml-2">👋</span>
              </h1>
              <p className="text-slate-600 mt-4 font-bold text-lg max-w-lg leading-relaxed">
                Your personal Command Center for real estate. Monitoring your portfolio and latest market trends.
              </p>
            </motion.div>

            <div className="hidden lg:block h-14" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Listings", value: stats.activeListings, icon: Building2, color: "blue", trend: "Market Wide" },
              { label: "New Today", value: "0", icon: Activity, color: "sky", trend: "Last 24h" },
              { label: "Saved Items", value: stats.savedProperties, icon: Bookmark, color: "indigo", trend: "Your Favorites" },
              { label: "Market Trend", value: stats.marketTrend, icon: BarChart3, color: "blue", trend: "Pune Region" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="group relative bg-transparent rounded-[2.5rem] p-7 border border-white/20 hover:bg-white/5 transition-all duration-500 overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <div className="relative z-10">
                  <div className={`p-3 rounded-2xl bg-white/90 shadow-sm text-${stat.color}-600 inline-flex mb-5 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-slate-100/50">
                      <span className="text-[10px] font-bold text-slate-400">{stat.trend}</span>
                      <ArrowUpRight className="h-3 w-3 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured & Insights ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        <div className="w-full">
          <FeaturedListings />
        </div>
        <ValuationWidget />
        <HowItWorks />
      </div>
    </div>
  );
}
