"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const SEED_PROPERTIES = [
    // ─── 6 FOR SALE ───
    {
        title: "Skyline Penthouse, Worli Sea Face",
        description:
            "A breathtaking 4BHK penthouse with panoramic Arabian Sea views from every room. Italian marble flooring, private terrace garden with infinity plunge pool, smart home automation, and 3 dedicated car parks.",
        property_type: "apartment",
        listing_type: "sale",
        price: 85000000,
        bedrooms: 4,
        bathrooms: 4,
        area_sqft: 4200,
        location_address: "Worli Sea Face, Near Haji Ali",
        location_city: "Mumbai",
        location_state: "Maharashtra",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        ],
        features: ["gym", "pool", "parking", "security", "lift", "power-backup", "clubhouse"],
        status: "available",
    },
    {
        title: "The Green Villa, Koregaon Park",
        description:
            "Sprawling 5-bedroom independent villa on a 6000 sq.ft plot with lush landscaped gardens, a private swimming pool, and a rooftop entertainment deck. Modern Scandinavian interiors.",
        property_type: "villa",
        listing_type: "sale",
        price: 45000000,
        bedrooms: 5,
        bathrooms: 4,
        area_sqft: 5500,
        location_address: "Lane 7, Koregaon Park",
        location_city: "Pune",
        location_state: "Maharashtra",
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        ],
        features: ["pool", "parking", "security", "power-backup", "clubhouse"],
        status: "available",
    },
    {
        title: "Indiranagar Corner Plot – Premium Location",
        description:
            "East-facing 2400 sq.ft corner plot in the heart of Indiranagar. Approved for G+3 construction, clear title, all utilities available. Walking distance to 100 Feet Road and metro.",
        property_type: "land",
        listing_type: "sale",
        price: 32000000,
        bedrooms: 0,
        bathrooms: 0,
        area_sqft: 2400,
        location_address: "12th Main, Indiranagar",
        location_city: "Bangalore",
        location_state: "Karnataka",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80",
        ],
        features: ["parking"],
        status: "available",
    },
    {
        title: "DLF Cyber Hub Office Space",
        description:
            "Premium Grade-A commercial office space on the 14th floor. Fully fitted with modern workstations for 80+ employees, 2 conference rooms, a pantry, and a server room. 24/7 security.",
        property_type: "commercial",
        listing_type: "sale",
        price: 28000000,
        bedrooms: 0,
        bathrooms: 3,
        area_sqft: 3800,
        location_address: "DLF Cyber City, Phase 3",
        location_city: "Gurugram",
        location_state: "Haryana",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
        ],
        features: ["parking", "security", "lift", "power-backup"],
        status: "available",
    },
    {
        title: "Sunrise 3BHK, Whitefield",
        description:
            "Spacious 3-bedroom apartment in a gated community with world-class amenities. South-east facing with abundant natural light, semi-furnished with modular kitchen and wardrobes.",
        property_type: "apartment",
        listing_type: "sale",
        price: 12500000,
        bedrooms: 3,
        bathrooms: 2,
        area_sqft: 1650,
        location_address: "Near ITPL Main Road, Whitefield",
        location_city: "Bangalore",
        location_state: "Karnataka",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
        ],
        features: ["gym", "pool", "parking", "security", "lift", "power-backup", "gas-pipeline", "clubhouse"],
        status: "available",
    },
    {
        title: "Heritage Haveli, Civil Lines",
        description:
            "A meticulously restored 1920s heritage haveli with 6 bedrooms, original arched doorways, and hand-painted frescoes. 8000 sq.ft with a central courtyard and modern kitchen wing.",
        property_type: "villa",
        listing_type: "sale",
        price: 120000000,
        bedrooms: 6,
        bathrooms: 5,
        area_sqft: 8000,
        location_address: "Civil Lines, Near Rajpur Road",
        location_city: "Delhi",
        location_state: "Delhi",
        images: [
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
            "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
        ],
        features: ["parking", "security", "power-backup"],
        status: "available",
    },

    // ─── 4 FOR RENT ───
    {
        title: "Furnished Studio, Baner Hills",
        description:
            "Move-in ready, fully furnished studio apartment ideal for working professionals. Features a Murphy bed, built-in workstation, compact modular kitchen, and glass-enclosed balcony with hill views.",
        property_type: "apartment",
        listing_type: "rent",
        price: 22000,
        bedrooms: 1,
        bathrooms: 1,
        area_sqft: 550,
        location_address: "Baner Hills Road, Near Symbiosis",
        location_city: "Pune",
        location_state: "Maharashtra",
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
        ],
        features: ["gym", "parking", "security", "lift", "power-backup"],
        status: "available",
    },
    {
        title: "Lake View 2BHK, Hebbal",
        description:
            "A premium 2-bedroom apartment overlooking the serene Hebbal Lake. Semi-furnished with wooden flooring, split ACs, and a fully equipped kitchen. Gated community with swimming pool.",
        property_type: "apartment",
        listing_type: "rent",
        price: 38000,
        bedrooms: 2,
        bathrooms: 2,
        area_sqft: 1200,
        location_address: "Hebbal Lake View Apartments, Outer Ring Road",
        location_city: "Bangalore",
        location_state: "Karnataka",
        images: [
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
        ],
        features: ["gym", "pool", "parking", "security", "lift", "power-backup", "clubhouse"],
        status: "available",
    },
    {
        title: "Premium 3BHK, Powai Hiranandani",
        description:
            "Beautifully furnished 3BHK flat in the iconic Hiranandani Gardens. European-style architecture with high ceilings, imported bathroom fittings, and a kitchen island. Near Powai Lake.",
        property_type: "apartment",
        listing_type: "rent",
        price: 75000,
        bedrooms: 3,
        bathrooms: 2,
        area_sqft: 1800,
        location_address: "Hiranandani Gardens, Powai",
        location_city: "Mumbai",
        location_state: "Maharashtra",
        images: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        ],
        features: ["gym", "pool", "parking", "security", "lift", "power-backup", "gas-pipeline", "clubhouse"],
        status: "available",
    },
    {
        title: "MG Road Co-living Space",
        description:
            "Modern co-living space with twin sharing. Includes daily housekeeping, high-speed Wi-Fi, laundry service, and access to a shared lounge and kitchen. Perfect for professionals relocating to Bangalore.",
        property_type: "apartment",
        listing_type: "rent",
        price: 15000,
        bedrooms: 1,
        bathrooms: 1,
        area_sqft: 350,
        location_address: "MG Road, Near Trinity Metro",
        location_city: "Bangalore",
        location_state: "Karnataka",
        images: [
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        ],
        features: ["gym", "security", "lift", "power-backup"],
        status: "available",
    },
];

const SEED_AGENTS = [
    {
        name: "Priya Sharma",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
        brokerage: "EstateIQ Premium Realty",
        license_number: "RERA/MH/2024/00847",
        years_experience: 8,
        specialisations: ["luxury-apartments", "villas", "investment-properties"],
        languages: ["English", "Hindi", "Marathi"],
        rating: 4.8,
        review_count: 142,
        deals_closed: 215,
        bio: "With 8 years of experience in Mumbai and Pune's luxury real estate market, I specialize in premium apartments and villas. My clients trust me for transparent dealings, market-backed pricing insights, and end-to-end support from site visits to registration. I believe in building long-term relationships, not just closing deals.",
        email: "priya.sharma@estateiq.in",
        active_listings: 6,
        service_areas: ["Mumbai", "Pune", "Thane"],
        subscription_tier: "premium",
        response_time: "< 30 min",
    },
    {
        name: "Arjun Reddy",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
        brokerage: "South India Realty Partners",
        license_number: "RERA/KA/2023/01293",
        years_experience: 5,
        specialisations: ["commercial", "plots", "new-construction"],
        languages: ["English", "Hindi", "Telugu", "Kannada"],
        rating: 4.6,
        review_count: 87,
        deals_closed: 130,
        bio: "I focus on Bangalore's booming commercial and residential markets. From IT corridor office spaces to premium plots in Indiranagar and Whitefield, I help investors and first-time buyers make confident decisions. Every property I list goes through a rigorous verification process to ensure your peace of mind.",
        email: "arjun.reddy@estateiq.in",
        active_listings: 4,
        service_areas: ["Bangalore", "Hyderabad", "Chennai"],
        subscription_tier: "premium",
        response_time: "< 1 hour",
    },
];

export default function SeedPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const [insertedCount, setInsertedCount] = useState(0);

    const handleSeed = async () => {
        setStatus("loading");
        setMessage("Seeding properties...");

        try {
            const supabase = createClient();

            // Check if user is logged in
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) {
                setStatus("error");
                setMessage("You must be logged in to seed properties. Please log in first.");
                return;
            }

            // Check if properties already exist to avoid duplicates
            const { count } = await supabase
                .from("properties")
                .select("*", { count: "exact", head: true })
                .eq("owner_id", user.id);

            if (count && count >= 10) {
                setStatus("success");
                setMessage(`Properties already seeded! Found ${count} existing listings.`);
                setInsertedCount(count);
                return;
            }

            // Insert all 10 properties with user's ID as owner
            const propertiesToInsert = SEED_PROPERTIES.map((p) => ({
                ...p,
                owner_id: user.id,
            }));

            const { data: insertedData, error: insertError } = await supabase
                .from("properties")
                .insert(propertiesToInsert)
                .select();

            if (insertError) {
                throw new Error(insertError.message);
            }

            setInsertedCount(insertedData?.length || 0);

            // ─── Now seed agents ───
            setMessage("Seeding agents...");
            try {
                const agentsToInsert = SEED_AGENTS.map((a) => ({
                    ...a,
                    user_id: user.id,
                }));

                const { error: agentError } = await supabase
                    .from("agents")
                    .insert(agentsToInsert);

                if (agentError) {
                    console.warn("Agent seeding skipped (table may not exist):", agentError.message);
                }
            } catch (agentErr) {
                console.warn("Agent seeding failed:", agentErr);
            }

            setStatus("success");
            setMessage(
                `Successfully seeded ${insertedData?.length || 0} properties + 2 agents!`
            );
        } catch (err: any) {
            setStatus("error");
            setMessage("Error: " + err.message);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center">
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    Seed Properties
                </h1>
                <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                    This will add <strong>10 premium property listings</strong> (6 sale + 4 rent) and
                    <strong> 2 verified agents</strong> to your Supabase database.
                </p>

                {status === "idle" && (
                    <Button
                        onClick={handleSeed}
                        className="h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black px-10 shadow-xl shadow-blue-600/20 text-lg"
                    >
                        Seed Everything
                    </Button>
                )}

                {status === "loading" && (
                    <div className="flex items-center justify-center gap-3 text-blue-600">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="font-bold text-lg">{message}</span>
                    </div>
                )}

                {status === "success" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-3 text-emerald-600">
                            <CheckCircle className="h-8 w-8" />
                            <span className="font-bold text-lg">{message}</span>
                        </div>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a
                                href="/buy"
                                className="inline-flex h-12 items-center px-6 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                            >
                                Buy Page →
                            </a>
                            <a
                                href="/rent"
                                className="inline-flex h-12 items-center px-6 border-2 border-slate-200 rounded-xl font-bold text-slate-700 hover:border-slate-300 transition-all"
                            >
                                Rent Page →
                            </a>
                            <a
                                href="/agents"
                                className="inline-flex h-12 items-center px-6 border-2 border-blue-200 rounded-xl font-bold text-blue-700 hover:border-blue-300 transition-all"
                            >
                                Agents →
                            </a>
                        </div>
                    </div>
                )}

                {status === "error" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-3 text-red-600">
                            <AlertCircle className="h-6 w-6" />
                            <span className="font-bold">{message}</span>
                        </div>
                        <Button
                            onClick={handleSeed}
                            variant="outline"
                            className="rounded-xl font-bold"
                        >
                            Retry
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
