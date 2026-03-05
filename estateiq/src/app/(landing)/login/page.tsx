import { Metadata } from "next";
import Link from "next/link";

import { Building2, ShieldCheck, ArrowLeft } from "lucide-react";

import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Login or create an account with EstateIQ to save properties and connect with agents.",
};

export default async function AuthenticationPage({
    searchParams,
}: {
    searchParams: Promise<{ tab?: string; redirect?: string }>;
}) {
    const params = await searchParams;
    const defaultTab = params.tab === "signup" ? "signup" : "login";
    const redirectUrl = params.redirect || "/home";

    return (
        <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {/* Back to Home Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-30 flex items-center gap-2 text-sm font-medium text-white lg:text-white/90 hover:text-white bg-black/20 lg:bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 transition-colors hover:bg-black/30 lg:hover:bg-white/20"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>

            {/* Visual Content - Left Side */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r overflow-hidden">
                <div className="absolute inset-0 bg-primary/90 mix-blend-multiply z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop')" }}
                />

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Building2 className="mr-2 h-8 w-8 text-white" />
                    <span className="text-2xl font-bold font-playfair tracking-tight">EstateIQ</span>
                </div>

                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-xl font-medium leading-relaxed font-playfair italic">
                            &quot;Finding my dream home was seamless. The intelligent search and verified agents gave me peace of mind unlike any other platform.&quot;
                        </p>
                        <footer className="text-sm border-l-2 border-white/50 pl-4 py-1">
                            <strong className="block text-base">Arjun Sharma</strong>
                            <span className="text-white/80">Homeowner in Mumbai</span>
                        </footer>
                    </blockquote>

                    <div className="mt-8 flex items-center gap-4 text-sm font-medium">
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <ShieldCheck className="h-4 w-4" /> 5,000+ Verified Agents
                        </div>
                    </div>
                </div>
            </div>

            {/* Auth Form - Right Side */}
            <div className="lg:p-8 flex items-center justify-center h-full">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">

                    <div className="flex flex-col space-y-2 text-center lg:hidden mb-4">
                        <div className="flex justify-center mb-2">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Building2 className="h-8 w-8 text-primary" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold font-playfair tracking-tight">EstateIQ</h1>
                    </div>

                    <AuthForm defaultTab={defaultTab} redirectAfterAuth={redirectUrl} />

                </div>
            </div>
        </div>
    );
}
