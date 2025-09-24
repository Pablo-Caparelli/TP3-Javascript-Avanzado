function print(msg) {
  console.log(msg);
  const output = document.getElementById("output");
  output.innerHTML += msg + "\n";
}

//1- Definir la clase
class Tarea {
  constructor(id, titulo, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

class GestorTareas {
  constructor() {
    this.tareas = [];
    this.ultimoId = 0;
  }

  agregarTarea(titulo) {
    this.ultimoId++;
    const nuevaTarea = new Tarea(this.ultimoId, titulo);
    this.tareas.push(nuevaTarea);
  }

  listarTareas() {
    print("📋 Lista de tareas:");
    console.log("📋 Lista de tareas:");
    this.tareas.forEach((t) =>
      console.log(`ID: ${t.id} | ${t.titulo} | Completada: ${t.completada}`)
    );
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(
      (t) => t.titulo.toLowerCase() === titulo.toLowerCase()
    );
  }

  listarCompletadas() {
    return this.tareas.filter((t) => t.completada);
  }
}

//2- Simulación asíncrona
function cargarTareas() {
  return new Promise((resolve) => {
    print("⏳ Cargando tareas...");
    console.log("⏳ Cargando tareas...");
    setTimeout(() => {
      resolve([
        new Tarea(1, "Comprar pan y  facturas", true),
        new Tarea(2, "Estudiar JavaScript", true),
        new Tarea(3, "Ir al gimnasio", true),
      ]);
    }, 2000);
  });
}

function cargarUsuarios() {
  return new Promise((resolve) => {
    print("⏳ Cargando usuarios...");
    console.log("⏳ Cargando usuarios...");
    setTimeout(() => {
      resolve(["Ana", "Juan", "Pablo"]);
    }, 1500);
  });
}

//3- Flujo del programa
async function main() {
  const gestor = new GestorTareas();

  // Carga inicial
  gestor.tareas = await cargarTareas();
  gestor.ultimoId = gestor.tareas.length;
  print("👍 Tareas cargadas correctamente🆗");
  console.log("👍 Tareas cargadas correctamente🆗");
  gestor.listarTareas();

  // Agregar nueva tarea
  gestor.agregarTarea("Aprender async/await");
  gestor.agregarTarea("Ir a correr");
  gestor.agregarTarea("Entregar el TP de JavasCript");

  print("\n📌 Nuevas tareas agregadas:");
  console.log("\n📌 Nuevas tareas agregadas:");

  const nuevas = gestor.tareas.slice(-3);
  nuevas.map((t) => {
    const mensaje = `ID: ${t.id} | ${t.titulo} | Completada: ${t.completada}`;
    print(mensaje);
    console.log(mensaje);
  });

  //print(nuevas);
  //console.log(nuevas);

  // Filtrar completadas
  const completadas = gestor.listarCompletadas();
  print("\n👍 Tareas completadas: 🆗");
  console.log("\n👍 Tareas completadas: 🆗");
  completadas.forEach((t) => console.log(`✔️ ${t.titulo}`));

  //print(completadas);
  //console.log(completadas);

  // Extra: map de títulos
  const titulos = gestor.tareas.map((t) => t.titulo);
  console.log("\n📝 Solo títulos:", titulos);

  //4- Extra: Promise.all
  const [tareas, usuarios] = await Promise.all([
    cargarTareas(),
    cargarUsuarios(),
  ]);
  print("\n Promise.all resultado:");
  print("Tareas iniciales: " + tareas.map((t) => t.titulo).join(", "));
  print("Usuarios cargados: " + usuarios.join(", "));
  console.log("\n Promise.all resultado:");
  console.log(
    "Tareas iniciales:",
    tareas.map((t) => t.titulo)
  );

  console.log("Usuarios cargados:", usuarios);

  //con el método toggleEstado y la posición 3, 4 y 5
  //cambio de false a true
  gestor.tareas[3].toggleEstado();
  gestor.tareas[4].toggleEstado();
  gestor.tareas[5].toggleEstado();

  print("\n Lista final de tareas: ");
  for (let i = 0; i <= 6; i++) {
    const t = gestor.tareas[i];
    if (t) {
      // para evitar error si no existe
      const mensaje = `ID: ${t.id} | ${t.titulo} | Completada: ${t.completada}`;
      print(mensaje);
      console.log(mensaje);
    }
  }
  gestor.listarTareas();
}

//5- Ejecutar
print("🖐️ Hola! Comencemos...");
console.log("🖐️ Hola! Comencemos...");
main();
