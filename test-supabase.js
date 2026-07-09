const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function test() {
  console.log("Testing Supabase...");
  const { data, error } = await supabase.from('usuarios_demo').select('*').limit(5);
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
