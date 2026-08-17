let currentCurrency = localStorage.getItem('currency') || 'PEN';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCat = null;
let musicPlaying = localStorage.getItem('music') === 'true';

document.addEventListener('DOMContentLoaded', () => {
  renderCurrencyBtns();
  renderCategories();
  renderProductos();
  updateCartCount();
  updateCartFull();
  setupMusic(); // INICIAR MUSICA
});

// MUSICA DE FONDO CON TU LINK
function setupMusic(){
  const audio = document.createElement('audio');
  audio.id = 'bgMusic';
  audio.src = 'https://files.evogb.win/kBRUw0.mp3'; // TU MUSICA
  audio.loop = true;
  audio.volume = 0.3;
  document.body.appendChild(audio);

  const btn = document.createElement('button');
  btn.className = 'music-btn';
  btn.id = 'musicBtn';
  btn.innerText = musicPlaying? '🔊' : '🔇';
  btn.onclick = toggleMusic;
  document.body.appendChild(btn);

  if(musicPlaying) audio.play().catch(e=>console.log('Autoplay bloqueado - dale click a la web'));
}

function toggleMusic(){
  const audio = document.getElementById('bgMusic');
  const btn = document.getElementById('musicBtn');
  if(audio.paused){
    audio.play();
    btn.innerText = '🔊';
    musicPlaying = true;
  } else {
    audio.pause();
    btn.innerText = '🔇';
    musicPlaying = false;
  }
  localStorage.setItem('music', musicPlaying);
}

// MONEDAS
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

// CATEGORIAS CENTRADAS + BOTON LIMPIAR
function renderCategories(){
  const cont = document.getElementById('categories'); if(!cont) return;
  const cats = [...new Set(productos.map(p => p.cat))];
  cont.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'categories-wrapper';

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-btn' + (cat === currentCat? ' active' : '');
    btn.innerText = cat;
    btn.onclick = () => {currentCat = cat; renderCategories(); renderProductos();};
    wrapper.appendChild(btn);
  });

  if(currentCat){
    const clearBtn = document.createElement('button');
    clearBtn.className = 'btn-clear';
    clearBtn.innerText = 'X Limpiar';
    clearBtn.onclick = () => {currentCat = null; renderCategories(); renderProductos();};
    wrapper.appendChild(clearBtn);
  }

  cont.appendChild(wrapper);
}

// PRODUCTOS
function renderProductos(){
  const cont = document.getElementById('productos'); if(!cont) return;
  cont.innerHTML = '';
  if(!currentCat){cont.innerHTML = '<p class="empty-msg">👆 Elige una categoría para ver productos</p>'; return;}
  const filtrados = productos.filter(p => p.cat === currentCat);
  filtrados.forEach(p => {
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

// CARRITO
function addToCart(name, price){cart.push({name, price}); localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); alert(`${name} agregado ✅`);}
function updateCartCount(){document.getElementById('cartCount') && (document.getElementById('cartCount').innerText = cart.length);}
function updateCartFull(){
  const items = document.getElementById('cartItemsFull'); if(!items) return;
  items.innerHTML = ''; let total = 0;
  if(cart.length === 0) items.innerHTML = '<p class="empty-msg">Tu carrito está vacío 😿</p>';
  cart.forEach((i, idx) => {
    total += i.price;
    items.innerHTML += `<div class="product-card"><h3>${i.name}</h3><div class="product-price">${monedas[currentCurrency].symbol}${(i.price * monedas[currentCurrency].rate).toFixed(2)}</div><button onclick="removeItem(${idx})" class="btn btn-secondary" style="width:100%">Eliminar</button></div>`;
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