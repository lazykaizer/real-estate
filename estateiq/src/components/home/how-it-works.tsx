"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Home, HandshakeIcon, Key, TrendingUp, ClipboardCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FLOWS = {
  buyer: {
    title: "Buying a Home",
    cta: "Start Your Search",
    href: "/buy",
    steps: [
      {
        icon: Search,
        title: "Search & Explore",
        description: "Browse 250,000+ verified listings with smart filters, virtual tours, and neighbourhood data.",
      },
      {
        icon: HandshakeIcon,
        title: "Connect with an Agent",
        description: "Match with a top-rated local agent who knows the market inside-out.",
      },
      {
        icon: Home,
        title: "Close Your Deal",
        description: "Get pre-approved, make offers, and complete your purchase — all in one platform.",
      },
    ],
  },
  seller: {
    title: "Selling Your Home",
    cta: "Get a Free Valuation",
    href: "/sell",
    steps: [
      {
        icon: TrendingUp,
        title: "Get Your Valuation",
        description: "Enter your address and get an instant market-based estimate in under 5 seconds.",
      },
      {
        icon: ClipboardCheck,
        title: "List Your Property",
        description: "Upload photos, add details, and publish your listing to 250,000+ active buyers.",
      },
      {
        icon: HandshakeIcon,
        title: "Close with Confidence",
        description: "Receive offers, negotiate, and complete the sale with e-signature support.",
      },
    ],
  },
  renter: {
    title: "Renting a Home",
    cta: "Browse Rentals",
    href: "/rent",
    steps: [
      {
        icon: Search,
        title: "Find Your Space",
        description: "Search verified rental listings with transparent pricing and no hidden fees.",
      },
      {
        icon: Key,
        title: "Apply Instantly",
        description: "Submit your application online and get approved faster than ever.",
      },
      {
        icon: Home,
        title: "Move In",
        description: "Sign your lease digitally and get move-in assistance and neighbourhood guides.",
      },
    ],
  },
};

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("buyer");

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-slate-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Seamless Real Estate.
          </h2>
          <p className="text-slate-500 mt-4 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re buying, selling, or renting, we handle the complexity so you don&apos;t have to.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto max-w-5xl">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-md rounded-2xl h-16 p-1 border border-white/50 shadow-sm mb-12">
            <TabsTrigger
              value="buyer"
              className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-lg transition-all"
            >
              Buying
            </TabsTrigger>
            <TabsTrigger
              value="seller"
              className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-lg transition-all"
            >
              Selling
            </TabsTrigger>
            <TabsTrigger
              value="renter"
              className="rounded-xl data-[state=active]:bg-blue-600 data-[state=active]:text-white font-bold text-lg transition-all"
            >
              Renting
            </TabsTrigger>
          </TabsList>

          {Object.entries(FLOWS).map(([key, flow]) => (
            <TabsContent key={key} value={key} className="mt-0 focus-visible:outline-none">
              <div className="grid md:grid-cols-3 gap-8">
                {flow.steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="group relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="absolute -top-4 left-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white text-lg font-black shadow-lg shadow-slate-900/20">
                      {i + 1}
                    </div>
                    <div className="mt-4 mb-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                        <step.icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
