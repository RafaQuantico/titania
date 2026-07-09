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
            from: '"Titania Sync" <contacto@titan-ia.com>',
            to: usuario.correo,
            subject: '⚠️ Tu acceso a Titania Sync expira en 24 horas',
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
              <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">
                        
                        <!-- Header alerta -->
                        <tr>
                          <td style="background:linear-gradient(135deg,#92400e 0%,#b45309 100%);padding:36px 40px;text-align:center;">
                            <p style="margin:0 0 8px 0;font-size:40px;">⏰</p>
                            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">¡Te quedan ~${horasRestantes} horas!</h1>
                            <p style="margin:8px 0 0 0;font-size:14px;color:#fde68a;">Titania Sync — DEMO 02</p>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td style="padding:36px 40px;">
                            <p style="margin:0 0 20px 0;font-size:16px;font-weight:700;color:#1a2f24;">Hola, ${usuario.nombre} 👋</p>
                            <p style="margin:0 0 24px 0;font-size:15px;line-height:1.7;color:#475569;">
                              Tu período de acceso especial a <strong>Titania Sync DEMO 02</strong> está por finalizar. Te quedan aproximadamente <strong>${horasRestantes} horas</strong> para explorar la plataforma.
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef3c7;border:1px solid #f59e0b;border-radius:12px;margin-bottom:28px;">
                              <tr>
                                <td style="padding:20px 24px;font-size:14px;color:#92400e;line-height:1.6;">
                                  💡 <strong>¿Necesitas más tiempo?</strong> Si quieres continuar explorando o estás interesado en adquirir el servicio, contáctanos antes de que expire tu acceso.
                                </td>
                              </tr>
                            </table>

                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" style="padding-bottom:16px;">
                                  <a href="${BASE_URL}" style="display:inline-block;background:linear-gradient(135deg,#1a2f24 0%,#2d5a3d 100%);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:16px 40px;border-radius:10px;">
                                    Ingresar a la Plataforma →
                                  </a>
                                </td>
                              </tr>
                              <tr>
                                <td align="center">
                                  <a href="mailto:contacto@titan-ia.com" style="display:inline-block;background:#f8fafc;border:1px solid #e2e8f0;color:#334155;text-decoration:none;font-weight:600;font-size:14px;padding:12px 32px;border-radius:10px;">
                                    📩 Contactar a Titania
                                  </a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;">
                            <p style="margin:0;font-size:11px;color:#94a3b8;">Equipo Titania Sync · contacto@titan-ia.com</p>
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
            from: '"Titania Sync" <contacto@titan-ia.com>',
            to: usuario.correo,
            subject: '🙏 Tu experiencia con Titania Sync ha finalizado — ¡Gracias!',
            html: `
              <!DOCTYPE html>
              <html>
              <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
              <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 20px;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.10);">

                        <!-- Header gracias -->
                        <tr>
                          <td style="background:linear-gradient(135deg,#1a2f24 0%,#2d5a3d 100%);padding:40px;text-align:center;">
                            <p style="margin:0 0 12px 0;font-size:44px;">🌿</p>
                            <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;">¡Gracias por tu interés!</h1>
                            <p style="margin:10px 0 0 0;font-size:14px;color:#a8d5b5;">Titania Sync — DEMO 02</p>
                          </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                          <td style="padding:40px;">
                            <p style="margin:0 0 20px 0;font-size:16px;font-weight:700;color:#1a2f24;">Hola, ${usuario.nombre} 👋</p>
                            <p style="margin:0 0 20px 0;font-size:15px;line-height:1.7;color:#475569;">
                              Tu período de acceso especial a <strong>Titania Sync DEMO 02</strong> ha finalizado. Esperamos que la experiencia haya sido valiosa y que hayas podido explorar el potencial de nuestra plataforma de inteligencia regulatoria.
                            </p>
                            <p style="margin:0 0 28px 0;font-size:15px;line-height:1.7;color:#475569;">
                              Si tienes preguntas, quieres obtener más información sobre nuestros servicios, o estás listo para dar el siguiente paso, nuestro equipo está disponible para acompañarte.
                            </p>

                            <!-- CTA -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #86efac;border-radius:12px;margin-bottom:28px;">
                              <tr>
                                <td style="padding:24px;text-align:center;">
                                  <p style="margin:0 0 8px 0;font-size:14px;color:#166534;font-weight:700;">¿Listo para seguir adelante?</p>
                                  <p style="margin:0 0 20px 0;font-size:13px;color:#16a34a;line-height:1.6;">Contáctate con tu ejecutivo Titania para más información o para adquirir el servicio.</p>
                                  <a href="mailto:contacto@titan-ia.com?subject=Información sobre Titania Sync - ${encodeURIComponent(usuario.nombre)}" 
                                     style="display:inline-block;background:linear-gradient(135deg,#1a2f24,#2d5a3d);color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:16px 36px;border-radius:10px;">
                                    📩 Contactar a Titania
                                  </a>
                                </td>
                              </tr>
                            </table>

                            <p style="margin:0;font-size:14px;line-height:1.7;color:#64748b;text-align:center;">
                              También puedes escribirnos directamente a<br>
                              <a href="mailto:contacto@titan-ia.com" style="color:#1a2f24;font-weight:600;text-decoration:none;">contacto@titan-ia.com</a>
                            </p>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
                            <p style="margin:0 0 6px 0;font-size:12px;color:#94a3b8;">Fue un placer tenerte en nuestra plataforma, <strong>${usuario.nombre}</strong>.</p>
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
