// ====== MENÚ MÓVIL ======
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Cerrar menú al hacer clic en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});


// ====== SCROLL SUAVE + EFECTO EN EL BOTÓN "VEURE PRODUCTES" ======
document.querySelectorAll('a[href^="#productos"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector('#productos');
    target.scrollIntoView({ behavior: 'smooth' });

    // Pequeño rebote visual
    setTimeout(() => {
      target.classList.add('scale-105');
      setTimeout(() => target.classList.remove('scale-105'), 300);
    }, 700);
  });
});


// ====== ANIMACIÓN DE PRODUCTOS AL SCROLLEAR ======
function activarAnimacionProductos() {
  const productos = document.querySelectorAll('#productoContainer > div');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  productos.forEach(p => {
    p.classList.add('opacity-0', 'translate-y-6', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(p);
  });
}

// Llamar la función inicialmente
activarAnimacionProductos();


// ====== SI CARGAS PRODUCTOS DINÁMICAMENTE ======
// Llama a activarAnimacionProductos() justo después de insertarlos en el DOM
// Ejemplo:
// fetch('productos.json')
//   .then(res => res.json())
//   .then(data => {
//     renderProductos(data);
//     activarAnimacionProductos(); // <- aquí
//   });


// ====== HEADER FIJO ======
// El header ya es fixed en el HTML, pero puedes añadir un efecto al hacer scroll
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('shadow-lg', 'bg-white/95', 'backdrop-blur-md');
  } else {
    header.classList.remove('shadow-lg', 'bg-white/95', 'backdrop-blur-md');
  }
});
