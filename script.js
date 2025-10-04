// ==================== CÀRREGA DE PECES D'ANIMALS =========================
let peces = [];

// Mostrar targetes de peces
function mostrarPeces(filtrades) {
  const container = document.getElementById("productoContainer");
  if (!container) return;
  container.innerHTML = "";

  filtrades.forEach(p => {
    container.innerHTML += `
      <div class="relative group bg-white p-4 rounded shadow flex flex-row items-start gap-4 lg:flex-col">
        <!-- Imatge -->
        <div class="w-1/3 lg:w-full">
          <img src="${p.imatge}" alt="${p.nom}" class="w-full h-full object-contain lg:h-32" />
        </div>

        <!-- Contingut -->
        <div class="w-2/3 lg:w-full flex flex-col justify-between">
          <!-- Nom + etiqueta -->
          <div class="flex items-center justify-between mb-1">
            <h4 class="font-semibold text-lg">${p.nom}</h4>
            <span class="inline-block text-xs px-2 py-1 rounded bg-gray-100 ml-2">${p.animal}</span>
          </div>

          <p class="text-sm text-gray-600 mb-2">${p.part_animal}</p>
          <button onclick="obrirDetall('${p.nom}', '${p.receptes.replace(/'/g, '\\\'')}')" class="bg-red-800 text-white rounded p-1 self-start">
            Veure ús culinari
          </button>
        </div>
      </div>
    `;
  });
}

// Filtrar per animal
function filtrar(animal) {
  const filtrades = peces.filter(p => p.animal === animal);
  mostrarPeces(filtrades);
}

// Generar botons dinàmics de filtres (sense "Tots")
function generarFiltres() {
  const filtrosContainer = document.getElementById("filtrosContainer");
  const categories = [...new Set(peces.map(p => p.animal))];

  categories.forEach((cat, i) => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.setAttribute("data-filtro", cat);
    btn.className = "categoria-btn px-4 py-1 rounded-full border text-red-800 hover:bg-red-100 hover:text-red-800 transition";

    // Primer botó actiu per defecte
    if (i === 0) {
      btn.classList.add("bg-red-800", "text-white");
      btn.classList.remove("hover:bg-red-100", "hover:text-red-800");
      filtrar(cat); // Mostrem directament el primer animal
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

// MODAL DE DETALL
function obrirDetall(nom, recepta) {
  const modal = document.getElementById("modalReceta");
  const titulo = document.getElementById("recetaTitulo");
  const contenido = document.getElementById("recetaContenido");

  titulo.textContent = nom;
  contenido.innerHTML = `<p>${recepta}</p>`;

  modal.classList.remove("hidden");
}

document.getElementById("cerrarModal").addEventListener("click", () => {
  document.getElementById("modalReceta").classList.add("hidden");
});

// CÀRREGA GENERAL
document.addEventListener("DOMContentLoaded", () => {
  fetch("data/productos.json")
    .then(res => res.json())
    .then(data => {
      // Aplanem totes les parts dins d’un únic array
      peces = data.animals.flatMap(a =>
        a.parts.map(p => ({
          ...p,
          animal: a.animal // afegim el nom de l’animal a cada peça
        }))
      );
      generarFiltres();
    });

  // Menú mòbil
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
});
