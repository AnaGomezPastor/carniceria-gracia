let productos = [];

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
        <span class="inline-block text-xs px-2 py-1 rounded bg-gray-100 ${p.etiqueta === 'Ecológico'
                ? 'text-green-700 bg-green-100'
                : p.etiqueta === 'Premium'
                    ? 'text-red-700 bg-red-100'
                    : 'text-yellow-800 bg-yellow-100'
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
    fetch("productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        });

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    const botones = document.querySelectorAll(".categoria-btn");
    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            botones.forEach(b => b.classList.remove("bg-red-800", "text-white"));
            botones.forEach(b => b.classList.add("hover:bg-red-100", "hover:text-red-800"));

            btn.classList.add("bg-red-800", "text-white");
            btn.classList.remove("hover:bg-red-100", "hover:text-red-800");

            filtrar(btn.getAttribute("data-filtro"));
        });
    });
});
