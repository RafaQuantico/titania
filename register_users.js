const users = [
  { nombre: "Cristhian Angueta", correo: "angueta@finanzas.gob.ec" },
  { nombre: "Betzy Quijia", correo: "bquijia@finanzas.gob.ec" },
  { nombre: "Daniel Alejandro Díaz Luna", correo: "dadiaz@finanzas.gob.ec" },
  { nombre: "Diego Ayala", correo: "diayala@finanzas.gob.ec" },
  { nombre: "Cristian Villota", correo: "cvillota@finanzas.gob.ec" },
  { nombre: "Jean Karlo Espinosa", correo: "jeespinosa@finanzas.gob.ec" },
  { nombre: "Alex Velasco", correo: "avelasco@finanzas.gob.ec" },
  { nombre: "Cristina Alvaro", correo: "galvaro@finanzas.gob.ec" },
  { nombre: "Pablo Noboa", correo: "pnoboa@finanzas.gob.ec" },
  { nombre: "Alvaro Galarza", correo: "agalarza@finanzas.gob.ec" },
  { nombre: "Omar Quezada", correo: "oquezada@finanzas.gob.ec" },
  { nombre: "Gabriela Garces", correo: "ggarces@finanzas.gob.ec" },
  { nombre: "Sebastián Sotomayor", correo: "ssotomayor@finanzas.gob.ec" },
  { nombre: "Jenny Chuquimarca", correo: "jchuquimarca@finanzas.gob.ec" },
  { nombre: "Nicolás Fernández", correo: "contacto@quantico.cl" },
  { nombre: "Rafael Merino", correo: "rafael@quantico.cl" }
];

async function registerAll() {
  for (const user of users) {
    try {
      console.log(`Registrando a ${user.nombre} (${user.correo})...`);
      const res = await fetch("https://sync.titan-ia.com/api/demo02-special/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: user.nombre,
          correo: user.correo,
          admin_token: "titania-admin-2025"
        })
      });
      const data = await res.json();
      console.log(`Respuesta:`, data);
      
      // Esperar 2 segundos entre cada envío para no saturar el servidor SMTP
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err) {
      console.error(`Error con ${user.correo}:`, err);
    }
  }
}

registerAll();
