let currentCurrency = localStorage.getItem('currency') || 'PEN';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderCurrencyBtns();
  renderProductos();
  updateCartCount();
});

function renderCurrencyBtns(){
  const cont = document.getElementById('currencyBtns'); if(!cont) return;
  cont.innerHTML = '';
  Object.keys(monedas).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'currency-btn' + (key === currentCurrency? ' active' : '');
    btn.innerText = monedas[key].name;
    btn.onclick = () => {currentCurrency = key; localStorage.setItem('currency', key); renderCurrencyBtns(); renderProductos();};
    cont.appendChild(btn);
  });
}

function renderProductos(){
  const cont = document.getElementById('productos'); if(!cont) return;
  cont.innerHTML = '';
  
  productos.forEach(p => {
    const precio = (p.prices[currentCurrency] * monedas[currentCurrency].rate).toFixed(2);
    const badge = p.cat.includes('Con Stock')? '<div class="product-badge">MÁS VENDIDO</div>' : '';
    const div = document.createElement('div');
    div.className = 'product-card';
    div.innerHTML = `
      ${badge}
      <h3>${p.name}</h3>
      <div class="product-price">${monedas[currentCurrency].symbol} ${precio}</div>
      <p class="product-desc">${p.cat}</p>
      <button class="btn-add-cart" onclick='addToCart("${p.name}", ${p.prices[currentCurrency]})'>Agregar al Carrito</button>
    `;
    cont.appendChild(div);
  });
}

function addToCart(name, price){cart.push({name, price}); localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); alert(`${name} agregado ✅`);}
function updateCartCount(){document.getElementById('cartCount').innerText = cart.length;}