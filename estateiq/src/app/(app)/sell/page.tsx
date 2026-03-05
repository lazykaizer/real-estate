"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  TrendingUp,
  Shield,
  Camera,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/data/mock";
import { useRequireAuth } from "@/hooks/use-require-auth";

const STEPS = [
  {
    icon: Home,
    title: "List Your Property",
    description:
      "Fill in your property details and upload high-quality photos to create a compelling listing.",
  },
  {
    icon: TrendingUp,
    title: "Market Valuation",
    description:
      "Our proprietary tools analyze nearby transactions and market trends to give you the right price.",
  },
  {
    icon: Users,
    title: "Connect with Buyers",
    description:
      "Receive enquiries from verified buyers and schedule property visits at your convenience.",
  },
  {
    icon: Shield,
    title: "Close the Deal",
    description:
      "Our legal team assists with documentation, registration, and a smooth title transfer.",
  },
];

const FEATURES = [
  "Free market-based property valuation",
  "Professional photography service",
  "Listing on 50+ property portals",
  "Dedicated relationship manager",
  "Legal assistance & title verification",
  "RERA compliance support",
  "Virtual tour creation",
  "Buyer verification & background checks",
];

export default function SellPage() {
  const [address, setAddress] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const { requireAuthNavigate } = useRequireAuth();

  function handleValuation() {
    if (!address.trim()) return;
    // Simulate a valuation using a deterministic random
    const hash = address.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const base = 5000000 + (hash % 20) * 500000;
    setEstimate(base);
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 opacity-90" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Sell with EstateIQ
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                Sell Your property <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Faster & Smarter.</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl font-medium max-w-lg mb-10 leading-relaxed">
                Get a free market valuation, connect with verified buyers,
                and close faster with our premium seller ecosystem.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 px-8 rounded-2xl shadow-xl shadow-blue-600/20 transition-all hover:scale-105"
                  onClick={() => requireAuthNavigate('/sell/new')}
                >
                  <Camera className="h-5 w-5 mr-2" /> Post Property Free
                </Button>
              </div>
            </motion.div>

            {/* Valuation Widget Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-2xl rounded-[3rem]" />
              <Card className="relative bg-white/5 backdrop-blur-2xl border-white/10 shadow-3xl rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-black text-white mb-6">
                    What's your home worth?
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Property Address</Label>
                      <Input
                        placeholder="Enter locality or project name..."
                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-2xl focus:ring-blue-500 transition-all"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleValuation()}
                      />
                    </div>
                    <Button
                      className="w-full bg-white hover:bg-slate-100 text-slate-900 h-14 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95"
                      onClick={handleValuation}
                    >
                      Instant Estimate <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>

                    {estimate && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="mt-8 p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden"
                      >
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                          Estimated Market Value
                        </p>
                        <p className="text-4xl font-black text-white">
                          {formatPrice(estimate)}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-2 font-medium italic">
                          Based on 20+ recent transactions in your area
                        </p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Selling made simple.
            </h2>
            <p className="text-slate-600 font-medium text-lg">
              We've redesigned the selling process to be completely transparent, digitally-driven, and incredibly fast.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/20">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-2">
                  Step {idx + 1}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-8">
                Why thousands of owners <br /> choose EstateIQ.
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {FEATURES.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                      <CheckCircle className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "Smart Price Matching", desc: "Get matched with the highest quality buyers in our network.", icon: PieChart, color: "blue" },
                { title: "Verified Transactions", desc: "Every deal is legally vetted, secure, and fully transparent.", icon: Shield, color: "emerald" }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-start gap-6"
                >
                  <div className={`h-14 w-14 rounded-2xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600 shrink-0`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Ready to list <br /> your property?
              </h2>
              <p className="text-blue-100 font-medium text-lg mb-10 opacity-80">
                Join our premium community of sellers. Experience the difference of a listing tool designed for results.
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-slate-100 text-slate-900 font-black h-16 px-10 rounded-[1.25rem] text-lg shadow-2xl transition-all hover:scale-105 active:scale-95"
                onClick={() => requireAuthNavigate('/sell/new')}
              >
                Post Property Free <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
