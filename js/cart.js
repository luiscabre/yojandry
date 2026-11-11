let cart = [];

// Cargar carrito desde localStorage si existe
try {
  const savedCart = localStorage.getItem('yojandry_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem('yojandry_cart', JSON.stringify(cart));
  } catch (e) {}
}

function openCart() {
  const overlay = document.getElementById('cart-overlay');
  const sidebar = document.getElementById('cart-sidebar');
  if (overlay && sidebar) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    sidebar.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const overlay = document.getElementById('cart-overlay');
  const sidebar = document.getElementById('cart-sidebar');
  if (overlay && sidebar) {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    sidebar.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  updateCartUI();
  openCart();
  showNotification(product.name + ' agregado al carrito');
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartUI();
}

function updateQuantity(index, delta) {
  if (!cart[index]) return;
  const newQty = (cart[index].quantity || 1) + delta;
  if (newQty < 1) {
    removeFromCart(index);
  } else {
    cart[index].quantity = newQty;
    saveCart();
    updateCartUI();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const cartItemsCount = document.getElementById('cart-items-count');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  if (cartCount) {
    if (totalItems > 0) {
      cartCount.textContent = totalItems;
      cartCount.classList.remove('hidden');
    } else {
      cartCount.classList.add('hidden');
    }
  }

  if (cartItemsCount) {
    cartItemsCount.textContent = totalItems + ' producto' + (totalItems !== 1 ? 's' : '');
  }

  if (cart.length === 0) {
    if (cartFooter) cartFooter.classList.add('hidden');
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = `
        <div class="text-center py-16 px-4">
          <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style="background: linear-gradient(135deg, #12826f 0%, #28ceb5 100%);">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <p class="font-serif text-xl mb-2 text-brand-dark">Tu carrito está vacío</p>
          <p class="text-sm text-brand-muted">Explora el protocolo y selecciona las fases o productos que necesitas para iniciar tu transformación.</p>
        </div>
      `;
    }
  } else {
    if (cartFooter) cartFooter.classList.remove('hidden');
    
    let html = '';
    cart.forEach((item, i) => {
      const itemTotal = item.price * (item.quantity || 1);
      html += `
        <div class="flex gap-4 py-4 border-b border-brand-linen">
          <div class="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden bg-brand-linen">
            <img src="${item.image || 'img/products/' + item.id + '.jpg'}" alt="${item.name}" class="w-full h-full object-cover rounded-xl" onerror="this.style.display='none'">
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-start gap-2">
              <div class="min-w-0">
                <h4 class="font-semibold text-brand-dark truncate">${item.name}</h4>
                <p class="text-xs text-brand-muted">${item.category} • ${item.servings || '28 sobres'}</p>
              </div>
              <button onclick="removeFromCart(${i})" class="p-1 text-brand-muted hover:text-red-500 transition-colors" title="Eliminar">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="flex justify-between items-center mt-3">
              <div class="flex items-center gap-2">
                <button onclick="updateQuantity(${i}, -1)" class="w-7 h-7 flex items-center justify-center rounded-full bg-brand-linen hover:bg-brand-taupe/20 text-brand-dark transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="w-6 text-center font-semibold text-sm">${item.quantity || 1}</span>
                <button onclick="updateQuantity(${i}, 1)" class="w-7 h-7 flex items-center justify-center rounded-full bg-brand-linen hover:bg-brand-taupe/20 text-brand-dark transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
              <p class="font-semibold text-brand-dark">${formatPrice(itemTotal)}</p>
            </div>
          </div>
        </div>
      `;
    });
    if (cartItemsContainer) cartItemsContainer.innerHTML = html;
  }

  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  if (cartSubtotal) cartSubtotal.textContent = formatPrice(total);
  if (cartTotal) cartTotal.textContent = formatPrice(total);
}

function sendCartToWhatsApp() {
  if (cart.length === 0) return;
  const phoneNumber = '573143096984';
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const divider = '--------------------------------------------------';

  let msg = `*SOLICITUD DE PEDIDO — PROTOCOLO METABÓLICO*\n`;
  msg += `${divider}\n`;
  msg += `📦 *PRODUCTOS SELECCIONADOS*\n\n`;

  cart.forEach((item, idx) => {
    const subtotal = item.price * (item.quantity || 1);
    msg += `${idx + 1}. *${item.name}* (${item.servings || '28 sobres'})\n`;
    msg += `   • Cantidad : ${item.quantity || 1} unidad(es)\n`;
    msg += `   • Valor c/u: ${formatPrice(item.price)}\n`;
    msg += `   • Subtotal : ${formatPrice(subtotal)}\n\n`;
  });

  msg += `${divider}\n`;
  msg += `💰 *RESUMEN DE PAGO*\n`;
  msg += `• Total unidades: ${totalItems} caja(s)\n`;
  msg += `• Total a pagar : *${formatPrice(total)} COP*\n`;
  msg += `${divider}\n`;
  msg += `🚚 *Despacho:* Envío nacional asegurado a domicilio\n`;
  msg += `💬 Hola Yojandry, deseo confirmar la compra de estos productos. ¿Podrías indicarme los pasos para el pago y el despacho?`;

  window.open('https://wa.me/' + phoneNumber + '?text=' + encodeURIComponent(msg), '_blank');
}

function showNotification(message) {
  let n = document.getElementById('cart-notification');
  if (!n) {
    n = document.createElement('div');
    n.id = 'cart-notification';
    n.style.cssText = 'position:fixed;bottom:6rem;right:1.5rem;background:linear-gradient(135deg,#12826f,#28ceb5);color:white;padding:0.85rem 1.75rem;border-radius:9999px;box-shadow:0 10px 30px rgba(18,130,111,0.35);transform:translateY(100%);opacity:0;transition:all 0.35s cubic-bezier(0.16,1,0.3,1);z-index:90;font-weight:600;font-size:0.9rem;display:flex;align-items:center;gap:0.5rem;';
    document.body.appendChild(n);
  }
  n.innerHTML = '<span>🌿</span> ' + message;
  setTimeout(() => { 
    n.style.transform = 'translateY(0)'; 
    n.style.opacity = '1'; 
  }, 10);
  setTimeout(() => { 
    n.style.transform = 'translateY(100%)'; 
    n.style.opacity = '0'; 
  }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
});
