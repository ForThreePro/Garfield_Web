let CARRITO = [];
let PRODUCTO_ACTUAL = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu-btn').onclick = () => { document.getElementById('sidebar').classList.add('active'); document.getElementById('overlay').classList.add('active'); }
    document.getElementById('close-btn').onclick = cerrarMenu;
    document.getElementById('overlay').onclick = cerrarMenu;
    function cerrarMenu(){ document.getElementById('sidebar').classList.remove('active'); document.getElementById('overlay').classList.remove('active'); }

    document.querySelectorAll('.nav-link,.btn-main').forEach(link => {
        link.onclick = (e) => {
            if(link.dataset.target){
                e.preventDefault();
                document.querySelectorAll('.main-section').forEach(s => s.classList.remove('active'));
                document.getElementById(link.dataset.target).classList.add('active');
                cerrarMenu();
            }
        }
    });

    document.getElementById('cart-btn').onclick = abrirCarrito;
    document.getElementById('ver-carrito').onclick = abrirCarrito;
    document.getElementById('close-cart').onclick = () => document.getElementById('cart-modal').classList.remove('active');
    document.getElementById('close-modal').onclick = () => document.getElementById('modal').classList.remove('active');
    document.getElementById('btn-add-cart').onclick = añadirAlCarrito;
    document.getElementById('btn-checkout').onclick = enviarWhatsApp;
});

function abrirProducto(prod) {
    PRODUCTO_ACTUAL = prod;
    document.getElementById('modal-icon').innerText = prod.icono;
    document.getElementById('modal-title').innerText = prod.nombre;
    document.getElementById('modal-desc').innerText = prod.descripcion;
    document.getElementById('modal-price').innerText = prod.precios[PAIS_ACTUAL];
    document.getElementById('modal').classList.add('active');
}

function añadirAlCarrito() {
    const existente = CARRITO.find(p => p.id === PRODUCTO_ACTUAL.id);
    if(existente) { existente.cantidad++; } else { CARRITO.push({...PRODUCTO_ACTUAL, cantidad: 1}); }
    actualizarContador();
    document.getElementById('modal').classList.remove('active');
}

function actualizarContador() {
    const total = CARRITO.reduce((sum, p) => sum + p.cantidad, 0);
    document.getElementById('cart-count').innerText = total;
}

function eliminarDelCarrito(id) {
    CARRITO = CARRITO.filter(p => p.id!== id);
    actualizarContador();
    abrirCarrito();
}

function abrirCarrito() {
    let html = ''; let total = 0;
    if(CARRITO.length === 0) { html = '<p style="text-align:center; padding:20px">Tu carrito está vacío 😿</p>'; }
    else { html = CARRITO.map(p => {
            const precioNum = parseFloat(p.precios[PAIS_ACTUAL].replace(/[^0-9.]/g, ''));
            total += precioNum * p.cantidad;
            return `<div class="cart-item"><div style="font-size:2rem">${p.icono}</div><div class="cart-info"><h4>${p.nombre}</h4><p>${p.cantidad} x ${p.precios[PAIS_ACTUAL]}</p></div><button onclick="eliminarDelCarrito(${p.id})" class="btn-delete">🗑️</button></div>`;
        }).join(''); }
    document.getElementById('cart-items').innerHTML = html;
    document.getElementById('cart-total').innerText = `TOTAL: ${PRODUCTOS_TIENDA[0].precios[PAIS_ACTUAL].split(/[0-9.]/)[0]}${total.toFixed(2)}`;
    document.getElementById('cart-modal').classList.add('active');
}

function enviarWhatsApp() {
    if(CARRITO.length === 0) return alert('Carrito vacío');
    let texto = 'Hola Garfield Store 🐱 quiero comprar:\n\n';
    CARRITO.forEach(p => { texto += `• ${p.nombre} x${p.cantidad} - ${p.precios[PAIS_ACTUAL]}\n`; });
    texto += `\nTotal: ${document.getElementById('cart-total').innerText}`;
    window.open(`https://wa.me/51927174369?text=${encodeURIComponent(texto)}`, '_blank');
}