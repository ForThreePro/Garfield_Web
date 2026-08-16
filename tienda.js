function cargarTienda() {
    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';

    const secciones = [
        { cat: 'diseño', titulo: '🎨 DISEÑOS' },
        { cat: 'servicio', titulo: '⚡ SERVICIOS' },
        { cat: 'redes', titulo: '📱 REDES SOCIALES' }
    ];

    secciones.forEach(sec => {
        const productos = PRODUCTOS_TIENDA.filter(p => p.categoria === sec.cat);
        if(productos.length === 0) return;

        let html = `
        <div class="section-block" data-category="${sec.cat}">
            <h2>${sec.titulo}</h2>
            <div class="products-scroll">
        `;

        productos.forEach(prod => {
            html += `
            <div class="product-card">
                <div class="discount-badge">-20%</div>
                <div class="product-logo">${prod.icono}</div>
                <div class="product-cat">${sec.cat.toUpperCase()}</div>
                <h4>${prod.nombre}</h4>
                <div class="rating">★ 4.9</div>
                <div class="price-row">
                    <span class="price">${prod.precio.split('|')[0]}</span>
                    <span class="old-price">S/${(parseFloat(prod.precio.split('S/')[1]) + 2).toFixed(2)}</span>
                </div>
                <button class="btn-add" onclick='abrirProducto(${JSON.stringify(prod)})'>Añadir al carrito</button>
            </div>
            `;
        });

        html += `</div></div>`;
        contenedor.innerHTML += html;
    });

    // FILTROS
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