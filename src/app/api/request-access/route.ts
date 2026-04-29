import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, company, email } = await req.json();

    if (!name || !company || !email) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    console.log("==== DEBUG CORREO ====");
    console.log("Usuario:", "contacto@titan-ia.com");
    console.log("¿Existe SMTP_PASSWORD?:", !!process.env.SMTP_PASSWORD);
    console.log("Largo del password:", process.env.SMTP_PASSWORD?.length || 0);
    console.log("======================");

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587, // TLS
      secure: false,
      auth: {
        user: "contacto@titan-ia.com",
        pass: process.env.SMTP_PASSWORD
      }
    });

    // 1. Correo interno para el equipo
    const mailOptionsAdmin = {
      from: '"Titania Sync" <contacto@titan-ia.com>',
      to: "contacto@titan-ia.com",
      subject: "Nueva solicitud de acceso en Demo Titania",
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a2f24; padding: 20px; text-align: center; border-bottom: 4px solid #518b62;">
             <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">NUEVA SOLICITUD DE ACCESO</h2>
             <p style="color: #8ebc9b; margin: 5px 0 0 0; font-size: 12px; text-transform: uppercase;">Demo Titania Sync</p>
          </div>
          <div style="padding: 30px; background-color: #f8fafc;">
            <p style="color: #475569; font-size: 14px;">Alguien acaba de enviar una solicitud desde la pantalla principal de la Demo.</p>
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin-top: 20px;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #1e293b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre Completo:</strong><br><span style="color: #334155; font-size: 16px;">${name}</span></p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #1e293b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Institución / Empresa:</strong><br><span style="color: #334155; font-size: 16px;">${company}</span></p>
              <p style="margin: 0 0 10px 0;"><strong style="color: #1e293b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Correo Electrónico:</strong><br><span style="color: #334155; font-size: 16px;">${email}</span></p>
            </div>
          </div>
          <div style="background-color: #e2e8f0; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
            Sistema de Notificaciones Automatizado — TitanIA
          </div>
        </div>
      `
    };

    // 2. Correo de autorespuesta para el solicitante
    const mailOptionsClient = {
      from: '"Titania Sync" <contacto@titan-ia.com>',
      to: email,
      subject: "Solicitud contraseña Demo Titania Sync",
      text: "Haz completado y enviado con éxito el formulario de solicitud para obtener la contraseña de la Demo de Titania Sync. Muy pronto recibirás una respuesta de nuestro equipo.",
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #334155;">
          <h2 style="color: #1a2f24;">¡Hola, ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.5;">Haz completado y enviado con éxito el formulario de solicitud para obtener la contraseña de la <strong>Demo de Titania Sync</strong>.</p>
          <p style="font-size: 16px; line-height: 1.5;">Muy pronto recibirás una respuesta de nuestro equipo para darte acceso a la plataforma.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="font-size: 12px; color: #94a3b8;">Este es un mensaje automático. Por favor no respondas a este correo.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsClient);
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
