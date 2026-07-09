/**
 * Script de seed para crear los 2 usuarios de prueba del sistema especial DEMO 02.
 * 
 * USO: node tmp/seed_usuarios_prueba.js
 * 
 * Requiere que el servidor esté corriendo en http://localhost:3000
 * (o ajustar BASE_URL para producción)
 */

const BASE_URL = process.env.APP_URL || 'http://localhost:3000';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'titania-admin-2025';

const usuariosPrueba = [
  { correo: 'nicolas@quantico.cl', nombre: 'Nicolás' },
  { correo: 'rafael@quantico.cl',  nombre: 'Rafael'  },
];

async function crearUsuario(usuario) {
  console.log(`\n📧 Creando usuario: ${usuario.correo}...`);
  
  const res = await fetch(`${BASE_URL}/api/demo02-special/create-user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correo: usuario.correo,
      nombre: usuario.nombre,
      admin_token: ADMIN_TOKEN,
    }),
  });

  const data = await res.json();

  if (res.ok && data.ok) {
    console.log(`   ✅ Creado correctamente`);
    console.log(`   📦 Orden:     #${data.numero_orden}`);
    console.log(`   🔑 Contraseña: ${data.password_especial}`);
    console.log(`   📬 Email enviado a: ${usuario.correo}`);
  } else {
    console.error(`   ❌ Error: ${data.error || 'Respuesta inesperada'}`);
    console.error(`   Status: ${res.status}`);
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  SEED: Usuarios Especiales DEMO 02 — Titania  ');
  console.log('═══════════════════════════════════════════════');
  console.log(`Target: ${BASE_URL}`);
  console.log(`Total usuarios: ${usuariosPrueba.length}`);
  
  for (const usuario of usuariosPrueba) {
    await crearUsuario(usuario);
    // Pequeña pausa entre emails para no saturar el SMTP
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log('\n═══════════════════════════════════════════════');
  console.log('  ✅ Seed completado');
  console.log('═══════════════════════════════════════════════\n');
}

main().catch(console.error);
