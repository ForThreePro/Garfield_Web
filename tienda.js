function cargarTienda() {
    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';
    PRODUCTOS_TIENDA.forEach(prod => {
        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy">
                <h4>${prod.nombre}</h4>
                <p>${prod.descripcion}</p>
                <div class="precio">${prod.precio}</div>
                <a href="https://wa.me/51927174369?text=${encodeURIComponent(prod.whatsapp)}" class="btn-comprar" target="_blank">Comprar</a>
            </div>
        `;
    });
}