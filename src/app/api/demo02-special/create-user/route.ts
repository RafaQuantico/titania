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
      subject: 'Tu acceso especial a Titania Sync — DEMO 02',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(160deg,#0f1e17 0%,#1a2f24 60%,#2d5a3d 100%);padding:48px 48px 40px 48px;">
                      <img src="${BASE_URL}/titania-logo.png" alt="Titania" width="120" style="display:block;margin:0 0 32px 0;" />
                      <p style="margin:0 0 24px 0;font-size:10px;font-weight:700;letter-spacing:4px;color:#518b62;text-transform:uppercase;">Acceso Especial</p>
                      <h1 style="margin:0 0 6px 0;font-size:32px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.5px;">Titania Sync</h1>
                      <p style="margin:0;font-size:13px;color:#6dab84;letter-spacing:2px;text-transform:uppercase;">DEMO 02</p>
                      <table cellpadding="0" cellspacing="0" style="margin-top:28px;">
                        <tr>
                          <td style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:3px;padding:8px 16px;">
                            <p style="margin:0;font-size:12px;color:#a8d5b5;letter-spacing:0.5px;">Invitación personal &nbsp;&middot;&nbsp; ${nombre.trim()}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:44px 48px;">

                      <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#2d5a3d;letter-spacing:1px;text-transform:uppercase;">Estimado/a ${nombre.trim()}</p>
                      <p style="margin:0 0 28px 0;font-size:15px;line-height:1.8;color:#475569;">
                        Ha sido seleccionado como <strong style="color:#1a2f24;">usuario especial</strong> para acceder a la demostración privada de <strong style="color:#1a2f24;">Titania Sync</strong>. Esta es una experiencia exclusiva diseñada para que pueda explorar algunas de las capacidades de nuestra plataforma de inteligencia regulatoria.
                      </p>

                      <!-- Disclaimer -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
                        <tr>
                          <td style="background:#f8fafc;border-left:3px solid #64748b;padding:16px 20px;">
                            <table cellpadding="0" cellspacing="0"><tr>
                              <td style="vertical-align:top;padding-right:10px;padding-top:1px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="12" cy="12" r="10" stroke="#64748b" stroke-width="1.8"/>
                                  <path d="M12 8v4M12 16h.01" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                              </td>
                              <td style="font-size:12px;color:#64748b;line-height:1.7;">
                                <strong style="color:#475569;font-size:12px;">Advertencia de alcance.</strong> Este demo corresponde a un entorno de prueba, habilitado únicamente para revisión exploratoria. Sus respuestas, resultados y visualizaciones no han sido validados técnica, jurídica ni institucionalmente, por lo que no deben ser considerados como antecedentes oficiales, asesoría legal ni insumos vinculantes para la toma de decisiones.
                              </td>
                            </tr></table>
                          </td>
                        </tr>
                      </table>

                      <!-- Divisor con título -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td style="border-top:1px solid #e2e8f0;width:20px;"></td>
                          <td style="padding:0 12px;white-space:nowrap;">
                            <span style="font-size:10px;font-weight:700;letter-spacing:3px;color:#94a3b8;text-transform:uppercase;">Instrucciones de acceso</span>
                          </td>
                          <td style="border-top:1px solid #e2e8f0;"></td>
                        </tr>
                      </table>

                      <!-- Pasos -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                          <td style="padding:10px 0;vertical-align:top;">
                            <table cellpadding="0" cellspacing="0" width="100%"><tr>
                              <td style="width:32px;vertical-align:top;padding-top:1px;">
                                <span style="display:inline-block;width:22px;height:22px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;">1</span>
                              </td>
                              <td style="font-size:14px;color:#334155;line-height:1.6;">Haga clic en <strong style="color:#1a2f24;">"Ver Contraseña"</strong> al final de este correo para revelar su clave de acceso.</td>
                            </tr></table>
                          </td>
                        </tr>
                        <tr><td style="height:1px;background:#f1f5f9;"></td></tr>
                        <tr>
                          <td style="padding:10px 0;vertical-align:top;">
                            <table cellpadding="0" cellspacing="0" width="100%"><tr>
                              <td style="width:32px;vertical-align:top;padding-top:1px;">
                                <span style="display:inline-block;width:22px;height:22px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;">2</span>
                              </td>
                              <td style="font-size:14px;color:#334155;line-height:1.6;">Visite <a href="${BASE_URL}" style="color:#2d5a3d;font-weight:600;text-decoration:none;">${BASE_URL.replace('https://', '')}</a></td>
                            </tr></table>
                          </td>
                        </tr>
                        <tr><td style="height:1px;background:#f1f5f9;"></td></tr>
                        <tr>
                          <td style="padding:10px 0;vertical-align:top;">
                            <table cellpadding="0" cellspacing="0" width="100%"><tr>
                              <td style="width:32px;vertical-align:top;padding-top:1px;">
                                <span style="display:inline-block;width:22px;height:22px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;">3</span>
                              </td>
                              <td style="font-size:14px;color:#334155;line-height:1.6;">Seleccione <strong style="color:#1a2f24;">DEMO 02</strong> en la plataforma.</td>
                            </tr></table>
                          </td>
                        </tr>
                        <tr><td style="height:1px;background:#f1f5f9;"></td></tr>
                        <tr>
                          <td style="padding:10px 0;vertical-align:top;">
                            <table cellpadding="0" cellspacing="0" width="100%"><tr>
                              <td style="width:32px;vertical-align:top;padding-top:1px;">
                                <span style="display:inline-block;width:22px;height:22px;background:#1a2f24;color:#fff;border-radius:50%;text-align:center;line-height:22px;font-size:11px;font-weight:700;">4</span>
                              </td>
                              <td style="font-size:14px;color:#334155;line-height:1.6;">Ingrese su correo <strong style="color:#1a2f24;">${correoNormalizado}</strong> y su contraseña especial.</td>
                            </tr></table>
                          </td>
                        </tr>
                      </table>

                      <!-- Aviso de tiempo -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #d97706;border-radius:3px;margin-bottom:40px;">
                        <tr>
                          <td style="padding:18px 22px;">
                            <table cellpadding="0" cellspacing="0"><tr>
                              <td style="vertical-align:top;padding-right:14px;padding-top:2px;">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="12" cy="12" r="10" stroke="#92400e" stroke-width="1.8"/>
                                  <path d="M12 6v6l4 2" stroke="#92400e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                              </td>
                              <td style="font-size:13px;color:#92400e;line-height:1.7;">
                                <strong>Período de acceso:</strong> Su contraseña estará activa por <strong>72 horas</strong> contadas desde el momento en que haga clic en "Ver Contraseña".
                              </td>
                            </tr></table>
                          </td>
                        </tr>
                      </table>

                      <!-- Qué encontrarás -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td style="border-top:1px solid #e2e8f0;width:20px;"></td>
                          <td style="padding:0 12px;white-space:nowrap;">
                            <span style="font-size:10px;font-weight:700;letter-spacing:3px;color:#94a3b8;text-transform:uppercase;">La plataforma incluye</span>
                          </td>
                          <td style="border-top:1px solid #e2e8f0;"></td>
                        </tr>
                      </table>

                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
                        <tr>
                          <td style="padding:8px 0;">
                            <table cellpadding="0" cellspacing="0"><tr>
                              <td style="padding-right:12px;vertical-align:middle;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="7" stroke="#2d5a3d" stroke-width="2"/><path d="m16 16 4 4" stroke="#2d5a3d" stroke-width="2" stroke-linecap="round"/></svg>
                              </td>
                              <td style="font-size:14px;color:#475569;">Análisis regulatorio con inteligencia artificial</td>
                            </tr></table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">
                            <table cellpadding="0" cellspacing="0"><tr>
                              <td style="padding-right:12px;vertical-align:middle;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="12" width="4" height="9" rx="1" stroke="#2d5a3d" stroke-width="2"/><rect x="10" y="7" width="4" height="14" rx="1" stroke="#2d5a3d" stroke-width="2"/><rect x="17" y="3" width="4" height="18" rx="1" stroke="#2d5a3d" stroke-width="2"/></svg>
                              </td>
                              <td style="font-size:14px;color:#475569;">Dashboards interactivos de datos ambientales</td>
                            </tr></table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">
                            <table cellpadding="0" cellspacing="0"><tr>
                              <td style="padding-right:12px;vertical-align:middle;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="#2d5a3d" stroke-width="2"/><path d="M7 10h10M7 14h6" stroke="#2d5a3d" stroke-width="2" stroke-linecap="round"/></svg>
                              </td>
                              <td style="font-size:14px;color:#475569;">Biblioteca documental especializada</td>
                            </tr></table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">
                            <table cellpadding="0" cellspacing="0"><tr>
                              <td style="padding-right:12px;vertical-align:middle;">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10Z" stroke="#2d5a3d" stroke-width="2" stroke-linejoin="round"/></svg>
                              </td>
                              <td style="font-size:14px;color:#475569;">Chat con IA entrenada en normativa sectorial</td>
                            </tr></table>
                          </td>
                        </tr>
                      </table>

                      <!-- Botón Ver Contraseña -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1e17;border-radius:4px;">
                        <tr>
                          <td style="padding:32px;text-align:center;">
                            <p style="margin:0 0 20px 0;font-size:13px;color:#6dab84;line-height:1.6;">
                              Al hacer clic, su contraseña se revelará y el período de 72 horas comenzará a contar.
                            </p>
                            <a href="${revealUrl}"
                               style="display:inline-block;background:#ffffff;color:#1a2f24;text-decoration:none;font-weight:700;font-size:13px;padding:16px 48px;border-radius:3px;letter-spacing:2px;text-transform:uppercase;">
                              Ver Contraseña
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="font-size:11px;color:#94a3b8;line-height:1.7;">
                            Este mensaje fue enviado a <strong style="color:#64748b;">${correoNormalizado}</strong><br>
                            Equipo Titania Sync &nbsp;&middot;&nbsp; <a href="mailto:contacto@titan-ia.com" style="color:#64748b;text-decoration:none;">contacto@titan-ia.com</a>
                          </td>
                        </tr>
                      </table>
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
