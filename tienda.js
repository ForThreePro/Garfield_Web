function cargarTienda() {
    const contenedor = document.getElementById('tienda-grid');
    contenedor.innerHTML = '';
    PRODUCTOS_TIENDA.forEach(prod => {
        contenedor.innerHTML += `
            <div class="product-card" onclick='abrirProducto(${JSON.stringify(prod)})'>
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <div class="precio">${prod.precio.split('|')[0]}</div>
            </div>
        `;
    });
}