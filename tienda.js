let PAIS_ACTUAL = 'pe';

document.addEventListener('DOMContentLoaded', () => {
    cargarTienda();
});

function cargarTienda() {
    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';

    const secciones = [
        { cat: 'diamantes', titulo: '💎 DIAMANTES' },
        { cat: 'diseño', titulo: '🎨 DISEÑOS' },
        { cat: 'servicio', titulo: '⚡ SERVICIOS' },
        { cat: 'redes', titulo: '📱 REDES SOCIALES' }
    ];

    secciones.forEach(sec => {
        let html = `<div class="section-block" data-category="${sec.cat}"><h2>${sec.titulo}</h2><div class="products-grid">`;
        
        if(sec.cat === 'diamantes'){
            const data = PRECIOS_DIAMANTES[PAIS_ACTUAL];
            html += `
            <div class="product-card diamantes-card">
                <div class="product-badge">OFERTA</div>
                <div class="product-icon">💎</div>
                <div class="product-cat">RECARGAS INSTANTÁNEAS</div>
                <h4>Paquetes de Diamantes</h4>
                <div class="product-rating">★ 5.0 (500+ ventas)</div>
                <div class="diamantes-grid">
                    ${data.conStock.map(i => `<div class="diamante-item"><span>${i.d}</span><span style="color:var(--orange)">${data.simbolo}${i.p}</span></div>`).join('')}
                </div>
                <button class="btn-buy" onclick="alert('Escríbenos por WhatsApp para recargar')">COMPRAR DIAMANTES</button>
            </div>`;
        } else {
            PRODUCTOS_TIENDA.filter(p => p.categoria === sec.cat).forEach(prod => {
                const precio = prod.precios[PAIS_ACTUAL];
                html += `
                <div class="product-card" onclick='abrirProducto(${JSON.stringify(prod)})'>
                    ${prod.badge ? `<div class="product-badge">${prod.badge}</div>` : ''}
                    <div class="product-icon">${prod.icono}</div>
                    <div class="product-cat">${sec.cat}</div>
                    <h4>${prod.nombre}</h4>
                    <div class="product-rating">★ 4.9 (200+)</div>
                    <div class="product-price">${precio}</div>
                    <button class="btn-buy">Comprar</button>
                </div>`;
            });
        }
        html += `</div></div>`;
        contenedor.innerHTML += html;
    });
    activarFiltros();
}

function activarFiltros() {
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); PAIS_ACTUAL = btn.dataset.country; cargarTienda();
        }
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filtro = btn.dataset.filter;
            document.querySelectorAll('.section-block').forEach(s => {
                s.style.display = (filtro === 'todos' || s.dataset.category === filtro)? 'block' : 'none';
            });
        }
    });
    document.getElementById('search').oninput = (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(term)? '' : 'none';
        });
    }
}