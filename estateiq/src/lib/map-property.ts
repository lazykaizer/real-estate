import type { Property } from "@/types";

/**
 * Maps a Supabase DB row (snake_case) to the frontend Property interface (camelCase).
 * This is the single source of truth for DB → UI property mapping.
 */
export function mapDbProperty(row: Record<string, any>): Property {
    return {
        id: row.id,
        title: row.title || "",
        description: row.description || "",
        price: Number(row.price) || 0,
        pricePerSqft:
            row.area_sqft && row.price
                ? Math.round(Number(row.price) / Number(row.area_sqft))
                : 0,
        propertyType: mapPropertyType(row.property_type),
        beds: row.bedrooms || 0,
        baths: row.bathrooms || 0,
        sqft: Number(row.area_sqft) || 0,
        yearBuilt: 2024,
        status: row.status === "available" ? "active" : row.status === "sold" ? "sold" : "rented",
        furnished: "semi",
        locality: row.location_address || "",
        city: row.location_city || "",
        state: row.location_state || "",
        pincode: "",
        coordinates: {
            lat: Number(row.location_lat) || 19.076,
            lng: Number(row.location_lng) || 72.8777,
        },
        agentId: row.owner_id || "",
        images:
            row.images && row.images.length > 0
                ? row.images
                : [
                    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
                ],
        isFeatured: false,
        isVerified: true,
        hasVirtualTour: false,
        isPriceDropped: false,
        priceDropPercent: 0,
        daysListed: Math.max(
            1,
            Math.floor(
                (Date.now() - new Date(row.created_at).getTime()) / (1000 * 60 * 60 * 24)
            )
        ),
        amenities: row.features || [],
        postedBy: "owner",
        parking: (row.features || []).includes("parking") ? 1 : 0,
        petFriendly: false,
        priceHistory: [],
        createdAt: row.created_at,
        updatedAt: row.updated_at || row.created_at,
    };
}

function mapPropertyType(dbType: string): Property["propertyType"] {
    switch (dbType) {
        case "apartment":
            return "apartment";
        case "house":
        case "villa":
            return "villa";
        case "commercial":
            return "commercial";
        case "land":
            return "plot";
        default:
            return "apartment";
    }
}

/**
 * Maps an array of Supabase DB rows to frontend Property objects.
 */
export function mapDbProperties(rows: Record<string, any>[]): Property[] {
    return rows.map(mapDbProperty);
}
