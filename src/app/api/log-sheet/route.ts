import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usamos las variables de entorno del servidor (sin NEXT_PUBLIC_ para mayor seguridad)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tipoAccion, nombre, institucion, correo } = body;

    // ── VERIFICAR si el correo existe en la lista de usuarios autorizados ──
    if (tipoAccion === 'Verificar') {
      const { data, error } = await supabase
        .from('usuarios_demo')
        .select('correo, nombre, estado')
        .eq('correo', correo.toLowerCase().trim())
        .single();

      if (error || !data) {
        return NextResponse.json({ existe: false });
      }

      // Si el usuario existe pero está bloqueado/pendiente
      if (data.estado === 'bloqueado' || data.estado === 'pendiente') {
        return NextResponse.json({ existe: false, motivo: data.estado });
      }

      return NextResponse.json({ existe: true, nombre: data.nombre });
    }

    // ── REGISTRAR INGRESO (log pasivo, no bloquea) ──
    if (tipoAccion === 'Ingreso') {
      // Actualizar último ingreso (ignoramos errores silenciosamente)
      try {
        await supabase
          .from('usuarios_demo')
          .update({ ultimo_ingreso: new Date().toISOString() })
          .eq('correo', correo.toLowerCase().trim());
      } catch { /* ignorado */ }

      // Log pasivo a Google Sheets (si falla, no importa)
      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ tipoAccion: 'Ingreso', correo }),
        }).catch(() => {});
      }

      return NextResponse.json({ ok: true });
    }

    // ── REGISTRAR SOLICITUD de nuevo usuario ──
    if (tipoAccion === 'Solicitud') {
      const { error } = await supabase
        .from('usuarios_demo')
        .insert({
          nombre: nombre || 'Sin nombre',
          institucion: institucion || 'No especificada',
          correo: correo.toLowerCase().trim(),
          estado: 'pendiente',
        });

      if (error) {
        // Si el correo ya existe (unique constraint), no es un error grave
        if (error.code === '23505') {
          return NextResponse.json({ ok: true, mensaje: 'El correo ya está registrado' });
        }
        throw error;
      }

      // Log pasivo a Google Sheets (si falla, no importa)
      const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ tipoAccion: 'Solicitud', nombre, institucion, correo }),
        }).catch(() => {});
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: 'Acción no reconocida' }, { status: 400 });

  } catch (error) {
    console.error('Error en /api/log-sheet:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
