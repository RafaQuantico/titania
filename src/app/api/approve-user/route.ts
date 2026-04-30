import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Token secreto para evitar aprobaciones no autorizadas
const ADMIN_TOKEN = process.env.ADMIN_APPROVE_TOKEN || 'titania-admin-2025';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const correo = searchParams.get('correo');
  const token = searchParams.get('token');

  if (!correo || token !== ADMIN_TOKEN) {
    return new Response(
      `<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f8fafc;">
        <div style="text-align:center;padding:40px;border:1px solid #e2e8f0;border-radius:12px;background:white;max-width:400px;">
          <div style="font-size:48px;margin-bottom:16px;">❌</div>
          <h2 style="color:#ef4444;margin:0 0 8px">Acceso denegado</h2>
          <p style="color:#64748b;margin:0">Token inválido o correo faltante.</p>
        </div>
      </body></html>`,
      { status: 403, headers: { 'Content-Type': 'text/html' } }
    );
  }

  // 1. Obtener los datos del usuario para el correo
  const { data: usuario, error: fetchError } = await supabase
    .from('usuarios_demo')
    .select('nombre, estado')
    .eq('correo', correo.toLowerCase().trim())
    .single();

  if (fetchError || !usuario) {
    return new Response(
      `<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f8fafc;">
        <div style="text-align:center;padding:40px;border:1px solid #e2e8f0;border-radius:12px;background:white;max-width:400px;">
          <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
          <h2 style="color:#f59e0b;margin:0 0 8px">Usuario no encontrado</h2>
          <p style="color:#64748b;margin:0">El correo solicitado no existe en la base de datos.</p>
        </div>
      </body></html>`,
      { status: 404, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const estadoPrevio = usuario.estado;

  // 2. Actualizar el estado a 'aprobado'
  const { error: updateError } = await supabase
    .from('usuarios_demo')
    .update({ estado: 'aprobado' })
    .eq('correo', correo.toLowerCase().trim());

  if (updateError) {
    return new Response(
      `<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f8fafc;">
        <div style="text-align:center;padding:40px;border:1px solid #e2e8f0;border-radius:12px;background:white;max-width:400px;">
          <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
          <h2 style="color:#f59e0b;margin:0 0 8px">Error al aprobar</h2>
          <p style="color:#64748b;margin:0">No se pudo actualizar el estado en la base de datos.</p>
        </div>
      </body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }

  // 3. Enviar correo al cliente con la contraseña solo si no estaba aprobado antes
  if (estadoPrevio !== 'aprobado') {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false,
        auth: {
          user: "contacto@titan-ia.com",
          pass: process.env.SMTP_PASSWORD
        }
      });

      const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sync.titan-ia.com';

      const mailOptions = {
        from: '"Titania Sync" <contacto@titan-ia.com>',
        to: correo,
        subject: "✅ Acceso Aprobado - Demo Titania Sync",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #16a34a; padding: 20px; text-align: center;">
               <h2 style="color: #ffffff; margin: 0; font-size: 20px;">¡Acceso Aprobado!</h2>
            </div>
            <div style="padding: 30px; background-color: #f8fafc;">
              <h2 style="color: #1a2f24; margin-top: 0;">¡Hola, ${usuario.nombre}!</h2>
              <p style="font-size: 16px; line-height: 1.5;">Tu solicitud de acceso ha sido revisada y aprobada. Ya puedes ingresar a la plataforma de demostración de Titania Sync.</p>
              
              <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 24px 0; text-align: center;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase;">Tu contraseña de acceso es:</p>
                <div style="background-color: #f1f5f9; padding: 12px; border-radius: 4px; font-size: 20px; font-weight: bold; color: #0f172a; letter-spacing: 1px;">
                  DemoTitania1122!
                </div>
              </div>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${BASE_URL}" style="display:inline-block;background-color:#1a2f24;color:#ffffff;text-decoration:none;font-weight:bold;font-size:15px;padding:14px 32px;border-radius:8px;">
                  Ingresar a la Plataforma
                </a>
              </div>
            </div>
            <div style="background-color: #e2e8f0; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
              Equipo Titania Sync — 2025
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("Error enviando correo de aprobación:", mailError);
    }
  }

  return new Response(
    `<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f0fdf4;">
      <div style="text-align:center;padding:40px;border:1px solid #bbf7d0;border-radius:12px;background:white;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <div style="font-size:52px;margin-bottom:16px;">✅</div>
        <h2 style="color:#16a34a;margin:0 0 8px;font-size:22px;">Usuario Aprobado y Notificado</h2>
        <p style="color:#374151;margin:0 0 16px;font-size:15px;">El correo <strong>${correo}</strong> ahora tiene acceso.<br><br>Se le ha enviado un correo automáticamente con la contraseña.</p>
        <p style="color:#94a3b8;font-size:12px;margin:0;">Puedes cerrar esta ventana.</p>
      </div>
    </body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  );
}
