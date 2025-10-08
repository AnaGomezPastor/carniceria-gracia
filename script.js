// ==================== CÀRREGA DE PECES D'ANIMALS =========================
let peces = [];
let pecesVisibles = [];
let mostrantTotes = false;
const MAX_VISIBLES = 8; // nombre inicial de peces visibles
let animalActiu = null;

// Mostrar targetes de peces
function mostrarPeces(filtrades) {
  const container = document.getElementById("productoContainer");
  if (!container) return;
  container.innerHTML = "";

  pecesVisibles = mostrantTotes ? filtrades : filtrades.slice(0, MAX_VISIBLES);

  pecesVisibles.forEach((p) => {
    container.innerHTML += `
    <div class="group bg-white rounded shadow transition transform hover:scale-[1.02] col-span-1 flex flex-col overflow-hidden">
  <!-- Imagen -->
  <div class="w-full h-60 bg-gray-100">
    <img
      src="${p.imatge}"
      alt="${p.nom}"
      class="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  <!-- Contenido -->
  <div class="p-4 flex flex-col justify-between flex-1">
    <div class="flex items-center justify-between mb-1">
      <h4 class="font-semibold text-lg text-gray-900">${p.nom}</h4>
    </div>

    <p class="text-sm text-gray-600 mb-2 leading-relaxed">${p.descripcio}</p>

    <button
      onclick="obrirDetall('${p.nom}', '${p.receptes}')"
      class="underline text-red-800 self-start hover:text-gray-700 transition"
    >
      Ús culinari
    </button>
  </div>
</div>


      `;
  });

  // Mostrar o amagar botó de toggle
  const toggleBtn = document.getElementById("toggleBtn");
  if (filtrades.length > MAX_VISIBLES) {
    toggleBtn.classList.remove("hidden");
    toggleBtn.textContent = mostrantTotes ? "Mostrar menys" : "Mostrar més";
  } else {
    toggleBtn.classList.add("hidden");
  }
}

// Filtrar per producte
function filtrar(producte) {
  producteActiu = producte;
  mostrantTotes = false;
  const filtrades = peces.filter((p) => p.producte === producte);
  mostrarPeces(filtrades);
}

// Generar botons dinàmics de filtres
function generarFiltres() {
  const filtrosContainer = document.getElementById("filtrosContainer");
  const categories = [...new Set(peces.map((p) => p.producte))];

  categories.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.setAttribute("data-filtro", cat);
    btn.className =
      "categoria-btn px-4 py-1 rounded-full border text-red-800 hover:bg-red-100 hover:text-red-800 transition";

    // Primer botó actiu per defecte
    if (i === 0) {
      btn.classList.add("bg-red-800", "text-white");
      btn.classList.remove("hover:bg-red-100", "hover:text-red-800");
      filtrar(cat);
    }

    btn.addEventListener("click", () => {
      document.querySelectorAll(".categoria-btn").forEach((b) => {
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

// BOTÓ DE MOSTRAR MÉS / MENYS
function toggleMostrar() {
  mostrantTotes = !mostrantTotes;
  if (!producteActiu) return;
  const filtrades = peces.filter((p) => p.producte === producteActiu);
  mostrarPeces(filtrades);

  // Scroll suau fins al contenidor després de mostrar menys
  if (!mostrantTotes) {
    document
      .getElementById("productoContainer")
      .scrollIntoView({ behavior: "smooth" });
  }
}

// MODAL DE DETALL
function obrirDetall(nom, recepta) {
  const modal = document.getElementById("modalReceta");
  const titulo = document.getElementById("recetaTitulo");
  const contenido = document.getElementById("recetaContenido");

  titulo.textContent = nom;
  contenido.innerHTML = `<p>${recepta}</> `;

  modal.classList.remove("hidden");
}

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalReceta").classList.add("hidden");
});

// CÀRREGA GENERAL
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/productos.json")
    .then((res) => res.json())
    .then((data) => {
      peces = data.productes.flatMap((a) =>
        a.informacio.map((p) => ({
          ...p,
          producte: a.producte,
        }))
      );
      generarFiltres();
      activarAnimacionProductos();
    });

  // Botó de mostrar més
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "toggleBtn";
  toggleBtn.className =
    "hidden text-red-800 px-4 py-2 underline mt-6 mx-auto block hover:text-gray-700 transition";
  document.querySelector("#productos .max-w-7xl").appendChild(toggleBtn);
  toggleBtn.addEventListener("click", toggleMostrar);
});
