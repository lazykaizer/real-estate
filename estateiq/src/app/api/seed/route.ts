import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service-level access via anon key with RLS bypass
// We'll insert as a specific owner_id (the first user in profiles).
// If no user exists, we create a dummy profile.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const SEED_PROPERTIES = [
    // ─── 6 FOR SALE ───
    {
        title: "Skyline Penthouse, Worli Sea Face",
        description:
            "A breathtaking 4BHK penthouse with panoramic Arabian Sea views from every room. Italian marble flooring, private terrace garden with infinity plunge pool, smart home automation, and 3 dedicated car parks. Located in one of Mumbai's most prestigious addresses.",
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
            "Sprawling 5-bedroom independent villa on a 6000 sq.ft plot with lush landscaped gardens, a private swimming pool, and a rooftop entertainment deck. Modern Scandinavian interiors with floor-to-ceiling windows and a fully equipped modular kitchen.",
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
            "East-facing 2400 sq.ft corner plot in the heart of Indiranagar, one of Bangalore's most sought-after neighborhoods. Approved for G+3 construction, clear title, all utilities available. Walking distance to 100 Feet Road and metro station.",
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
            "Premium Grade-A commercial office space on the 14th floor of DLF Cyber City. Fully fitted with modern workstations for 80+ employees, 2 conference rooms, a pantry, and a server room. 24/7 security with biometric access.",
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
            "Spacious 3-bedroom apartment in a gated community with world-class amenities. South-east facing with abundant natural light, semi-furnished with modular kitchen and wardrobes. Excellent connectivity to ITPL and upcoming metro line.",
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
            "A meticulously restored 1920s heritage haveli with 6 bedrooms, original arched doorways, and hand-painted frescoes. The 8000 sq.ft property features a central courtyard, a modern kitchen wing, and separate servant quarters. INTACH-certified restoration.",
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
            "Move-in ready, fully furnished studio apartment ideal for working professionals. Features a Murphy bed, built-in workstation, a compact modular kitchen, and a glass-enclosed balcony with hill views. Located in a tech-hub neighborhood.",
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
            "A premium 2-bedroom apartment overlooking the serene Hebbal Lake. The unit is semi-furnished with wooden flooring in the master bedroom, split ACs in both rooms, and a fully equipped kitchen. Gated community with swimming pool and jogging track.",
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
            "Beautifully furnished 3BHK flat in the iconic Hiranandani Gardens. European-style architecture with high ceilings, imported bathroom fittings, and a kitchen island. Walking distance to Powai Lake promenade, schools, and hospitals.",
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
            "Modern co-living space with twin sharing. Includes daily housekeeping, high-speed Wi-Fi, laundry service, and access to a shared lounge and a fully-stocked kitchen. Perfect for young professionals relocating to Bangalore.",
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

export async function POST() {
    try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // 1. Get the first existing profile to use as owner_id
        const { data: profiles, error: profileError } = await supabase
            .from("profiles")
            .select("id")
            .limit(1);

        if (profileError) {
            return NextResponse.json(
                { error: "Failed to fetch profiles: " + profileError.message },
                { status: 500 }
            );
        }

        if (!profiles || profiles.length === 0) {
            return NextResponse.json(
                {
                    error:
                        "No user profiles found. Please sign up at least one user first, then run the seed.",
                },
                { status: 400 }
            );
        }

        const ownerId = profiles[0].id;

        // 2. Insert all 10 properties
        const propertiesToInsert = SEED_PROPERTIES.map((p) => ({
            ...p,
            owner_id: ownerId,
        }));

        const { data: insertedData, error: insertError } = await supabase
            .from("properties")
            .insert(propertiesToInsert)
            .select();

        if (insertError) {
            return NextResponse.json(
                { error: "Failed to insert properties: " + insertError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${insertedData?.length || 0} properties (6 sale + 4 rent)`,
            properties: insertedData,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: "Unexpected error: " + err.message },
            { status: 500 }
        );
    }
}
