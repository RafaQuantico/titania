import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const CRON_SECRET = process.env.CRON_SECRET || 'titania-cron-2025';
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sync.titan-ia.com';

// Configurar transporter de correo
function getTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false,
    auth: {
      user: 'contacto@titan-ia.com',
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function GET(req: Request) {
  // Seguridad: verificar que viene de Vercel Cron o con el secret correcto
  const authHeader = req.headers.get('authorization');
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (authHeader !== `Bearer ${CRON_SECRET}` && secret !== CRON_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const ahora = new Date();
  const resultados = { alertas_enviadas: 0, expiraciones_procesadas: 0, errores: 0 };

  try {
    // Obtener todos los usuarios activos con contraseña revelada
    const { data: usuarios, error } = await supabase
      .from('usuarios_especiales_demo02')
      .select('*')
      .eq('estado', 'activo')
      .not('password_visto_at', 'is', null);

    if (error) {
      console.error('Error leyendo usuarios especiales:', error);
      return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 });
    }

    if (!usuarios || usuarios.length === 0) {
      return NextResponse.json({ ok: true, mensaje: 'No hay usuarios activos para revisar', ...resultados });
    }

    const transporter = getTransporter();

    for (const usuario of usuarios) {
      const inicio = new Date(usuario.password_visto_at);
      const msTranscurridos = ahora.getTime() - inicio.getTime();
      const horasTranscurridas = msTranscurridos / (1000 * 60 * 60);

      try {
        // ── ALERTA: quedan 24 horas (han pasado ≥ 48h) ──
        if (horasTranscurridas >= 48 && !usuario.alerta_24h_enviada) {
          const horasRestantes = Math.max(0, Math.floor(72 - horasTranscurridas));

          await transporter.sendMail({
            from: '"Titania SPIP" <contacto@titan-ia.com>',
            to: usuario.correo,
            subject: '⚠️ Tu acceso a Titania SPIP expira en 24 horas',
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
              <body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;padding:40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.08);">
                        
                        <!-- Header alerta -->
                        <tr>
                          <td style="background:linear-gradient(160deg,#78350f 0%,#92400e 60%,#b45309 100%);padding:48px 48px 40px 48px;">
                            <img src="${BASE_URL}/titania-logo.png" alt="Titania" width="120" style="display:block;margin:0 0 32px 0;filter:brightness(0) invert(1);" />
                            <p style="margin:0 0 24px 0;font-size:10px;font-weight:700;letter-spacing:4px;color:#fcd34d;text-transform:uppercase;">Aviso Importante</p>
                            <h1 style="margin:0 0 6px 0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.5px;">Expira en ~${horasRestantes} horas</h1>
                            <p style="margin:0;font-size:13px;color:#fde68a;letter-spacing:2px;text-transform:uppercase;">Titania SPIP &nbsp;&middot;&nbsp; DEMO 02</p>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td style="padding:44px 48px;">
                            <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#92400e;letter-spacing:1px;text-transform:uppercase;">Estimado/a ${usuario.nombre.trim()}</p>
                            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.8;color:#475569;">
                              Su período de acceso especial a <strong style="color:#1a2f24;">Titania SPIP DEMO 02</strong> está por finalizar. Le quedan aproximadamente <strong>${horasRestantes} horas</strong> para explorar la plataforma.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #f59e0b;border-radius:3px;margin-bottom:32px;">
                              <tr>
                                <td style="padding:18px 22px;">
                                  <table cellpadding="0" cellspacing="0"><tr>
                                    <td style="vertical-align:top;padding-right:14px;padding-top:2px;">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="#92400e" stroke-width="1.8"/>
                                        <path d="M12 8v4M12 16h.01" stroke="#92400e" stroke-width="2" stroke-linecap="round"/>
                                      </svg>
                                    </td>
                                    <td style="font-size:13px;color:#92400e;line-height:1.7;">
                                      <strong>¿Necesita más tiempo?</strong> Si desea continuar explorando o está interesado en adquirir el servicio, contáctenos antes de que expire su acceso.
                                    </td>
                                  </tr></table>
                                </td>
                              </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" style="padding-bottom:16px;">
                                  <a href="${BASE_URL}" style="display:inline-block;background:linear-gradient(135deg,#1a2f24 0%,#2d5a3d 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:16px 40px;border-radius:3px;letter-spacing:2px;text-transform:uppercase;">
                                    Ingresar a la Plataforma
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td align="center">
                                  <a href="mailto:contacto@titan-ia.com" style="display:inline-block;background:#f8fafc;border:1px solid #e2e8f0;color:#475569;text-decoration:none;font-weight:600;font-size:12px;padding:12px 32px;border-radius:3px;letter-spacing:1px;text-transform:uppercase;">
                                    Contactar a Titania
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;text-align:center;">
                            <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.7;">Equipo Titania SPIP &nbsp;&middot;&nbsp; <a href="mailto:contacto@titan-ia.com" style="color:#64748b;text-decoration:none;">contacto@titan-ia.com</a></p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            `,
          });

          await supabase
            .from('usuarios_especiales_demo02')
            .update({ alerta_24h_enviada: true })
            .eq('correo', usuario.correo);

          resultados.alertas_enviadas++;
        }

        // ── EXPIRACIÓN: han pasado ≥ 72h ──
        if (horasTranscurridas >= 72 && !usuario.expiracion_enviada) {
          await transporter.sendMail({
            from: '"Titania SPIP" <contacto@titan-ia.com>',
            to: usuario.correo,
            subject: '🙏 Tu experiencia con Titania SPIP ha finalizado — ¡Gracias!',
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
              <body style="margin:0;padding:0;background-color:#eef2f7;font-family:'Segoe UI',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2f7;padding:40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;box-shadow:0 2px 24px rgba(0,0,0,0.08);">

                        <!-- Header gracias -->
                        <tr>
                          <td style="background:linear-gradient(160deg,#0f1e17 0%,#1a2f24 60%,#2d5a3d 100%);padding:48px 48px 40px 48px;">
                            <img src="${BASE_URL}/titania-logo.png" alt="Titania" width="120" style="display:block;margin:0 0 32px 0;" />
                            <p style="margin:0 0 24px 0;font-size:10px;font-weight:700;letter-spacing:4px;color:#518b62;text-transform:uppercase;">Acceso Finalizado</p>
                            <h1 style="margin:0 0 6px 0;font-size:32px;font-weight:800;color:#ffffff;line-height:1.15;letter-spacing:-0.5px;">¡Gracias por su interés!</h1>
                            <p style="margin:0;font-size:13px;color:#6dab84;letter-spacing:2px;text-transform:uppercase;">Titania SPIP &nbsp;&middot;&nbsp; DEMO 02</p>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td style="padding:44px 48px;">
                            <p style="margin:0 0 6px 0;font-size:13px;font-weight:600;color:#2d5a3d;letter-spacing:1px;text-transform:uppercase;">Estimado/a ${usuario.nombre.trim()}</p>
                            <p style="margin:0 0 20px 0;font-size:15px;line-height:1.8;color:#475569;">
                              Su período de acceso especial a <strong style="color:#1a2f24;">Titania SPIP DEMO 02</strong> ha finalizado. Esperamos que la experiencia haya sido valiosa y que haya podido explorar el potencial de nuestra plataforma de inteligencia regulatoria.
                            </p>
                            <p style="margin:0 0 32px 0;font-size:15px;line-height:1.8;color:#475569;">
                              Si tiene preguntas, desea obtener más información sobre nuestros servicios, o está listo para dar el siguiente paso, nuestro equipo está disponible para acompañarle.
                            </p>

                            <!-- CTA -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:3px;margin-bottom:32px;">
                              <tr>
                                <td style="padding:28px 24px;text-align:center;">
                                  <p style="margin:0 0 8px 0;font-size:14px;color:#1a2f24;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">¿Listo para seguir adelante?</p>
                                  <p style="margin:0 0 24px 0;font-size:14px;color:#475569;line-height:1.6;">Contáctese con su ejecutivo Titania para más información o para adquirir el servicio.</p>
                                  <a href="mailto:contacto@titan-ia.com?subject=Información sobre Titania SPIP - ${encodeURIComponent(usuario.nombre.trim())}" 
                                     style="display:inline-block;background:linear-gradient(135deg,#1a2f24,#2d5a3d);color:#ffffff;text-decoration:none;font-weight:700;font-size:13px;padding:16px 40px;border-radius:3px;letter-spacing:2px;text-transform:uppercase;">
                                    Contactar a Titania
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <p style="margin:0;font-size:13px;line-height:1.7;color:#64748b;text-align:center;">
                              También puede escribirnos directamente a<br>
                              <a href="mailto:contacto@titan-ia.com" style="color:#1a2f24;font-weight:600;text-decoration:none;">contacto@titan-ia.com</a>
                            </p>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;text-align:center;">
                            <p style="margin:0 0 6px 0;font-size:11px;color:#64748b;line-height:1.7;">Fue un placer tenerle en nuestra plataforma, <strong style="color:#475569;">${usuario.nombre.trim()}</strong>.</p>
                            <p style="margin:0;font-size:11px;color:#94a3b8;">Equipo Titania SPIP &nbsp;&middot;&nbsp; <a href="mailto:contacto@titan-ia.com" style="color:#94a3b8;text-decoration:none;">contacto@titan-ia.com</a></p>
                          </td>
                        </tr>

                      </table>
                    </td>
                  </tr>
                </table>
              </body>
              </html>
            `,
          });

          await supabase
            .from('usuarios_especiales_demo02')
            .update({ expiracion_enviada: true, estado: 'expirado' })
            .eq('correo', usuario.correo);

          resultados.expiraciones_procesadas++;
        }

      } catch (userError) {
        console.error(`Error procesando usuario ${usuario.correo}:`, userError);
        resultados.errores++;
      }
    }

    return NextResponse.json({
      ok: true,
      timestamp: ahora.toISOString(),
      usuarios_revisados: usuarios.length,
      ...resultados,
    });

  } catch (error) {
    console.error('Error en check-expiry:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
