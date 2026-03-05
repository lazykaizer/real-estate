import Link from "next/link";
import {
  Building2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/story" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  explore: [
    { label: "Buy a Home", href: "/buy" },
    { label: "Rent a Home", href: "/rent" },
    { label: "Sell a Home", href: "/sell" },
    { label: "Mortgage Calculator", href: "/mortgage" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white selection:bg-blue-600/30">


      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2 mb-8 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg group-hover:scale-110 transition-transform">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Estate<span className="text-blue-500">IQ</span>
              </span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed mb-8">
              Innovating the way India finds its home. We provide a fully verified, transparent, and seamless property search experience across the nation's premier cities.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-11 w-11 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-white/5 hover:border-blue-600"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-8">Platform</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.explore.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-white font-bold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-8">Company</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-slate-400 hover:text-white font-bold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-8">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                  <p className="font-bold text-slate-200">hello@estateiq.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                  <Phone className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                  <p className="font-bold text-slate-200">+91 22 4567 8900</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="my-16 bg-white/5" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-medium text-slate-500">
            &copy; {new Date().getFullYear()} EstateIQ Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-8">
            {FOOTER_LINKS.legal.map((l) => (
              <Link key={l.label} href={l.href} className="text-xs font-black text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
