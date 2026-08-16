document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const priceTables = document.querySelectorAll('.price-table');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.main-section');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Toggle menú hamburguesa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Navegación entre secciones: Inicio y Tienda
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            showSection(target);
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function showSection(id){
        sections.forEach(s => s.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        document.querySelector(`.nav-link[data-target="${id}"]`).classList.add('active');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    // Tabs de países
    const savedCountry = localStorage.getItem('sapito_country') || 'pe';
    activateTab(savedCountry);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const country = btn.dataset.country;
            activateTab(country);
            localStorage.setItem('sapito_country', country);
        });
    });

    function activateTab(country){
        tabBtns.forEach(b => b.classList.remove('active'));
        priceTables.forEach(t => t.classList.remove('active'));
        document.querySelector(`.tab-btn[data-country="${country}"]`)?.classList.add('active');
        document.getElementById(country)?.classList.add('active');
    }

    // Copiar precio al tocar
    document.querySelectorAll('.price-item, .product-card').forEach(item => {
        item.addEventListener('click', () => {
            const text = item.querySelector('h4') ? item.querySelector('h4').innerText : item.innerText;
            navigator.clipboard.writeText(text);
            item.style.borderColor = 'var(--neon-green)';
            setTimeout(() => item.style.borderColor = '', 300);
        });
    });
});