"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Award,
  Mail,
  Shield,
  Briefcase,
  Languages,
  ArrowLeft,
  Loader2,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import type { Agent } from "@/types";

function mapDbAgent(row: Record<string, any>): Agent {
  return {
    id: row.id,
    name: row.name || "",
    photo: row.photo || "",
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

export default function AgentProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySent, setInquirySent] = useState(false);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("agents")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) setAgent(mapDbAgent(data));
      } catch (err) {
        console.error("Error fetching agent:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchAgent();
  }, [id]);

  const handleSendInquiry = () => {
    if (!inquiryName || !inquiryMessage || !agent) return;
    // Open mailto with pre-filled content
    const subject = encodeURIComponent(`Property Inquiry from ${inquiryName} via EstateIQ`);
    const body = encodeURIComponent(`Hi ${agent.name},\n\n${inquiryMessage}\n\nRegards,\n${inquiryName}`);
    window.open(`mailto:${agent.email}?subject=${subject}&body=${body}`, "_blank");
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-3xl font-black text-slate-900 mb-4">
            Agent Not Found
          </h1>
          <Button asChild className="bg-slate-900 text-white rounded-xl font-bold">
            <Link href="/agents">Browse Agents</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/agents"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> All Agents
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="relative h-32 w-32 rounded-3xl overflow-hidden ring-4 ring-white/10 shrink-0 shadow-2xl">
              <Image
                src={agent.photo}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{agent.name}</h1>
                {agent.subscriptionTier === "premium" && (
                  <Badge className="bg-blue-600 text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                    <Award className="h-3 w-3 mr-1" /> PRO Agent
                  </Badge>
                )}
              </div>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-wider">{agent.brokerage}</p>
              <div className="flex items-center gap-6 mt-4 justify-center md:justify-start text-sm">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-black">{agent.rating}</span>
                  <span className="text-slate-500">({agent.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Briefcase className="h-4 w-4" />
                  <span className="font-bold">{agent.dealsClosed} deals</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className="font-bold">{agent.responseTime}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl h-12 px-8 shadow-lg"
              >
                <a href={`mailto:${agent.email}`}>
                  <Mail className="h-4 w-4 mr-2" />
                  {agent.email}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card className="border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-black text-slate-900">About {agent.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {agent.bio}
                </p>
              </CardContent>
            </Card>

            {/* Send Inquiry Form — WORKING */}
            <Card className="border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-8">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Send className="h-5 w-5" />
                  </div>
                  Send an Inquiry
                </CardTitle>
                <p className="text-slate-400 font-medium mt-2">
                  Compose your message — it will open in your email client.
                </p>
              </CardHeader>
              <CardContent className="p-8 space-y-5">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 block">Your Name</label>
                  <Input
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="h-12 rounded-xl border-slate-100 bg-slate-50/50 font-medium"
                  />
                </div>
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-2 block">Your Message</label>
                  <Textarea
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="I'm interested in properties in Mumbai. Can we discuss options?"
                    rows={4}
                    className="rounded-xl border-slate-100 bg-slate-50/50 font-medium"
                  />
                </div>
                <Button
                  onClick={handleSendInquiry}
                  disabled={!inquiryName || !inquiryMessage || inquirySent}
                  className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-base shadow-lg transition-all"
                >
                  {inquirySent ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" /> Opening Email Client...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="h-5 w-5" /> Send via Email
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-slate-100 rounded-[2rem] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-black text-slate-900">Agent Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">RERA License</span>
                    <p className="font-bold text-slate-900 text-xs">{agent.licenseNumber}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Experience</span>
                    <p className="font-bold text-slate-900">{agent.yearsExperience} years</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center mt-0.5">
                    <MapPin className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Service Areas</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {agent.serviceAreas.map((area) => (
                        <Badge
                          key={area}
                          variant="outline"
                          className="text-xs font-bold rounded-lg"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center mt-0.5">
                    <Award className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Specialisations</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {agent.specialisations.map((spec) => (
                        <Badge
                          key={spec}
                          className="bg-blue-50 text-blue-700 text-xs font-bold capitalize rounded-lg border-0"
                        >
                          {spec.replace("-", " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-teal-50 flex items-center justify-center mt-0.5">
                    <Languages className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Languages</span>
                    <p className="font-bold text-slate-900 mt-0.5">
                      {agent.languages.join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                  {[
                    { label: "Deals Closed", value: agent.dealsClosed },
                    { label: "Active Listings", value: agent.activeListings },
                    { label: "Reviews", value: agent.reviewCount },
                    { label: "Rating", value: agent.rating.toFixed(1) },
                  ].map((stat) => (
                    <div key={stat.label} className="p-6 text-center">
                      <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
