let PAIS_ACTUAL = 'pe'; // Guardamos el país

function cargarTienda() {
    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';

    const secciones = [
        { cat: 'diamantes', titulo: '💎 DIAMANTES' }, // YA TIENE SU CARD
        { cat: 'diseño', titulo: '🎨 DISEÑOS' },
        { cat: 'servicio', titulo: '⚡ SERVICIOS' },
        { cat: 'redes', titulo: '📱 REDES SOCIALES' }
    ];

    secciones.forEach(sec => {
        let html = `
        <div class="section-block" data-category="${sec.cat}">
            <h2>${sec.titulo}</h2>
            <div class="products-scroll">
        `;

        if(sec.cat === 'diamantes'){
            // CARD ESPECIAL DE DIAMANTES
            html += `
            <div class="product-card diamantes-card">
                <div class="discount-badge">OFERTA</div>
                <div class="product-logo">💎</div>
                <div class="product-cat">RECARGAS</div>
                <h4>Paquetes de Diamantes</h4>
                <div class="rating">★ 5.0</div>
                <div id="diamantes-precios"></div>
                <button class="btn-add" onclick="abrirDiamantes()">Ver todos los paquetes</button>
            </div>
            `;
        } else {
            const productos = PRODUCTOS_TIENDA.filter(p => p.categoria === sec.cat);
            productos.forEach(prod => {
                const precio = getPrecioPorPais(prod.precios, PAIS_ACTUAL);
                html += `
                <div class="product-card">
                    <div class="discount-badge">-20%</div>
                    <div class="product-logo">${prod.icono}</div>
                    <div class="product-cat">${sec.cat.toUpperCase()}</div>
                    <h4>${prod.nombre}</h4>
                    <div class="rating">★ 4.9</div>
                    <div class="price-row">
                        <span class="price">${precio}</span>
                        <span class="old-price">${getPrecioAntiguo(precio)}</span>
                    </div>
                    <button class="btn-add" onclick='abrirProducto(${JSON.stringify(prod)})'>Añadir al carrito</button>
                </div>
                `;
            });
        }

        html += `</div></div>`;
        contenedor.innerHTML += html;
    });

    cargarDiamantes(PAIS_ACTUAL); // Cargar precios de diamantes
    activarFiltros();
}

function cargarDiamantes(pais) {
    const data = PRECIOS_DIAMANTES[pais];
    const cont = document.getElementById('diamantes-precios');
    if(!cont) return;
    cont.innerHTML = `
        <div style="font-size:0.9rem; margin:10px 0">
            <div style="color:#00ff88">Con Stock: ${data.simbolo}${data.conStock[0].precio}</div>
            <div style="color:#ff4444">Sin Stock: ${data.simbolo}${data.sinStock[0].precio}</div>
        </div>
    `;
}

function getPrecioPorPais(precios, pais) {
    return precios[pais] || precios['pe'];
}

function getPrecioAntiguo(precio) {
    const num = parseFloat(precio.replace(/[^0-9.]/g, ''));
    return precio.replace(num.toFixed(2), (num + 2).toFixed(2));
}

function activarFiltros() {
    // CAMBIADOR DE MONEDA GLOBAL
    document.querySelectorAll('.country-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            PAIS_ACTUAL = btn.dataset.country;
            cargarTienda(); // Recargar TODO con el nuevo país
        }
    });

    // FILTROS DE CATEGORIA
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

    // BUSCADOR
    document.getElementById('search').oninput = (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.display = card.innerText.toLowerCase().includes(term)? 'block' : 'none';
        });
    }
}

function abrirDiamantes() {
    document.querySelector('[data-category="diamantes"]').scrollIntoView({behavior: 'smooth'});
}