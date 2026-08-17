let currentCurrency = localStorage.getItem('currency') || 'PEN';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('currencyLabel') && (document.getElementById('currencyLabel').innerText = currentCurrency);
  renderTienda();
  updateCart();
  updateCartFull();
});

// CAMBIAR MONEDA
document.getElementById('currencyBtn')?.addEventListener('click', () => {
  const keys = Object.keys(monedas);
  let i = keys.indexOf(currentCurrency);
  currentCurrency = keys[(i+1)%keys.length];
  localStorage.setItem('currency', currentCurrency);
  document.getElementById('currencyLabel').innerText = currentCurrency;
  renderTienda(); updateCart(); updateCartFull();
});

// TEMA
document.getElementById('themeBtn')?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// TIENDA
function renderTienda(){
  const tienda = document.getElementById('tienda');
  if(!tienda) return;
  tienda.innerHTML = '';
  const categorias = [...new Set(productos.map(p => p.cat))];
  categorias.forEach((cat, i) => {
    const title = document.createElement('h3');
    title.textContent = cat;
    title.style.gridColumn = '1/-1';
    title.style.animationDelay = `${i*0.1}s`;
    tienda.appendChild(title);

    productos.filter(p => p.cat === cat).forEach((p, j) => {
      const precio = (p.prices[currentCurrency] * monedas[currentCurrency].rate).toFixed(2);
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${(i+j)*0.05}s`;
      card.innerHTML = `
        <img src="https://placehold.co/300x160/FFD93D/2F2F2F?text=${encodeURIComponent(p.name)}">
        <h4>${p.name}</h4>
        <p class="precio">${monedas[currentCurrency].symbol}${precio}</p>
        <p style="font-size:12px; opacity:.7">Recargas: mañanas y noches</p>
        <button class="btn" onclick='addToCart("${p.name}", ${p.prices[currentCurrency]})'>Agregar 🛒</button>
      `;
      tienda.appendChild(card);
    });
  });
}

// CARRITO
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  alert(`${name} agregado al carrito 😼`);
}
function updateCart(){
  document.getElementById('cartCount') && (document.getElementById('cartCount').innerText = cart.length);
  const items = document.getElementById('cartItems');
  if(!items) return;
  items.innerHTML = '';
  let total = 0;
  cart.forEach((i, idx) => {
    total += i.price;
    items.innerHTML += `<div style="display:flex; justify-content:space-between; margin:.5rem 0">
      ${i.name} - ${monedas[currentCurrency].symbol}${(i.price * monedas[currentCurrency].rate).toFixed(2)}
      <button onclick="removeItem(${idx})">x</button></div>`;
  });
  document.getElementById('cartTotal').innerText = monedas[currentCurrency].symbol + (total * monedas[currentCurrency].rate).toFixed(2);
}
function updateCartFull(){
  const items = document.getElementById('cartItemsFull');
  if(!items) return;
  items.innerHTML = '';
  let total = 0;
  if(cart.length === 0) items.innerHTML = '<p>Tu carrito está vacío 😿</p>';
  cart.forEach((i, idx) => {
    total += i.price;
    items.innerHTML += `<div class="card" style="margin-bottom:1rem; display:flex; justify-content:space-between">
      <span>${i.name}</span>
      <span>${monedas[currentCurrency].symbol}${(i.price * monedas[currentCurrency].rate).toFixed(2)}
      <button onclick="removeItem(${idx})">x</button></span></div>`;
  });
  document.getElementById('cartTotalFull').innerText = monedas[currentCurrency].symbol + (total * monedas[currentCurrency].rate).toFixed(2);
}
function removeItem(idx){
  cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart(); updateCartFull();
}

// WHATSAPP
document.getElementById('whatsappBtn')?.addEventListener('click', sendWhatsApp);
document.getElementById('whatsappBtnFull')?.addEventListener('click', sendWhatsApp);

function sendWhatsApp(){
  if(cart.length === 0) return alert('Carrito vacío');
  let msg = 'Hola Luu! Quiero pedir:%0A';
  let total = 0;
  cart.forEach(i => {
    total += i.price;
    msg += `- ${i.name}%0A`;
  });
  msg += `%0ATotal: ${monedas[currentCurrency].symbol}${(total * monedas[currentCurrency].rate).toFixed(2)}`;
  window.open(`https://wa.me/51920726588?text=${msg}`);
  cart = []; localStorage.setItem('cart', '[]');
  updateCart(); updateCartFull();
}