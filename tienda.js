function cargarTienda() {
    const contenedor = document.getElementById('tienda-grid');
    if(!contenedor) return;
    contenedor.innerHTML = '';

    const categorias = {
        diseño: "🎨 DISEÑOS",
        servicio: "⚡ SERVICIOS", 
        redes: "📱 REDES SOCIALES"
    };

    Object.keys(categorias).forEach(cat => {
        const productos = PRODUCTOS_TIENDA.filter(p => p.categoria === cat);
        if(productos.length === 0) return;

        contenedor.innerHTML += `<h3 class="section-title">${categorias[cat]}</h3>`;

        productos.forEach(prod => {
            contenedor.innerHTML += `
                <div class="product-card" onclick='abrirProducto(${JSON.stringify(prod)})'>
                    <div class="product-header">
                        <div class="product-icon">${prod.icono}</div>
                        <h4>${prod.nombre}</h4>
                        ${prod.badge ? `<span class="badge">${prod.badge}</span>` : ''}
                    </div>
                    <div class="precio">${prod.precio.split('|')[0]}</div>
                    <div class="desc">${prod.descripcion}</div>
                </div>
            `;
        });
    });
}