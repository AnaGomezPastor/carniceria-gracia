// ==================== CARGA DE PRODUCTOS =========================
let productos = [];
let recetas = {};

// Mostrar tarjetas de productos
function mostrarProductos(filtrados) {
  const container = document.getElementById("productoContainer");
  if (!container) return;
  container.innerHTML = "";
  filtrados.forEach(p => {
    // Tarjeta de producto con botón oculto
    container.innerHTML += `
      <div class="relative group bg-white p-4 rounded shadow">
        <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-32 object-contain mb-4" />
        <h4 class="font-semibold text-lg mb-1">${p.nombre}</h4>
        <p class="text-sm mb-2">${p.descripcion}</p>
        <span class="inline-block text-xs px-2 py-1 rounded bg-gray-100 ${p.etiqueta === 'Ecològic'
        ? 'text-green-700 bg-green-100'
        : p.etiqueta === 'Carns'
          ? 'text-red-700 bg-red-100'
          : 'text-yellow-800 bg-yellow-100'
      }">${p.etiqueta}</span>

        <button onclick="abrirReceta('${p.nombre}')" 
          class="bg-red-800 text-white rounded p-1">
          Ver recetas
        </button>
      </div>
    `;
  });
}

// Filtro por categoría
function filtrar(categoria) {
  if (categoria === "Todos") return mostrarProductos(productos);
  const filtrados = productos.filter(p => p.categoria === categoria);
  mostrarProductos(filtrados);
}

// Generar botones dinámicos de filtros
function generarFiltros() {
  const filtrosContainer = document.getElementById("filtrosContainer");
  const categorias = [...new Set(productos.map(p => p.categoria))];
  const todas = ["Todos", ...categorias];
 
  todas.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.setAttribute("data-filtro", cat);
    btn.className = "categoria-btn px-4 py-1 rounded-full border text-red-800 hover:bg-red-100 hover:text-red-800 transition";

    // botón por defecto activo = Todos
    if (i === 0) {
      btn.classList.add("bg-red-800", "text-white");
      btn.classList.remove("hover:bg-red-100", "hover:text-red-800");
    }

    btn.addEventListener("click", () => {
      document.querySelectorAll(".categoria-btn").forEach(b => {
        b.classList.remove("bg-red-800", "text-white");
        b.classList.add("hover:bg-red-100", "hover:text-red-800");
      });
      btn.classList.add("bg-red-800", "text-white");
      btn.classList.remove("hover:bg-red-100", "hover:text-red-800");

      filtrar(cat);
    });

    filtrosContainer.appendChild(btn);
  });
}

// ====================== MODAL DE RECETAS ==========================
function abrirReceta(nombreProducto) {
  const modal = document.getElementById("modalReceta");
  const titulo = document.getElementById("recetaTitulo");
  const contenido = document.getElementById("recetaContenido");

  const lista = recetas[nombreProducto];
  if (!lista) {
    titulo.textContent = "Próximamente";
    contenido.innerHTML = "<p>No hay recetas asociadas todavía.</p>";
  } else {
    titulo.textContent = `Recetas con ${nombreProducto}`;
    contenido.innerHTML = "";
    lista.forEach(r => {
      contenido.innerHTML += `
        <div>
          <h4 class="font-semibold text-red-700 mb-1">${r.titulo}</h4>
          <p><strong>Ingredientes:</strong> ${r.ingredientes.join(", ")}</p>
          <p><strong>Paso a paso:</strong> ${r.pasos.join(" → ")}</p>
        </div>
      `;
    });
  }
  modal.classList.remove("hidden");
}

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalReceta").classList.add("hidden");
});

// ============== CARGA GENERAL AL INICIAR LA PÁGINA ================

document.addEventListener("DOMContentLoaded", () => { 
  // Productos
  fetch("data/productos.json")
    .then(res => res.json())
    .then(data => {
      productos = data;
      generarFiltros();
      mostrarProductos(productos);
    });

  // Recetas
  fetch("data/recetas.json")
    .then(r => r.json())
    .then(data => recetas = data);

  // Menu mobile
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
