import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

  const { error } = await supabase
    .from('usuarios_demo')
    .update({ estado: 'aprobado' })
    .eq('correo', correo.toLowerCase().trim());

  if (error) {
    return new Response(
      `<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f8fafc;">
        <div style="text-align:center;padding:40px;border:1px solid #e2e8f0;border-radius:12px;background:white;max-width:400px;">
          <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
          <h2 style="color:#f59e0b;margin:0 0 8px">Error al aprobar</h2>
          <p style="color:#64748b;margin:0">No se pudo actualizar el estado en la base de datos.</p>
          <p style="color:#94a3b8;font-size:12px;margin-top:12px;">${error.message}</p>
        </div>
      </body></html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }

  return new Response(
    `<html><body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#f0fdf4;">
      <div style="text-align:center;padding:40px;border:1px solid #bbf7d0;border-radius:12px;background:white;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
        <div style="font-size:52px;margin-bottom:16px;">✅</div>
        <h2 style="color:#16a34a;margin:0 0 8px;font-size:22px;">Usuario Aprobado</h2>
        <p style="color:#374151;margin:0 0 16px;font-size:15px;">El correo <strong>${correo}</strong> ahora tiene acceso a la plataforma Demo de Titania Sync.</p>
        <p style="color:#94a3b8;font-size:12px;margin:0;">Puedes cerrar esta ventana.</p>
      </div>
    </body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html' } }
  );
}
