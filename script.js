let CARRITO = [];
let PRODUCTO_ACTUAL = null;

document.addEventListener('DOMContentLoaded', () => {
    cargarTienda();
    cargarPrecios('pe');

    // MENÚ LATERAL
    document.getElementById('menu-btn').onclick = () => {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    }
    document.getElementById('close-btn').onclick = cerrarMenu;
    document.getElementById('overlay').onclick = cerrarMenu;
    function cerrarMenu(){
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    }

    // NAVEGACIÓN
    document.querySelectorAll('.nav-link').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('.main-section').forEach(s => s.classList.remove('active'));
            document.getElementById(link.dataset.target).classList.add('active');
            cerrarMenu();
        }
    });

    // PAÍSES
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => cargarPrecios(btn.dataset.country);
    });

    // CARRITO
    document.getElementById('cart-btn').onclick = abrirCarrito;
    document.getElementById('ver-carrito').onclick = abrirCarrito;
    document.getElementById('close-cart').onclick = () => document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('close-modal').onclick = () => document.getElementById('modal').classList.remove('active');
    document.getElementById('btn-add-cart').onclick = añadirAlCarrito;
    document.getElementById('btn-checkout').onclick = enviarWhatsApp;
});

function cargarPrecios(pais) {
    const data = PRECIOS_DIAMANTES[pais];
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-country="${pais}"]`).classList.add('active');
    document.getElementById('precios-container').innerHTML = `
        <h3 style="color:#00ff88">CON STOCK</h3>
        <div class="price-grid">${data.conStock.map(i=>`<div class="price-item"><span>${i.diamantes}</span><span>${data.simbolo}${i.precio}</span></div>`).join('')}</div>
        <h3 style="color:#ff4444">SIN STOCK</h3>
        <div class="price-grid">${data.sinStock.map(i=>`<div class="price-item"><span>${i.diamantes}</span><span>${data.simbolo}${i.precio}</span></div>`).join('')}</div>`;
}

function abrirProducto(prod) {
    PRODUCTO_ACTUAL = prod;
    document.getElementById('modal-img').src = prod.imagen;
    document.getElementById('modal-title').innerText = prod.nombre;
    document.getElementById('modal-desc').innerText = prod.descripcion;
    document.getElementById('modal-price').innerText = prod.precio;
    document.getElementById('modal').classList.add('active');
}

function añadirAlCarrito() {
    CARRITO.push(PRODUCTO_ACTUAL);
    document.getElementById('cart-count').innerText = CARRITO.length;
    document.getElementById('modal').classList.remove('active');
    alert('✅ Añadido al carrito');
}

function abrirCarrito() {
    let html = '';
    if(CARRITO.length === 0) html = '<p>Tu carrito está vacío</p>';
    else html = CARRITO.map((p,i)=>`<div style="border-bottom:1px solid #333; padding:10px 0">${p.nombre} - ${p.precio}</div>`).join('');
    document.getElementById('cart-items').innerHTML = html;
    document.getElementById('cart-modal').classList.add('active');
}

function enviarWhatsApp() {
    if(CARRITO.length === 0) return alert('Carrito vacío');
    let texto = 'Hola Garfield Store, quiero comprar:\n\n';
    CARRITO.forEach(p => texto += `• ${p.nombre}\n`);
    texto += '\nTotal: Preguntar precio';
    window.open(`https://wa.me/51927174369?text=${encodeURIComponent(texto)}`, '_blank');
}