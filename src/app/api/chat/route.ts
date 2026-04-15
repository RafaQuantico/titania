import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages, system } = await req.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6", // Asumiendo versión local
        max_tokens: 4096,
        system: system,
        messages: messages
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Anthropic API Error:", data);
      return NextResponse.json({ error: data.error?.message || "Error con la API de Anthropic" }, { status: response.status });
    }

    return NextResponse.json({ text: data.content?.[0]?.text });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Error de servidor interno" }, { status: 500 });
  }
}
