/* ==========================================================================
   MAIN JS — Bebidas Nutracéuticas | Protocolo de Restauración Metabólica
   Interacciones, animaciones y navegación
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof renderFAQ === 'function') {
    renderFAQ();
  }
  setupMobileMenu();
  setupSmoothScroll();
  setupNavbarScroll();
  console.log('🌿 Protocolo de Restauración Metabólica cargado');
});

/* ===== MOBILE MENU ===== */
function setupMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('hidden') ? openMobileMenu() : closeMobileMenu();
  });
}

function openMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ===== SMOOTH SCROLL ===== */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        if (typeof closeCart === 'function') closeCart();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== NAVBAR SCROLL EFFECT ===== */
function setupNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      nav.classList.add('shadow-md', 'bg-white/95');
      nav.classList.remove('bg-white/85');
    } else {
      nav.classList.remove('shadow-md', 'bg-white/95');
      nav.classList.add('bg-white/85');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== GLOBAL ESCAPE KEY ===== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (typeof closeCart === 'function') closeCart();
    closeMobileMenu();
  }
});
