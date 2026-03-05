"use client";

import { useEffect, useState } from "react";
import { createPropertyListing } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    Building2,
    Ruler,
    Bed,
    Bath,
    ArrowLeft,
    CheckCircle,
    ShieldCheck,
    Zap,
    BarChart,
    Lock,
    Loader2,
    MapPin
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewListingPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [title, setTitle] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [pType, setPType] = useState("apartment");
    const [beds, setBeds] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) router.push("/login");
            else setUser(user);
        };
        checkUser();
    }, [router]);

    const handleMagicGenerate = async () => {
        if (!title || !city) {
            alert("Please enter at least a Title and City first!");
            return;
        }

        setIsGenerating(true);
        try {
            const res = await fetch("/api/ai-describe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    city,
                    area_sqft: area,
                    property_type: pType,
                    bedrooms: beds
                }),
            });

            if (!res.ok) throw new Error("AI failed");
            const data = await res.json();
            setDescription(data.description);
        } catch (error) {
            console.error(error);
            alert("AI Magic failed. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!user) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
            {/* Premium Background Blurs */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-100/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-50/40 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative pt-24 pb-20 px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    <Link href="/home" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 mb-10 transition-all hover:gap-2">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                    </Link>

                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Main Form */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="mb-12">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight"
                                >
                                    Reach Millions of <br />
                                    <span className="text-blue-600">Verified Buyers.</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-slate-500 mt-6 text-xl font-medium max-w-xl leading-relaxed"
                                >
                                    List your property on EstateIQ and experience the most efficient, secure way to sell or rent your home.
                                </motion.p>
                            </div>

                            <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] bg-white/90 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/40">
                                <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-10">
                                    <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                                            <Building2 className="h-6 w-6 text-white" />
                                        </div>
                                        Property Details
                                    </CardTitle>
                                    <CardDescription className="text-slate-400 text-lg mt-2 font-medium">Essential information to get your listing live.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-10">
                                    <form action={createPropertyListing} className="space-y-8">
                                        {/* Title Section */}
                                        <div className="space-y-4 font-sans">
                                            <Label htmlFor="title" className="text-slate-900 font-bold text-base flex items-center gap-2">
                                                Listing Title
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="e.g. Luxurious 3BHK Penthouse in Bandra"
                                                required
                                                className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-blue-600/20 transition-all text-lg font-medium"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <Label htmlFor="listing_type" className="text-slate-900 font-bold text-base">Offer Type</Label>
                                                <Select name="listing_type" defaultValue="sale" required>
                                                    <SelectTrigger id="listing_type" className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-base">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl">
                                                        <SelectItem value="sale">For Sale</SelectItem>
                                                        <SelectItem value="rent">For Rent</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-4">
                                                <Label htmlFor="property_type" className="text-slate-900 font-bold text-base">Property Type</Label>
                                                <Select name="property_type" value={pType} onValueChange={setPType} required>
                                                    <SelectTrigger id="property_type" className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-base">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-2xl">
                                                        <SelectItem value="apartment">Apartment</SelectItem>
                                                        <SelectItem value="house">House</SelectItem>
                                                        <SelectItem value="villa">Villa</SelectItem>
                                                        <SelectItem value="commercial">Commercial</SelectItem>
                                                        <SelectItem value="land">Plot</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <Label htmlFor="price" className="text-slate-900 font-bold text-base font-sans">Price (₹)</Label>
                                                <Input type="number" id="price" name="price" placeholder="e.g. 15000000" required className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-lg font-medium" />
                                            </div>
                                            <div className="space-y-4">
                                                <Label htmlFor="area_sqft" className="text-slate-900 font-bold text-base font-sans flex items-center gap-2">
                                                    Area (sq.ft)
                                                </Label>
                                                <Input
                                                    type="number"
                                                    id="area_sqft"
                                                    name="area_sqft"
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    placeholder="e.g. 1200"
                                                    required
                                                    className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-lg font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <Label htmlFor="bedrooms" className="text-slate-900 font-bold text-base font-sans">Bedrooms</Label>
                                                <Input
                                                    type="number"
                                                    id="bedrooms"
                                                    name="bedrooms"
                                                    value={beds}
                                                    onChange={(e) => setBeds(e.target.value)}
                                                    placeholder="e.g. 3"
                                                    required
                                                    className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-lg font-medium"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <Label htmlFor="bathrooms" className="text-slate-900 font-bold text-base font-sans font-sans">Bathrooms</Label>
                                                <Input type="number" id="bathrooms" name="bathrooms" placeholder="e.g. 2" required className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-lg font-medium" />
                                            </div>
                                        </div>

                                        <div className="space-y-4 font-sans">
                                            <Label htmlFor="location_city" className="text-slate-900 font-bold text-base">City</Label>
                                            <Input
                                                id="location_city"
                                                name="location_city"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="e.g. Mumbai"
                                                required
                                                className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-lg font-medium"
                                            />
                                        </div>

                                        <div className="space-y-4 font-sans">
                                            <Label htmlFor="location_address" className="text-slate-900 font-bold text-base">Full Landmark / Address</Label>
                                            <Input id="location_address" name="location_address" placeholder="e.g. Near Juhu Beach Mall" required className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-lg font-medium" />
                                        </div>

                                        {/* Property Images Upload */}
                                        <div className="space-y-4 font-sans">
                                            <Label htmlFor="images" className="text-slate-900 font-bold text-base flex items-center justify-between">
                                                <span>Property Photos</span>
                                                <span className="text-sm font-medium text-slate-400">Up to 5 images</span>
                                            </Label>
                                            <Input
                                                id="images"
                                                name="images"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="h-16 rounded-2xl border-slate-100 bg-slate-50/50 text-slate-600 focus:bg-white focus:ring-blue-600/20 transition-all font-medium flex items-center justify-center file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer pt-3"
                                            />
                                        </div>

                                        {/* Description with AI Magic */}
                                        <div className="space-y-4 font-sans">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="description" className="text-slate-900 font-bold text-base">Description</Label>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleMagicGenerate}
                                                    disabled={isGenerating}
                                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold gap-2 rounded-full px-5 h-10 border border-blue-100 transition-all font-sans"
                                                >
                                                    {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4 fill-current" />}
                                                    Smart Description
                                                </Button>
                                            </div>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Tell potential buyers what makes your property special..."
                                                rows={6}
                                                required
                                                className="rounded-[2.5rem] border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg p-8 font-medium font-sans"
                                            />
                                        </div>

                                        <Button type="submit" size="lg" className="w-full bg-blue-600 text-white hover:bg-blue-700 h-20 text-xl font-black rounded-3xl shadow-2xl shadow-blue-500/30 mt-8 transition-all hover:scale-[1.01] active:scale-[0.98]">
                                            Launch Listing ✨
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Polish */}
                        <div className="lg:col-span-4 space-y-10">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[3rem] p-10 shadow-2xl shadow-blue-500/30 relative overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-50" />
                                <h4 className="text-3xl font-black mb-10 relative z-10 leading-tight">Why list on <br />EstateIQ?</h4>
                                <ul className="space-y-8 relative z-10">
                                    {[
                                        { icon: ShieldCheck, text: "Advanced Ownership Verification" },
                                        { icon: BarChart, text: "High-Intent Buyer Matching" },
                                        { icon: Zap, text: "Instant Global Valuation Access" },
                                        { icon: Lock, text: "Encrypted Document Security" },
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-5 items-center">
                                            <div className="h-10 w-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-md">
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <span className="font-bold text-white text-lg leading-tight">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/80 backdrop-blur-xl rounded-[3rem] p-10 border border-white shadow-2xl"
                            >
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="h-16 w-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center shadow-inner">
                                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xl tracking-tight">Verified Status</h4>
                                        <p className="text-xs text-emerald-600 font-black uppercase tracking-widest mt-1">Premium Trust</p>
                                    </div>
                                </div>
                                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
                                    Our dedicated verification team will review your property within 24 hours to ensure maximum trust for buyers.
                                </p>
                                <div className="flex items-center gap-3 text-slate-400 font-bold border-t pt-8">
                                    <ShieldCheck className="h-5 w-5" />
                                    Bank-Grade Security
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
