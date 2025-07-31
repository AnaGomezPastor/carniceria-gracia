// script.js

const productos = [
    {
        nombre: "Entrecot Ecológico",
        descripcion: "Corte premium de ternera ecológica criada en libertad en los Pirineos catalanes.",
        categoria: "Ecológico",
        imagen: "/img/entrecot.png",
        etiqueta: "Ecológico"
    },
    {
        nombre: "Hamburguesa de Buey",
        descripcion: "Elaborada con carne 100% de buey madurada y especias seleccionadas.",
        categoria: "Hamburguesas",
        imagen: "/img/buey.png",
        etiqueta: "Premium"
    },
    {
        nombre: "Fuet Artesanal",
        descripcion: "Embutido catalán tradicional elaborado con las mejores carnes.",
        categoria: "Embutidos",
        imagen: "/img/fuet.png",
        etiqueta: "Tradicional"
    },
    {
        nombre: "Pollo Ecológico Entero",
        descripcion: "Pollo criado en libertad, alimentado con cereales ecológicos y sin antibióticos.",
        categoria: "Ecológico",
        imagen: "/img/pollo.png",
        etiqueta: "Ecológico"
    },
    {
        nombre: "Hamburguesa de Cordero",
        descripcion: "Con carne de cordero del Pirineo, menta fresca y especias árabes.",
        categoria: "Hamburguesas",
        imagen: "/img/cordero.png",
        etiqueta: "Premium"
    },
    {
        nombre: "Butifarra Blanca",
        descripcion: "Elaborada siguiendo la receta tradicional catalana.",
        categoria: "Embutidos",
        imagen: "/img/butifarra.png",
        etiqueta: "Tradicional"
    },
];

function mostrarProductos(filtrados) {
    const container = document.getElementById("productoContainer");
    if (!container) return;
    container.innerHTML = "";
    filtrados.forEach(p => {
        container.innerHTML += `
        <div class="bg-white p-4 rounded shadow">
          <img src="${p.imagen}" alt="${p.nombre}" class="w-full h-32 object-contain mb-4">
          <h4 class="font-semibold text-lg mb-1">${p.nombre}</h4>
          <p class="text-sm mb-2">${p.descripcion}</p>
          <span class="inline-block text-xs px-2 py-1 rounded bg-gray-100 ${p.etiqueta === 'Ecológico' ? 'text-green-700 bg-green-100' :
                p.etiqueta === 'Premium' ? 'text-red-700 bg-red-100' :
                    'text-yellow-800 bg-yellow-100'
            }">
            ${p.etiqueta}
          </span>
        </div>`;
    });
}

function filtrar(categoria) {
    if (categoria === "Todos") return mostrarProductos(productos);
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(productos);

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }
});

// Añadir evento de filtrado a los botones
const botones = document.querySelectorAll(".categoria-btn");
botones.forEach(btn => {
  btn.addEventListener("click", () => {
    botones.forEach(b => b.classList.remove("activa"));
    btn.classList.add("activa");
    filtrar(btn.getAttribute("data-filtro"));
  });
});
