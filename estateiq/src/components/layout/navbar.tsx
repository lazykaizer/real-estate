"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  Heart,
  User,
  ChevronDown,
  Building2,
  Home,
  Key,
  Users,
  Calculator,
  MapPin,
  BookOpen,
  LogOut,
  Settings,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { label: "Buy", href: "/buy", icon: Home },
  { label: "Rent", href: "/rent", icon: Key },
  { label: "Sell", href: "/sell", icon: Building2 },
  { label: "Agents", href: "/agents", icon: Users },
  { label: "Mortgage", href: "/mortgage", icon: Calculator },
  { label: "Explore", href: "/explore", icon: MapPin },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ email?: string; firstName?: string; lastName?: string } | null>(null);
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    // Check if on landing page
    setIsLandingPage(window.location.pathname === "/");

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen to auth state
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          email: session.user.email,
          firstName: session.user.user_metadata?.firstName,
          lastName: session.user.user_metadata?.lastName,
        });
      } else {
        setUser(null);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          email: session.user.email,
          firstName: session.user.user_metadata?.firstName,
          lastName: session.user.user_metadata?.lastName,
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfileOpen(false);
    router.push("/");
    router.refresh();
  };

  const userInitials = user
    ? `${(user.firstName?.[0] || user.email?.[0] || "U").toUpperCase()}${(user.lastName?.[0] || "").toUpperCase()}`
    : "";

  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
    : user?.email?.split("@")[0] || "User";

  const isDarkText = scrolled || !isLandingPage;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isDarkText
          ? "bg-white/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span
                className={`text-xl font-bold tracking-tight ${isDarkText ? "text-navy" : "text-white"
                  }`}
              >
                Estate<span className="text-blue">IQ</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.label)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isDarkText
                      ? "text-gray-dark hover:text-blue hover:bg-blue-light"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/account/saved"
                className={`hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${isDarkText
                  ? "text-gray-mid hover:text-blue"
                  : "text-white/80 hover:text-white"
                  }`}
              >
                <Heart className="h-4 w-4" />
              </Link>
              <Button
                asChild
                size="sm"
                className="hidden sm:inline-flex bg-green hover:bg-forest text-white font-semibold"
              >
                <Link href="/sell/new">Post Property</Link>
              </Button>

              {/* Auth: Profile Dropdown or Login */}
              {user ? (
                <div
                  className="relative hidden sm:block"
                  onMouseEnter={() => setProfileOpen(true)}
                  onMouseLeave={() => setProfileOpen(false)}
                >
                  <button
                    className={`flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-colors ${isDarkText
                      ? "hover:bg-gray-100"
                      : "hover:bg-white/10"
                      }`}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-white text-xs font-bold">
                      {userInitials}
                    </div>
                    <span
                      className={`text-sm font-medium max-w-[100px] truncate ${isDarkText ? "text-navy" : "text-white"
                        }`}
                    >
                      {displayName}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${profileOpen ? "rotate-180" : ""} ${isDarkText ? "text-gray-mid" : "text-white/70"
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full pt-2 z-50"
                      >
                        <div className="w-56 rounded-xl border bg-white p-2 shadow-card-hover">
                          <div className="px-3 py-2 border-b mb-1">
                            <p className="text-sm font-semibold text-navy truncate">{displayName}</p>
                            <p className="text-xs text-gray-mid truncate">{user.email}</p>
                          </div>
                          <Link
                            href="/account"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-dark hover:bg-blue-light hover:text-blue transition-colors"
                          >
                            <User className="h-4 w-4" />
                            My Profile
                          </Link>
                          <Link
                            href="/account/saved"
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-dark hover:bg-blue-light hover:text-blue transition-colors"
                          >
                            <Bookmark className="h-4 w-4" />
                            Saved Properties
                          </Link>
                          <div className="border-t mt-1 pt-1">
                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              Log Out
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${isDarkText
                    ? "text-gray-mid hover:text-blue"
                    : "text-white/80 hover:text-white"
                    }`}
                >
                  <User className="h-4 w-4" />
                </Link>
              )}

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden rounded-lg p-2 transition-colors ${isDarkText
                  ? "text-gray-dark hover:bg-gray-light"
                  : "text-white hover:bg-white/10"
                  }`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white pt-20 lg:hidden overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-dark hover:bg-blue-light hover:text-blue transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-blue" />
                    {item.label}
                  </Link>
                </div>
              ))}

              <div className="pt-4 border-t space-y-2">
                <Button
                  asChild
                  className="w-full bg-green hover:bg-forest text-white font-semibold"
                >
                  <Link
                    href="/sell/new"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Post Property Free
                  </Link>
                </Button>

                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-light rounded-xl">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white text-sm font-bold shrink-0">
                        {userInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-navy truncate">{displayName}</p>
                        <p className="text-xs text-gray-mid truncate">{user.email}</p>
                      </div>
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-dark hover:bg-blue-light hover:text-blue transition-colors"
                    >
                      <User className="h-5 w-5 text-blue" />
                      My Profile
                    </Link>
                    <Link
                      href="/account/saved"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-dark hover:bg-blue-light hover:text-blue transition-colors"
                    >
                      <Bookmark className="h-5 w-5 text-blue" />
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-blue text-blue hover:bg-blue-light"
                  >
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Sign In / Register
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
