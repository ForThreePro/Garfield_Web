const monedas = {
  PEN: {symbol: 'S/', rate: 1}, USD: {symbol: '$', rate: 0.267}, CLP: {symbol: '$', rate: 250},
  ARS: {symbol: '$', rate: 400}, MXN: {symbol: '$', rate: 5}, BOB: {symbol: '$', rate: 3},
  UYU: {symbol: '$', rate: 10}, COP: {symbol: '$', rate: 1000}
};
let currentCurrency = localStorage.getItem('currency') || 'PEN';

const productos = [
  // DIAMANTES CON STOCK
  {cat: 'Diamantes Con Stock', name: '110💎', prices: {PEN:2.50, CLP:875, ARS:1300, MXN:18.75, BOB:11.25, UYU:37.5, USD:0.67, COP:250}},
  {cat: 'Diamantes Con Stock', name: '341💎', prices: {PEN:7.00, CLP:2450, ARS:3380, MXN:52.50, BOB:31.5, UYU:105, USD:1.87, COP:700}},
  {cat: 'Diamantes Con Stock', name: '572💎', prices: {PEN:12.00, CLP:4200, ARS:5720, MXN:90, BOB:54, UYU:180, USD:3.20, COP:1200}},
  {cat: 'Diamantes Con Stock', name: '1166💎', prices: {PEN:20.00, CLP:7000, ARS:9880, MXN:150, BOB:90, UYU:300, USD:5.34, COP:2000}},
  {cat: 'Diamantes Con Stock', name: '2398💎', prices: {PEN:36.00, CLP:12600, ARS:18200, MXN:270, BOB:162, UYU:540, USD:9.61, COP:3600}},
  {cat: 'Diamantes Con Stock', name: '6160💎', prices: {PEN:92.00, CLP:32200, ARS:46800, MXN:690, BOB:414, UYU:1380, USD:24.56, COP:9200}},

  // DIAMANTES SIN STOCK
  {cat: 'Diamantes Sin Stock', name: '110💎', prices: {PEN:3.50, CLP:1225, ARS:1820, MXN:26.25, BOB:15.75, UYU:52.5, USD:0.93, COP:350}},
  {cat: 'Diamantes Sin Stock', name: '341💎', prices: {PEN:10.00, CLP:3500, ARS:4680, MXN:75, BOB:45, UYU:150, USD:2.67, COP:1000}},
  {cat: 'Diamantes Sin Stock', name: '572💎', prices: {PEN:15.00, CLP:5250, ARS:7800, MXN:112.5, BOB:67.5, UYU:225, USD:4.00, COP:1500}},
  {cat: 'Diamantes Sin Stock', name: '1166💎', prices: {PEN:26.00, CLP:9100, ARS:13520, MXN:195, BOB:117, UYU:390, USD:6.94, COP:2600}},
  {cat: 'Diamantes Sin Stock', name: '2398💎', prices: {PEN:52.00, CLP:18200, ARS:27040, MXN:390, BOB:234, UYU:780, USD:13.88, COP:5200}},
  {cat: 'Diamantes Sin Stock', name: '6160💎', prices: {PEN:126.00, CLP:44100, ARS:65520, MXN:945, BOB:567, UYU:1890, USD:33.64, COP:12600}},

  // DESIGN
  {cat: 'Design', name: 'Tex Logo y Logos', prices: {PEN:3, CLP:1050, ARS:1560, MXN:22.5, BOB:13.5, UYU:22.5, USD:0.8, COP:4500}},
  {cat: 'Design', name: 'Plantillas 2x1', prices: {PEN:4, CLP:1050, ARS:1560, MXN:22.5, BOB:13.5, UYU:22.5, USD:1.07, COP:4500}},
  {cat: 'Design', name: 'Caligráficos 2x1', prices: {PEN:3, CLP:1050, ARS:1560, MXN:22.5, BOB:13.5, UYU:22.5, USD:0.8, COP:4500}},
  {cat: 'Design', name: 'Jersey', prices: {PEN:5, CLP:1750, ARS:2600, MXN:37.5, BOB:22.5, UYU:75, USD:1.34, COP:7500}},

  // COMBO DECANA
  {cat: 'Combo Decana', name: 'Contrato Semanal', prices: {PEN:15, CLP:5000, ARS:7000, MXN:114, BOB:55.5, UYU:210, USD:4.00, COP:1500}},

  // SPAM
  {cat: 'Spam', name: '3 dias', prices: {PEN:5.50, CLP:1750, ARS:2600, MXN:37.5, BOB:22.5, UYU:75, USD:1.47, COP:5500}},
  {cat: 'Spam', name: '5 dias', prices: {PEN:7.50, CLP:2450, ARS:3640, MXN:52.5, BOB:31.5, UYU:105, USD:2.00, COP:7500}},
  {cat: 'Spam', name: '1 semana', prices: {PEN:9.50, CLP:3150, ARS:4680, MXN:67.5, BOB:40.5, UYU:135, USD:2.54, COP:9500}},

  // SEGUIDORES IG
  {cat: 'Seguidores IG', name: '250 Seguidores', prices: {PEN:1.50, CLP:525, ARS:520, MXN:11.25, BOB:6.75, UYU:22.5, USD:0.40, COP:1500}},
  {cat: 'Seguidores IG', name: '500 Seguidores', prices: {PEN:2.50, CLP:875, ARS:1040, MXN:18.75, BOB:11.25, UYU:37.5, USD:0.67, COP:2500}},
  {cat: 'Seguidores IG', name: '1000 Seguidores', prices: {PEN:5, CLP:1750, ARS:2080, MXN:37.5, BOB:22.5, UYU:75, USD:1.34, COP:5000}},
  {cat: 'Seguidores IG', name: '2000 Seguidores', prices: {PEN:10, CLP:3500, ARS:4680, MXN:75, BOB:45, UYU:150, USD:2.67, COP:10000}},
  {cat: 'Seguidores IG', name: '5000 Seguidores', prices: {PEN:20, CLP:7000, ARS:9360, MXN:150, BOB:90, UYU:300, USD:5.34, COP:20000}}
];

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