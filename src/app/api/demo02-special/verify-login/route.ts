import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { correo, password } = await req.json();

    if (!correo || !password) {
      return NextResponse.json({ valido: false, motivo: 'faltan_datos' }, { status: 400 });
    }

    const correoNormalizado = correo.toLowerCase().trim();

    // Buscar usuario especial
    const { data: usuario, error } = await supabase
      .from('usuarios_especiales_demo02')
      .select('password_especial, password_visto_at, estado')
      .eq('correo', correoNormalizado)
      .single();

    if (error || !usuario) {
      return NextResponse.json({ valido: false, motivo: 'no_encontrado' });
    }

    // Verificar contraseña
    if (usuario.password_especial !== password) {
      return NextResponse.json({ valido: false, motivo: 'password_incorrecta' });
    }

    // Verificar que ya haya revelado la contraseña (temporizador iniciado)
    if (!usuario.password_visto_at) {
      return NextResponse.json({ valido: false, motivo: 'no_activado' });
    }

    // Verificar que no esté expirado
    if (usuario.estado === 'expirado') {
      return NextResponse.json({ valido: false, motivo: 'expirado' });
    }

    // Verificar el tiempo manualmente (doble check)
    const inicioTiempo = new Date(usuario.password_visto_at);
    const ahora = new Date();
    const horasTranscurridas = (ahora.getTime() - inicioTiempo.getTime()) / (1000 * 60 * 60);

    if (horasTranscurridas >= 72) {
      // Marcar como expirado si el cron no lo hizo aún
      await supabase
        .from('usuarios_especiales_demo02')
        .update({ estado: 'expirado' })
        .eq('correo', correoNormalizado);

      return NextResponse.json({ valido: false, motivo: 'expirado' });
    }

    return NextResponse.json({ valido: true });

  } catch (error) {
    console.error('Error en verify-login:', error);
    return NextResponse.json({ valido: false, motivo: 'error_interno' }, { status: 500 });
  }
}
