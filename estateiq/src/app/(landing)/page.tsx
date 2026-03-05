"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  Shield,
  TrendingUp,
  Users,
  MapPin,
  Star,
  ChevronRight,
  Home,
  Key,
  Calculator,
  ArrowRight,
  Quote,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Map,
  MoveRight,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ── Data ── */
const STATS = [
  { value: "250K+", label: "Verified Listings", icon: Home },
  { value: "5,000+", label: "Trusted Agents", icon: Users },
  { value: "₹50Cr+", label: "Deals Closed", icon: TrendingUp },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const FEATURES = [
  {
    icon: Search,
    title: "Smart Property Match",
    description: "Our proprietary algorithm finds homes that match your exact lifestyle and budget.",
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    icon: Shield,
    title: "100% Verified",
    description: "Every property undergoes a rigorous 50-point inspection before listing.",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "Market Valuation",
    description: "Get accurate, real-time property valuations instantly using live market data.",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  },
  {
    icon: MapPin,
    title: "Deep Insights",
    description: "Explore micro-markets, school zones, commute times, and local amenities.",
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  },
  {
    icon: Calculator,
    title: "Smart Finance",
    description: "Calculate EMIs, compare rates, and get pre-approved in under 5 minutes.",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
  {
    icon: Key,
    title: "Digital Closing",
    description: "Sign documents electronically and secure your new home from your phone.",
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Join & Personalize",
    description: "Create your free profile. Tell us what you're looking for, and we customize your feed.",
  },
  {
    step: "02",
    title: "Discover & Tour",
    description: "Browse curated matches, explore 3D tours, and schedule viewings with a tap.",
  },
  {
    step: "03",
    title: "Offer & Move In",
    description: "Submit offers quickly, handle paperwork digitally, and collect your keys.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Mehta",
    role: "First-time Buyer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    comment: "EstateIQ transformed what I thought would be a stressful process into a joyride. The smart suggestions helped me find a neighborhood I hadn't considered.",
    rating: 5,
  },
  {
    name: "Arjun & Riya Sharma",
    role: "Homeowners",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "We sold our home 12% over asking price. The market valuation was ridiculously accurate and the agent we matched with was a rockstar.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Real Estate Investor",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    comment: "The macro data and heatmaps provided by EstateIQ give me an unfair advantage. It's the ultimate tool for serious property investors.",
    rating: 5,
  },
];

const POPULAR_CITIES = [
  { name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80", listings: "45,000+", tag: "High ROI" },
  { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&q=80", listings: "38,000+", tag: "Tech Hub" },
  { name: "Delhi NCR", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80", listings: "52,000+", tag: "Premium" },
  { name: "Hyderabad", image: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=600&q=80", listings: "28,000+", tag: "Fast Growing" },
  { name: "Pune", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", listings: "22,000+", tag: "Student Hub" },
  { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80", listings: "18,000+", tag: "Coastal Living" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

/* ── Component ── */
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("buy");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-500/30 selection:text-blue-900 font-sans">
      {/* ━━━ NAVBAR ━━━ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm py-3" : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md transform group-hover:scale-105 transition-all">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Estate<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">IQ</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#cities" className="hover:text-blue-600 transition-colors">Cities</a>
              <a href="#testimonials" className="hover:text-blue-600 transition-colors">Reviews</a>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
                Sign In
              </Link>
              <Button asChild className="bg-slate-900 hover:bg-black text-white rounded-full px-6 shadow-xl shadow-slate-900/20 font-bold transition-transform hover:scale-105">
                <Link href="/login?tab=signup">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
        {/* Abstract Background Meshes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-400/20 via-indigo-300/20 to-transparent rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-300/20 via-teal-200/20 to-transparent rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" style={{ animationDuration: '10s', animationDelay: '1s' }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6"
            >
              Find your next <br className="hidden md:block" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Perfect Home.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-600/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
            >
              Search seamlessly across 250,000+ verified listings. Skip the noise, and find homes that actually fit your lifestyle with our smart search tools.
            </motion.p>
          </div>

          {/* ── INTERACTIVE SEARCH WIDGET ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-4xl mx-auto relative z-20"
          >


            {/* Trusted By Users Snippet under search */}
            <div className="flex justify-center items-center gap-4 mt-8 sm:mt-10">
              <div className="flex -space-x-3">
                {[44, 32, 68, 55, 91].map((id, i) => (
                  <div key={i} className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-slate-50 overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
                    <Image src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${id}.jpg`} alt="User" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold">Over <span className="text-slate-900">100,000+</span> happy clients</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section >

      {/* ━━━ LOGO CLOUD ━━━ */}
      < section className="py-10 border-y border-slate-200 bg-white overflow-hidden flex items-center" >
        <div className="whitespace-nowrap flex gap-16 animate-marquee">
          <span className="text-xl font-black text-slate-300 mx-8">Godrej Properties</span>
          <span className="text-xl font-black text-slate-300 mx-8">DLF Limited</span>
          <span className="text-xl font-black text-slate-300 mx-8">LODHA Group</span>
          <span className="text-xl font-black text-slate-300 mx-8">Prestige Group</span>
          <span className="text-xl font-black text-slate-300 mx-8">Sobha</span>
          <span className="text-xl font-black text-slate-300 mx-8">Brigade</span>

          <span className="text-xl font-black text-slate-300 mx-8">Godrej Properties</span>
          <span className="text-xl font-black text-slate-300 mx-8">DLF Limited</span>
          <span className="text-xl font-black text-slate-300 mx-8">LODHA Group</span>
          <span className="text-xl font-black text-slate-300 mx-8">Prestige Group</span>
          <span className="text-xl font-black text-slate-300 mx-8">Sobha</span>
          <span className="text-xl font-black text-slate-300 mx-8">Brigade</span>
        </div>
        <style jsx>{`
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
      </section >

      {/* ━━━ FEATURES ━━━ */}
      < section id="features" className="py-24 lg:py-32 bg-slate-900 relative" >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              A smarter way to buy real estate.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              We've infused powerful algorithms and deep data sets, giving you the edge usually reserved for industry professionals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="group relative bg-slate-800/50 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:bg-slate-800 hover:border-white/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`inline-flex p-4 rounded-2xl border ${feature.color} mb-6 shadow-inner`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{feature.description}</p>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* ━━━ STATS BAR WITH FLOATING CARDS ━━━ */}
      < section className="py-0 relative -mt-16 z-20" >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="text-center px-4">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h4 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{stat.value}</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section >

      {/* ━━━ HOW IT WORKS ━━━ */}
      < section id="how-it-works" className="py-24 lg:py-32 bg-slate-50" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Move effortlessly.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              We replaced the traditional paperwork and running around with a completely digital, pain-free workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative max-w-5xl mx-auto">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-200 via-indigo-200 to-transparent border-t-2 border-dashed border-blue-300 z-0" />

            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="flex items-center justify-center h-24 w-24 rounded-[2rem] bg-white border-4 border-slate-50 shadow-xl group-hover:-translate-y-2 group-hover:shadow-2xl transition-all duration-300 mb-8 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-3xl font-black text-slate-900 group-hover:text-white relative z-10 transition-colors">{step.step}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* ━━━ POPULAR CITIES (Bento Grid) ━━━ */}
      < section id="cities" className="py-24 lg:py-32 bg-white" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Premier Destinations
              </h2>
              <p className="text-slate-600 text-lg md:text-xl font-medium">
                Discover the hottest and most lucrative properties across India's booming metropolitan nodes.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
            {POPULAR_CITIES.map((city, i) => (
              <motion.div
                key={city.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`relative group rounded-[2.5rem] overflow-hidden ${i === 0 ? 'lg:col-span-2' : ''} ${i === 3 ? 'lg:col-span-2' : ''}`}
              >
                <Link href="/login?tab=signup" className="absolute inset-0 z-20" aria-label={`View properties in ${city.name}`} />
                <Image
                  src={city.image}
                  alt={city.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

                <div className="absolute top-6 left-6">
                  <span className="bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider py-1.5 px-4 rounded-full">
                    {city.tag}
                  </span>
                </div>

                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-1 group-hover:-translate-y-1 transition-transform">{city.name}</h3>
                    <p className="text-white/80 font-medium group-hover:-translate-y-1 transition-transform">{city.listings} listings available</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </section >

      {/* ━━━ TESTIMONIALS ━━━ */}
      < section id="testimonials" className="py-24 lg:py-32 bg-slate-50" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Hear from our community.
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-medium">
              We measure our success by the satisfaction of the people who use EstateIQ to find their corner of the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative group"
              >
                <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="h-16 w-16 text-blue-600" />
                </div>
                <div className="flex gap-1 mb-8">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed font-medium mb-10 relative z-10">
                  "{t.comment}"
                </p>
                <div className="flex items-center gap-5 mt-auto">
                  <Image src={t.photo} alt={t.name} width={56} height={56} className="rounded-full object-cover border-2 border-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-sm font-semibold text-blue-600">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >

      {/* ━━━ CTA ━━━ */}
      < section className="py-24 relative overflow-hidden bg-slate-900" >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight drop-shadow-lg">
              Unlock Your <br className="hidden md:block" /> Dream Home Now.
            </h2>
            <p className="text-xl text-blue-100 font-medium max-w-2xl mx-auto mb-12 drop-shadow-md">
              Join millions. Supercharge your search with smart tools, instant verifications, and complete transparency.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button asChild className="bg-white text-indigo-900 hover:bg-slate-100 rounded-full px-10 py-7 shadow-2xl font-black text-lg transition-transform hover:scale-105">
                <Link href="/login?tab=signup">
                  Create Your Free Account
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-blue-200 font-semibold text-sm">
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 bg-blue-500 rounded-full p-1 text-white" /> Free forever
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 bg-blue-500 rounded-full p-1 text-white" /> 1M+ active properties
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-5 w-5 bg-blue-500 rounded-full p-1 text-white" /> Top agents guaranteed
              </span>
            </div>
          </motion.div>
        </div>
      </section >

      {/* ━━━ FOOTER ━━━ */}
      < footer className="bg-slate-950 border-t border-slate-800" >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
            <div className="md:col-span-5 lg:col-span-4">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Estate<span className="text-blue-500">IQ</span>
                </span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 pr-4">
                Redefining the standard of living through technology. EstateIQ curates the finest listings with complete transparency.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-slate-400 hover:bg-blue-600 hover:text-white transition-all focus-within:ring-2 focus-within:ring-blue-500 focus:outline-none"
                    aria-label="Social Link"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Platform</h4>
                <ul className="space-y-4">
                  {["Buy Property", "Rent Property", "List Your Property", "Compare Rates", "Mortgage Options"].map((item) => (
                    <li key={item}>
                      <Link href="/login" className="text-slate-400 font-medium hover:text-white transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Resources</h4>
                <ul className="space-y-4">
                  {["Agent Directory", "Area Guides", "Market Trends", "Help Center", "Site Map"].map((item) => (
                    <li key={item}>
                      <Link href="/login" className="text-slate-400 font-medium hover:text-white transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-xs">Company</h4>
                <ul className="space-y-4">
                  {["About Us", "Careers", "Press", "Contact", "Privacy & Terms"].map((item) => (
                    <li key={item}>
                      <Link href="/login" className="text-slate-400 font-medium hover:text-white transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-slate-500 font-medium text-sm">
              © 2026 EstateIQ. Innovation Delivered. Made with ❤️ in India.
            </p>
            <div className="flex gap-6 text-sm">
              <span className="text-slate-500 font-medium hover:text-slate-300 cursor-pointer">Security Map</span>
              <span className="text-slate-500 font-medium hover:text-slate-300 cursor-pointer">Accessibility</span>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
}
