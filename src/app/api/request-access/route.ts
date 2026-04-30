import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { name, company, email } = await req.json();

    if (!name || !company || !email) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const correoNormalizado = email.toLowerCase().trim();

    // ── 1. Guardar en Supabase (fuente de verdad) ──
    const { error: supabaseError } = await supabase
      .from('usuarios_demo')
      .insert({
        nombre: name,
        institucion: company,
        correo: correoNormalizado,
        estado: 'pendiente',
      });

    // Si el correo ya existe (unique constraint), no es fatal
    if (supabaseError && supabaseError.code !== '23505') {
      console.error("Error guardando en Supabase:", supabaseError);
    }

    // ── 2. Enviar correos por Hostinger ──
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "contacto@titan-ia.com",
        pass: process.env.SMTP_PASSWORD
      }
    });

    const ADMIN_TOKEN = process.env.ADMIN_APPROVE_TOKEN || 'titania-admin-2025';
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sync.titan-ia.com';
    const approveUrl = `${BASE_URL}/api/approve-user?correo=${encodeURIComponent(correoNormalizado)}&token=${ADMIN_TOKEN}`;

    const mailOptionsAdmin = {
      from: '"Titania Sync" <contacto@titan-ia.com>',
      to: "contacto@titan-ia.com",
      subject: `Nueva solicitud de acceso — ${name} (${company})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a2f24; padding: 20px; text-align: center; border-bottom: 4px solid #518b62;">
             <h2 style="color: #ffffff; margin: 0; font-size: 20px;">NUEVA SOLICITUD DE ACCESO</h2>
             <p style="color: #8ebc9b; margin: 5px 0 0 0; font-size: 12px;">Demo Titania Sync</p>
          </div>
          <div style="padding: 30px; background-color: #f8fafc;">
            <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 10px 0;"><strong style="color:#64748b;font-size:11px;text-transform:uppercase;">Nombre:</strong><br><span style="color: #334155; font-size: 16px;">${name}</span></p>
              <p style="margin: 0 0 10px 0;"><strong style="color:#64748b;font-size:11px;text-transform:uppercase;">Institución:</strong><br><span style="color: #334155; font-size: 16px;">${company}</span></p>
              <p style="margin: 0;"><strong style="color:#64748b;font-size:11px;text-transform:uppercase;">Correo:</strong><br><span style="color: #334155; font-size: 16px;">${email}</span></p>
            </div>
            <div style="text-align: center;">
              <a href="${approveUrl}" style="display:inline-block;background-color:#16a34a;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:8px;letter-spacing:0.5px;">
                ✅ Aprobar acceso con un clic
              </a>
              <p style="color:#94a3b8;font-size:11px;margin-top:16px;">Al hacer clic, este usuario quedará habilitado para entrar a la plataforma demo inmediatamente.</p>
            </div>
          </div>
          <div style="background-color: #e2e8f0; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
            Sistema de Notificaciones Automatizado — TitanIA
          </div>
        </div>
      `
    };

    const mailOptionsClient = {
      from: '"Titania Sync" <contacto@titan-ia.com>',
      to: email,
      subject: "Solicitud contraseña Demo Titania Sync",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
          <h2 style="color: #1a2f24;">¡Hola, ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.5;">Has completado y enviado con éxito el formulario de solicitud para obtener la contraseña de la <strong>Demo de Titania Sync</strong>.</p>
          <p style="font-size: 16px; line-height: 1.5;">En breves momentos recibirás las instrucciones para ingresar a la plataforma.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="font-size: 12px; color: #94a3b8;">Este es un mensaje automático. Por favor no respondas a este correo.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptionsAdmin);
    await transporter.sendMail(mailOptionsClient);

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Error en request-access:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
