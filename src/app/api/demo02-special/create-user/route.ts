import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_TOKEN = process.env.ADMIN_APPROVE_TOKEN || 'titania-admin-2025';
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sync.titan-ia.com';

export async function POST(req: Request) {
  try {
    const { correo, nombre, admin_token } = await req.json();

    // Seguridad básica: solo con token admin
    if (admin_token !== ADMIN_TOKEN) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    if (!correo || !nombre) {
      return NextResponse.json({ error: 'Faltan datos: correo y nombre son requeridos' }, { status: 400 });
    }

    const correoNormalizado = correo.toLowerCase().trim();

    // Calcular el siguiente numero_orden
    const { data: maxData } = await supabase
      .from('usuarios_especiales_demo02')
      .select('numero_orden')
      .order('numero_orden', { ascending: false })
      .limit(1);

    const siguienteOrden = maxData && maxData.length > 0 ? (maxData[0].numero_orden + 1) : 1;
    const passwordEspecial = `Ecu!$%${siguienteOrden}`;

    // Generar token único para el botón "Ver Contraseña"
    const revealToken = crypto.randomBytes(32).toString('hex');

    // Insertar en Supabase
    const { error: insertError } = await supabase
      .from('usuarios_especiales_demo02')
      .insert({
        correo: correoNormalizado,
        nombre: nombre.trim(),
        numero_orden: siguienteOrden,
        password_especial: passwordEspecial,
        reveal_token: revealToken,
        estado: 'pendiente',
        alerta_24h_enviada: false,
        expiracion_enviada: false,
      });

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json({ error: 'Este correo ya tiene un acceso especial creado' }, { status: 409 });
      }
      console.error('Error insertando usuario especial:', insertError);
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 });
    }

    // Construir URL del botón Ver Contraseña
    const revealUrl = `${BASE_URL}/api/demo02-special/reveal-password?correo=${encodeURIComponent(correoNormalizado)}&token=${revealToken}`;

    // Enviar email de bienvenida
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: 'contacto@titan-ia.com',
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Titania Sync" <contacto@titan-ia.com>',
      to: correoNormalizado,
      subject: '🔐 Tu acceso especial a Titania Sync — DEMO 02',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#1a2f24 0%,#2d5a3d 100%);padding:40px 40px 30px 40px;text-align:center;">
                      <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;letter-spacing:3px;color:#8ebc9b;text-transform:uppercase;">Acceso Exclusivo</p>
                      <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2;">Titania Sync</h1>
                      <p style="margin:10px 0 0 0;font-size:14px;color:#a8d5b5;letter-spacing:1px;">DEMO 02 — Usuario Especial</p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      
                      <p style="margin:0 0 8px 0;font-size:18px;font-weight:700;color:#1a2f24;">Hola, ${nombre.trim()} 👋</p>
                      <p style="margin:0 0 28px 0;font-size:15px;line-height:1.7;color:#475569;">
                        Has sido seleccionado como <strong>usuario especial</strong> para acceder a la demostración privada de <strong>Titania Sync</strong>. Esta es una experiencia exclusiva diseñada para que puedas explorar algunas de las capacidades de nuestra plataforma de inteligencia regulatoria.
                      </p>

                      <!-- Disclaimer -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-left:4px solid #94a3b8;border-radius:0 8px 8px 0;margin-bottom:28px;">
                        <tr>
                          <td style="padding:16px 20px;font-size:13px;color:#64748b;line-height:1.6;font-style:italic;">
                            Este demo trabaja en un entorno especial con datos limitados y solo debe ser explorado con el objetivo de acercarse a la experiencia de la plataforma.
                          </td>
                        </tr>
                      </table>

                      <!-- Instrucciones -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
                        <tr>
                          <td style="padding:24px;">
                            <p style="margin:0 0 16px 0;font-size:13px;font-weight:700;letter-spacing:2px;color:#64748b;text-transform:uppercase;">¿Cómo acceder?</p>
                            
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="padding:8px 0;vertical-align:top;">
                                  <span style="display:inline-block;width:24px;height:24px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;margin-right:12px;">1</span>
                                  <span style="font-size:14px;color:#334155;">Haz clic en <strong>"Ver Contraseña"</strong> al final de este correo para revelar tu clave de acceso.</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;vertical-align:top;">
                                  <span style="display:inline-block;width:24px;height:24px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;margin-right:12px;">2</span>
                                  <span style="font-size:14px;color:#334155;">Visita <strong><a href="${BASE_URL}" style="color:#2d5a3d;text-decoration:none;">${BASE_URL.replace('https://', '')}</a></strong></span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;vertical-align:top;">
                                  <span style="display:inline-block;width:24px;height:24px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;margin-right:12px;">3</span>
                                  <span style="font-size:14px;color:#334155;">Selecciona <strong>DEMO 02</strong> en la plataforma.</span>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0;vertical-align:top;">
                                  <span style="display:inline-block;width:24px;height:24px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;margin-right:12px;">4</span>
                                  <span style="font-size:14px;color:#334155;">Ingresa tu correo <strong>${correoNormalizado}</strong> y tu contraseña especial.</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Aviso de tiempo -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid #f59e0b;border-radius:12px;margin-bottom:32px;">
                        <tr>
                          <td style="padding:20px 24px;">
                            <p style="margin:0;font-size:14px;color:#92400e;line-height:1.6;">
                              ⏱️ <strong>Importante:</strong> Tu contraseña estará activa por <strong>72 horas</strong> contadas desde el momento en que hagas clic en "Ver Contraseña". Úsala dentro de ese período para explorar la plataforma.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Qué encontrarás -->
                      <p style="margin:0 0 16px 0;font-size:15px;font-weight:700;color:#1a2f24;">¿Qué encontrarás en la plataforma?</p>
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#475569;">🔍 &nbsp;Análisis regulatorio con inteligencia artificial</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#475569;">📊 &nbsp;Dashboards interactivos de datos ambientales</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#475569;">📁 &nbsp;Biblioteca documental especializada</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0;font-size:14px;color:#475569;">💬 &nbsp;Chat con IA entrenada en normativa sectorial</td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 32px 0;">

                      <!-- Botón Ver Contraseña -->
                      <p style="margin:0 0 12px 0;font-size:13px;color:#64748b;text-align:center;">
                        Al hacer clic, tu contraseña se revelará y el período de 72 horas comenzará a contar.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="${revealUrl}" 
                               style="display:inline-block;background:linear-gradient(135deg,#1a2f24 0%,#2d5a3d 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:18px 48px;border-radius:12px;letter-spacing:0.5px;box-shadow:0 4px 16px rgba(26,47,36,0.35);">
                              🔑 &nbsp;Ver Contraseña
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
                      <p style="margin:0 0 6px 0;font-size:12px;color:#94a3b8;">Este mensaje fue enviado a <strong>${correoNormalizado}</strong></p>
                      <p style="margin:0;font-size:11px;color:#cbd5e1;">Equipo Titania Sync · contacto@titan-ia.com</p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Marcar email como enviado
    await supabase
      .from('usuarios_especiales_demo02')
      .update({ email_enviado_at: new Date().toISOString() })
      .eq('correo', correoNormalizado);

    return NextResponse.json({
      ok: true,
      numero_orden: siguienteOrden,
      password_especial: passwordEspecial,
      mensaje: `Usuario creado y email enviado a ${correoNormalizado}`,
    });

  } catch (error) {
    console.error('Error en create-user:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
