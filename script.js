let currentCurrency = localStorage.getItem('currency') || 'PEN';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCat = 'Todos';

document.addEventListener('DOMContentLoaded', () => {
  renderCurrencyBtns();
  renderCategories();
  renderProductos();
  updateCartCount();
  updateCartFull();
});

// MONEDAS
function renderCurrencyBtns(){
  const cont = document.getElementById('currencyBtns');
  if(!cont) return;
  cont.innerHTML = '';
  Object.keys(monedas).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'currency-btn' + (key === currentCurrency? ' active' : '');
    btn.innerText = monedas[key].name;
    btn.onclick = () => {
      currentCurrency = key;
      localStorage.setItem('currency', key);
      renderCurrencyBtns(); renderProductos(); updateCartFull();
    };
    cont.appendChild(btn);
  });
}

// CATEGORIAS
function renderCategories(){
  const cont = document.getElementById('categories');
  if(!cont) return;
  const cats = ['Todos',...new Set(productos.map(p => p.cat))];
  cont.innerHTML = '';
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === currentCat? ' active' : '');
    btn.innerText = cat;
    btn.onclick = () => {
      currentCat = cat;
      renderCategories(); renderProductos();
    };
    cont.appendChild(btn);
  });
}

// PRODUCTOS
function renderProductos(){
  const cont = document.getElementById('productos');
  if(!cont) return;
  cont.innerHTML = '';
  const filtrados = currentCat === 'Todos'? productos : productos.filter(p => p.cat === currentCat);

  filtrados.forEach(p => {
    const precio = (p.prices[currentCurrency] * monedas[currentCurrency].rate).toFixed(2);
    const div = document.createElement('div');
    div.className = 'card-list';
    div.innerHTML = `
      <h4>${p.name}</h4>
      <div class="precio">${monedas[currentCurrency].symbol}${precio}</div>
      <button class="btn-add" onclick='addToCart("${p.name}", ${p.prices[currentCurrency]})'>Añadir</button>
    `;
    cont.appendChild(div);
  });
}

// CARRITO
function addToCart(name, price){
  cart.push({name, price});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} agregado 😼`);
}
function updateCartCount(){
  document.getElementById('cartCount') && (document.getElementById('cartCount').innerText = cart.length);
}
function updateCartFull(){
  const items = document.getElementById('cartItemsFull');
  if(!items) return;
  items.innerHTML = '';
  let total = 0;
  if(cart.length === 0) items.innerHTML = '<p style="text-align:center">Tu carrito está vacío 😿</p>';
  cart.forEach((i, idx) => {
    total += i.price;
    items.innerHTML += `<div class="card-list" style="display:flex; justify-content:space-between; align-items:center">
      <div><h4>${i.name}</h4><div class="precio">${monedas[currentCurrency].symbol}${(i.price * monedas[currentCurrency].rate).toFixed(2)}</div></div>
      <button onclick="removeItem(${idx})" style="background:red; color:white; border:none; border-radius:50%; width:30px; height:30px">x</button></div>`;
  });
  document.getElementById('cartTotalFull') && (document.getElementById('cartTotalFull').innerText = monedas[currentCurrency].symbol + (total * monedas[currentCurrency].rate).toFixed(2));
}
function removeItem(idx){
  cart.splice(idx,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(); updateCartFull();
}

// WHATSAPP
document.getElementById('whatsappBtnFull')?.addEventListener('click', () => {
  if(cart.length === 0) return alert('Carrito vacío');
  let msg = 'Hola Luu! Quiero pedir:%0A';
  let total = 0;
  cart.forEach(i => {total += i.price; msg += `- ${i.name}%0A`;});
  msg += `%0ATotal: ${monedas[currentCurrency].symbol}${(total * monedas[currentCurrency].rate).toFixed(2)}`;
  window.open(`https://wa.me/51920726588?text=${msg}`);
  cart = []; localStorage.setItem('cart', '[]');
  updateCartCount(); updateCartFull();
});