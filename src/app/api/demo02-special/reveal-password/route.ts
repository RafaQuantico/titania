import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://sync.titan-ia.com';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const correo = searchParams.get('correo');
  const token = searchParams.get('token');

  const html = (emoji: string, titulo: string, subtitulo: string, contenido: string, color: string = '#1a2f24') => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Titania Sync</title>
      <style>
        * { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'Segoe UI',Arial,sans-serif; background:linear-gradient(135deg,#0f1e17 0%,#1a2f24 50%,#0f1e17 100%); min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px; }
        .card { background:white; border-radius:20px; padding:48px 40px; max-width:480px; width:100%; text-align:center; box-shadow:0 24px 64px rgba(0,0,0,0.4); }
        .emoji { font-size:56px; margin-bottom:20px; display:block; }
        h1 { font-size:24px; font-weight:800; color:${color}; margin-bottom:10px; }
        .sub { font-size:14px; color:#64748b; margin-bottom:28px; }
        .password-box { background:linear-gradient(135deg,#1a2f24,#2d5a3d); border-radius:14px; padding:24px; margin:24px 0; }
        .password-label { font-size:11px; font-weight:700; letter-spacing:2px; color:#8ebc9b; text-transform:uppercase; margin-bottom:12px; }
        .password-value { font-size:32px; font-weight:900; color:#ffffff; letter-spacing:4px; font-family:'Courier New',monospace; }
        .copy-btn { display:inline-flex; align-items:center; gap:8px; background:#ffffff; border:2px solid #e2e8f0; color:#334155; font-size:14px; font-weight:600; padding:10px 24px; border-radius:8px; cursor:pointer; transition:all 0.2s ease; margin-top:4px; }
        .copy-btn:hover { background:#f1f5f9; border-color:#94a3b8; }
        .copy-btn.copied { background:#dcfce7; border-color:#86efac; color:#166534; }
        .timer-box { background:#fef3c7; border:1px solid #f59e0b; border-radius:10px; padding:16px; margin:20px 0; font-size:13px; color:#92400e; }
        .btn { display:inline-block; background:linear-gradient(135deg,#1a2f24,#2d5a3d); color:white; text-decoration:none; font-weight:700; font-size:15px; padding:16px 36px; border-radius:10px; margin-top:24px; }
        .footer { font-size:11px; color:#94a3b8; margin-top:24px; }
      </style>
    </head>
    <body>
      <div class="card">
        <span class="emoji">${emoji}</span>
        <h1>${titulo}</h1>
        <p class="sub">${subtitulo}</p>
        ${contenido}
      </div>
    </body>
    </html>
  `;

  // Validaciones básicas
  if (!correo || !token) {
    return new Response(html('❌', 'Enlace inválido', 'El enlace no contiene los parámetros correctos.', ''), {
      status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // Buscar al usuario
  const { data: usuario, error } = await supabase
    .from('usuarios_especiales_demo02')
    .select('*')
    .eq('correo', correo.toLowerCase().trim())
    .eq('reveal_token', token)
    .single();

  if (error || !usuario) {
    return new Response(html('❌', 'Enlace no válido', 'Este enlace no es válido o ya fue desactivado.', ''), {
      status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  // Si ya expiró
  if (usuario.estado === 'expirado') {
    return new Response(html(
      '⏰',
      'Acceso expirado',
      'Tu período de 72 horas ha finalizado.',
      `<p style="font-size:14px;color:#475569;line-height:1.7;">Tu acceso especial ha concluido. Para continuar explorando Titania Sync o adquirir el servicio, contáctanos en <a href="mailto:contacto@titan-ia.com" style="color:#1a2f24;font-weight:600;">contacto@titan-ia.com</a>.</p>`,
      '#ef4444'
    ), { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }

  const ahora = new Date();

  // Si es la primera vez que hace clic → iniciar el temporizador
  if (!usuario.password_visto_at) {
    await supabase
      .from('usuarios_especiales_demo02')
      .update({
        password_visto_at: ahora.toISOString(),
        estado: 'activo',
      })
      .eq('correo', correo.toLowerCase().trim());
  }

  // Calcular tiempo restante si ya tenía el timestamp
  const inicioTiempo = usuario.password_visto_at ? new Date(usuario.password_visto_at) : ahora;
  const expiresAt = new Date(inicioTiempo.getTime() + 72 * 60 * 60 * 1000);
  const msRestantes = expiresAt.getTime() - ahora.getTime();
  const horasRestantes = Math.max(0, Math.floor(msRestantes / (1000 * 60 * 60)));
  const minutosRestantes = Math.max(0, Math.floor((msRestantes % (1000 * 60 * 60)) / (1000 * 60)));

  const tiempoTexto = usuario.password_visto_at
    ? `Te quedan aproximadamente <strong>${horasRestantes}h ${minutosRestantes}min</strong> de acceso.`
    : 'Tu período de <strong>72 horas</strong> comienza ahora.';

  const contenido = `
    <div class="password-box">
      <p class="password-label">Tu contraseña de acceso</p>
      <p class="password-value" id="pwd-value">${usuario.password_especial}</p>
    </div>
    <button class="copy-btn" id="copy-btn" onclick="copyPassword()">
      <span id="copy-icon">📋</span>
      <span id="copy-text">Copiar contraseña</span>
    </button>
    <script>
      function copyPassword() {
        var pwd = document.getElementById('pwd-value').innerText;
        navigator.clipboard.writeText(pwd).then(function() {
          var btn = document.getElementById('copy-btn');
          var icon = document.getElementById('copy-icon');
          var text = document.getElementById('copy-text');
          btn.classList.add('copied');
          icon.innerText = '✅';
          text.innerText = '¡Copiada!';
          setTimeout(function() {
            btn.classList.remove('copied');
            icon.innerText = '📋';
            text.innerText = 'Copiar contraseña';
          }, 2000);
        }).catch(function() {
          // Fallback para navegadores que no soportan clipboard API
          var el = document.createElement('textarea');
          el.value = pwd;
          document.body.appendChild(el);
          el.select();
          document.execCommand('copy');
          document.body.removeChild(el);
          document.getElementById('copy-text').innerText = '¡Copiada!';
        });
      }
    </script>
    <div class="timer-box">
      ⏱️ ${tiempoTexto}
    </div>
    <p style="font-size:13px;color:#475569;line-height:1.7;margin:16px 0;">
      Ingresa con <strong>${correo}</strong> y esta contraseña en la plataforma.<br>Selecciona <strong>DEMO 02</strong> al iniciar sesión.
    </p>
    <a href="${BASE_URL}" class="btn">Ir a la Plataforma →</a>
    <p class="footer">Titania Sync · contacto@titan-ia.com</p>
  `;

  return new Response(
    html('🔑', `¡Hola, ${usuario.nombre}!`, 'Aquí está tu contraseña especial de acceso.', contenido),
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
