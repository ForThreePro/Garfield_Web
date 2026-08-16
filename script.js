document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const navLinks = document.querySelectorAll('.nav-link,.cta-btn[data-target]');
    const sections = document.querySelectorAll('.main-section');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    cargarTienda();
    cargarPrecios('pe');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.target);
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function showSection(id){
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        document.querySelector(`.nav-link[data-target="${id}"]`)?.classList.add('active');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => cargarPrecios(btn.dataset.country));
    });

    function cargarPrecios(pais) {
        const data = PRECIOS_DIAMANTES[pais];
        const contenedor = document.getElementById('precios-container');
        tabBtns.forEach(b => b.classList.remove('active'));
        document.querySelector(`.tab-btn[data-country="${pais}"]`).classList.add('active');
        contenedor.innerHTML = `
            <h3 class="stock-title">✅ CON STOCK</h3>
            <div class="price-grid">${data.conStock.map(i=>`<div class="price-item"><span>${i.diamantes}</span><span>${data.simbolo}${i.precio}</span></div>`).join('')}</div>
            <h3 class="stock-title">❌ SIN STOCK</h3>
            <div class="price-grid">${data.sinStock.map(i=>`<div class="price-item"><span>${i.diamantes}</span><span>${data.simbolo}${i.precio}</span></div>`).join('')}</div>
            <div class="info-box"><strong>Info:</strong> ${data.info}</div>`;
    }
});