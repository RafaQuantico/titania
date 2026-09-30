const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkUsers() {
  console.log("=== USUARIOS ESPECIALES ===");
  const { data: especiales, error: err1 } = await supabase
    .from('usuarios_especiales_demo02')
    .select('nombre, correo, estado, password_visto_at')
    .order('created_at', { ascending: false });

  if (err1) {
    console.error("Error consultando especiales:", err1);
  } else {
    console.table(especiales);
  }

  console.log("\n=== REGISTROS DE INGRESO (usuarios_demo) ===");
  const { data: ingresos, error: err2 } = await supabase
    .from('usuarios_demo')
    .select('nombre, correo, estado, ultimo_ingreso')
    .in('correo', especiales.map(u => u.correo));

  if (err2) {
    console.error("Error consultando ingresos:", err2);
  } else {
    console.table(ingresos);
  }
}

checkUsers();
