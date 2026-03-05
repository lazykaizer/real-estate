"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  MapPin,
  Clock,
  Award,
  Mail,
  ArrowRight,
  Loader2,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import type { Agent } from "@/types";

function mapDbAgent(row: Record<string, any>): Agent {
  return {
    id: row.id,
    name: row.name || "",
    photo: row.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    brokerage: row.brokerage || "",
    licenseNumber: row.license_number || "",
    yearsExperience: row.years_experience || 0,
    specialisations: row.specialisations || [],
    languages: row.languages || [],
    rating: Number(row.rating) || 0,
    reviewCount: row.review_count || 0,
    dealsClosed: row.deals_closed || 0,
    bio: row.bio || "",
    phone: "",
    email: row.email || "",
    activeListings: row.active_listings || 0,
    serviceAreas: row.service_areas || [],
    subscriptionTier: row.subscription_tier || "free",
    responseTime: row.response_time || "< 1 hour",
  };
}

export default function AgentsPage() {
  const [query, setQuery] = useState("");
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .order("rating", { ascending: false });

        if (error) throw error;
        if (data) setAgents(data.map(mapDbAgent));
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = useMemo(() => {
    if (!query) return agents;
    const q = query.toLowerCase();
    return agents.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.serviceAreas.some((s) => s.toLowerCase().includes(q)) ||
        a.specialisations.some((s) => s.toLowerCase().includes(q))
    );
  }, [query, agents]);

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-slate-900 pb-16 pt-12 md:pb-20 md:pt-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
              <Users className="h-3.5 w-3.5" /> Verified Professionals
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              Find Your Perfect Agent
            </h1>
            <p className="text-slate-400 text-lg font-medium max-w-xl mb-10">
              Connect with RERA-verified real estate professionals who specialize in your market.
            </p>
            <div className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl">
                <Search className="absolute left-5 h-5 w-5 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, city, or specialisation..."
                  className="pl-12 h-14 text-base bg-transparent border-none focus-visible:ring-0 text-slate-900 font-bold"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 font-medium">
            Showing <span className="text-blue-600 font-bold">{filteredAgents.length}</span> verified agents
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-32 text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="font-bold text-lg">Loading agents...</span>
          </div>
        ) : filteredAgents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden border-slate-100 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-5">
                      <Link
                        href={`/agents/${agent.id}`}
                        className="relative h-24 w-24 rounded-2xl overflow-hidden shrink-0 ring-4 ring-slate-100"
                      >
                        <Image
                          src={agent.photo}
                          alt={agent.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Link
                            href={`/agents/${agent.id}`}
                            className="text-xl font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight"
                          >
                            {agent.name}
                          </Link>
                          {agent.subscriptionTier === "premium" && (
                            <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                              <Award className="h-3 w-3 mr-0.5" /> PRO
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{agent.brokerage}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-black text-slate-900">
                              {agent.rating}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">
                            ({agent.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-lg font-black text-slate-900">
                          {agent.dealsClosed}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deals</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-lg font-black text-slate-900">
                          {agent.yearsExperience}yr
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-lg font-black text-slate-900">
                          {agent.activeListings}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Listings</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span className="truncate">
                        {agent.serviceAreas.join(", ")}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Responds in {agent.responseTime}</span>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button
                        size="sm"
                        asChild
                        className="flex-1 bg-slate-900 hover:bg-black text-white text-xs font-black rounded-xl h-11 shadow-lg transition-all"
                      >
                        <Link href={`/agents/${agent.id}`}>
                          View Profile <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl h-11 transition-all"
                      >
                        <a href={`mailto:${agent.email}`}>
                          <Mail className="h-3.5 w-3.5 mr-1.5" />
                          Send Inquiry
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-2">No agents found</h3>
            <p className="text-slate-500 font-medium mb-6">Try a different search or seed agents first.</p>
            <Button asChild className="bg-slate-900 text-white rounded-xl font-bold">
              <Link href="/seed">Seed Agents</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
