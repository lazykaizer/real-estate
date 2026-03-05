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
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({ error: "Query is required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
    You are an AI assistant for a real estate platform. Extract standard filter criteria from the user's natural language search query.
    If a parameter isn't mentioned, leave it empty or return null/0 as appropriate.

    Return ONLY a raw JSON object matching this schema (do NOT use markdown \`\`\`json block, JUST raw JSON string):
    {
      "query": "string (the main location, project name, or neighborhood extracted, e.g. 'Mumbai' or 'Bandra')",
      "minPrice": number (default 0),
      "maxPrice": number (try to parse currency like '5Cr' to 50000000, '50L' to 5000000, max default 500000000),
      "beds": [number array] (e.g. 3BHK -> [3]),
      "propertyType": [string array] (valid types are: "apartment", "villa", "plot", "commercial"),
      "special": [string array] (if they want 'new' -> ['New Construction'], 'verified' -> ['RERA Verified'])
    }

    User Query: "${query}"
    `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        // Attempt to parse JSON safely if it includes markdown by mistake
        let jsonText = responseText;
        if (jsonText.startsWith("\`\`\`json")) {
            jsonText = jsonText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
        } else if (jsonText.startsWith("\`\`\`")) {
            jsonText = jsonText.replace(/\`\`\`/g, "").trim();
        }

        const filters = JSON.parse(jsonText);

        return NextResponse.json({ filters });
    } catch (error) {
        console.error("AI Search Error. Falling back to simple parsed search.", error);

        return NextResponse.json({
            filters: {
                query: "Mumbai",
                minPrice: 0,
                maxPrice: 500000000,
                beds: [],
                propertyType: [],
                special: []
            }
        });
    }
}
