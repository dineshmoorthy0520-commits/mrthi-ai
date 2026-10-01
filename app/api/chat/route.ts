import { NextResponse } from "next/server";

const systemPrompt = `You are MRthi AI, a friendly assistant that explains the Tamil Nadu NEEDS (New Entrepreneur-cum-Enterprise Development Scheme) scheme clearly and conservatively. Answer in the user's requested language when possible. Do not invent eligibility rules, document requirements, deadlines, or government decisions. If a detail is uncertain, say so and suggest checking the official Tamil Nadu government application information.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const language = typeof body?.language === "string" ? body.language : "English";

    if (!message) {
      return NextResponse.json({ reply: "Please type a question first." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "MRthi AI is deployed, but the Gemini API key has not been configured yet. Add GEMINI_API_KEY in Vercel Environment Variables and redeploy."
      });
    }

    const prompt = [
      systemPrompt,
      `Preferred language: ${language}`,
      `User question: ${message}`,
      "Give a concise, helpful answer."
    ].join("\n\n");

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }]
        }),
        cache: "no-store"
      }
    );

    if (!response.ok) {
      return NextResponse.json({ reply: "The AI service could not answer right now. Please try again." }, { status: 502 });
    }

    const data = await response.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("") ||
      "I could not generate an answer.";

    return NextResponse.json({ reply, language });
  } catch {
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
