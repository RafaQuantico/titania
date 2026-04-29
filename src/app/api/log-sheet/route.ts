import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { tipoAccion, nombre, institucion, correo } = await req.json();

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: "No webhook URL configured" }, { status: 500 });
    }

    // Google Apps Script espera los datos en formato JSON o URL-encoded.
    // Usaremos JSON.
    const res = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify({
        tipoAccion: tipoAccion || "Ingreso",
        nombre: nombre || "No provisto",
        institucion: institucion || "No provista",
        correo: correo || "Sin correo",
      }),
      headers: {
        "Content-Type": "text/plain;charset=utf-8", // Google Apps Script prefiere text/plain para CORS
      },
    });

    if (!res.ok) {
      throw new Error("Error conectando con Google Sheets");
    }

    const resultJson = await res.json();
    return NextResponse.json(resultJson);
  } catch (error) {
    console.error("Error guardando en Google Sheets:", error);
    return NextResponse.json({ error: "Failed to log to sheet" }, { status: 500 });
  }
}
