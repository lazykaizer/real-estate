import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
        return NextResponse.json(
            { error: "Gemini API Key is not configured in .env" },
            { status: 500 }
        );
    }

    try {
        const { title, city, area_sqft, property_type, bedrooms } = await req.json();

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
    Generate a high-end, catchy, and descriptive property listing description for a real estate platform.
    Details:
    - Title: ${title}
    - Location: ${city}
    - Type: ${property_type}
    - Bedrooms: ${bedrooms}
    - Area: ${area_sqft} sq.ft.
    
    Make it sound luxurious, mention hypothetical amenities like "modular kitchen", "great ventilation", "prime location", and "modern fittings".
    Keep it around 150-200 words.
    Return ONLY the description text, no markdown.
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        return NextResponse.json({ description: responseText });
    } catch (error) {
        console.error("AI Description Error. Falling back to simple description.", error);

        return NextResponse.json({
            description: "Experience premium living in this meticulously designed property. Featuring a spacious layout with excellent natural light, modern modular fittings, and premium flooring throughout. The location offers great connectivity with nearby schools, hospitals, and shopping centers. Residents will enjoy a prime lifestyle with a blend of comfort and elegance. The well-ventilated rooms and contemporary architecture make it a perfect home for your family. Don't miss this opportunity in one of the most sought-after neighborhoods."
        });
    }
}
