let currentCurrency = localStorage.getItem('currency') || 'PEN';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCat = 'Todos';

document.addEventListener('DOMContentLoaded', () => {
  renderCurrencyBtns(); renderCategories(); renderProductos(); updateCartCount(); updateCartFull(); crearModal();
});

function renderCurrencyBtns(){
  const cont = document.getElementById('currencyBtns'); if(!cont) return;
  cont.innerHTML = '';
  Object.keys(monedas).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'currency-btn' + (key === currentCurrency? ' active' : '');
    btn.innerText = monedas[key].name;
    btn.onclick = () => {currentCurrency = key; localStorage.setItem('currency', key); renderCurrencyBtns(); renderProductos(); updateCartFull();};
    cont.appendChild(btn);
  });
}

function renderCategories(){
  const cont = document.getElementById('categories'); if(!cont) return;
  const cats = ['Todos',...new Set(productos.map(p => p.cat))];
  cont.innerHTML = '';
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === currentCat? ' active' : '');
    btn.innerText = cat;
    btn.onclick = () => {currentCat = cat; renderCategories(); renderProductos();};
    cont.appendChild(btn);
  });
}

function renderProductos(){
  const cont = document.getElementById('productos'); if(!cont) return;
  cont.innerHTML = '';
  const filtrados = currentCat === 'Todos'? productos : productos.filter(p => p.cat === currentCat);

  filtrados.forEach(p => {
    const precio = (p.prices[currentCurrency] * monedas[currentCurrency].rate).toFixed(2);
    const badge = p.cat.includes('Con Stock')? '<div class="product-badge">STOCK</div>' : '';
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      ${badge}
      <img src="https://placehold.co/200x120/222/FFD93D?text=${encodeURIComponent(p.name)}">
      <h4>${p.name}</h4>
      <div class="product-price">${monedas[currentCurrency].symbol}${precio}</div>
      <button class="btn-ver" onclick='verProducto("${p.name}")'>Ver Detalle</button>
    `;
    cont.appendChild(div);
  });
}

const descripciones = {
  'Diamantes': 'Recarga 100% segura. Entrega en mañanas y noches. Enviar ID + Nick. Si no hay stock se avisa.',
  'Design': 'Entrega máximo 2 días. No hay devoluciones. Respondo en tardes y noches. Envíame referencia.',
  'Combo Decana': 'Incluye: Vs diarios, Reclutamiento, Edición de VS y Spam. Activa desde 7am PE. Pago adelantado.',
  'Spam': '3 horas diarias spameando tu texto. Inicia al día siguiente si pagas tarde. 100% garantía.',
  'Seguidores IG': 'Llegada rápida de 24-48h. Si hay demora se avisa. Perfil debe estar público.'
};

function verProducto(nombre){
  const prod = productos.find(p => p.name === nombre);
  const precio = (prod.prices[currentCurrency] * monedas[currentCurrency].rate).toFixed(2);
  let desc = 'Producto oficial de Luu Store 😼';
  for(let key in descripciones){ if(prod.cat.includes(key)) desc = descripciones[key]; }
  document.getElementById('modalTitle').innerText = prod.name;
  document.getElementById('modalPrice').innerText = `${monedas[currentCurrency].symbol}${precio}`;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalBtn').onclick = () => {addToCart(prod.name, prod.prices[currentCurrency]); cerrarModal();};
  document.getElementById('modal').style.display = 'flex';
}

function crearModal(){
  if(document.getElementById('modal')) return;
  const modal = document.createElement('div'); modal.id = 'modal'; modal.className = 'modal';
  modal.innerHTML = `<div class="modal-content"><h3 id="modalTitle"></h3><p id="modalPrice" class="precio"></p><p id="modalDesc"></p><button id="modalBtn" class="btn-add">Añadir al carrito 🛒</button><button onclick="cerrarModal()" style="width:100%; margin-top:.5rem; background:transparent; color:var(--texto); border:1px solid #555; padding:.8rem; border-radius:12px">Cerrar</button></div>`;
  document.body.appendChild(modal);
}
function cerrarModal(){document.getElementById('modal').style.display = 'none';}

function addToCart(name, price){cart.push({name, price}); localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); alert(`${name} agregado 😼`);}
function updateCartCount(){document.getElementById('cartCount') && (document.getElementById('cartCount').innerText = cart.length);}
function updateCartFull(){
  const items = document.getElementById('cartItemsFull'); if(!items) return;
  items.innerHTML = ''; let total = 0;
  if(cart.length === 0) items.innerHTML = '<p style="text-align:center">Tu carrito está vacío 😿</p>';
  cart.forEach((i, idx) => {
    total += i.price;
    items.innerHTML += `<div class="card-list" style="display:flex; justify-content:space-between; align-items:center"><div><h4>${i.name}</h4><div class="precio">${monedas[currentCurrency].symbol}${(i.price * monedas[currentCurrency].rate).toFixed(2)}</div></div><button onclick="removeItem(${idx})" style="background:red; color:white; border:none; border-radius:50%; width:30px; height:30px">x</button></div>`;
  });
  document.getElementById('cartTotalFull') && (document.getElementById('cartTotalFull').innerText = monedas[currentCurrency].symbol + (total * monedas[currentCurrency].rate).toFixed(2));
}
function removeItem(idx){cart.splice(idx,1); localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); updateCartFull();}
document.getElementById('whatsappBtnFull')?.addEventListener('click', () => {
  if(cart.length === 0) return alert('Carrito vacío');
  let msg = 'Hola Luu! Quiero pedir:%0A'; let total = 0;
  cart.forEach(i => {total += i.price; msg += `- ${i.name}%0A`;});
  msg += `%0ATotal: ${monedas[currentCurrency].symbol}${(total * monedas[currentCurrency].rate).toFixed(2)}`;
  window.open(`https://wa.me/51920726588?text=${msg}`);
  cart = []; localStorage.setItem('cart', '[]'); updateCartCount(); updateCartFull();
});