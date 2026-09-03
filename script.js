const numero = '51927174369';
let carrito = [];

// MUSICA
const audio = document.getElementById('musica');
const btnMusica = document.getElementById('btn-musica');
let playing = false;
btnMusica.onclick = () => {
  if(playing){audio.pause(); btnMusica.innerText='🎵 OFF';}
  else{audio.play(); btnMusica.innerText='🎵 ON';}
  playing =!playing;
}

// CARRITO
const modal = document.getElementById('modal-carrito');
const btnCarrito = document.getElementById('btn-carrito');
const cerrar = document.querySelector('.cerrar');

btnCarrito.onclick = () => {modal.style.display = 'block'; mostrarCarrito();}
cerrar.onclick = () => {modal.style.display = 'none';}
window.onclick = (e) => {if(e.target == modal) modal.style.display = 'none';}

function añadirCarrito(nombre, precio, pais){
  const existente = carrito.find(i => i.nombre === nombre && i.precio === precio);
  if(existente){existente.cantidad++;}
  else{carrito.push({nombre, precio, pais, cantidad: 1});}
  actualizarContador();
}

function cambiarCantidad(index, cambio){
  carrito[index].cantidad += cambio;
  if(carrito[index].cantidad <= 0) carrito.splice(index, 1);
  mostrarCarrito();
  actualizarContador();
}

function actualizarContador(){
  document.getElementById('contador').innerText = carrito.reduce((t,i) => t + i.cantidad, 0);
}

function mostrarCarrito(){
  let html = '';
  let total = 0;
  carrito.forEach((item, index) => {
    const precioNum = parseFloat(item.precio.replace(/[^0-9.]/g, '')) || 0;
    total += precioNum * item.cantidad;
    html += `<div style="display:flex;justify-content:space-between;margin:10px 0;padding:10px;background:#1a1a1a;border-radius:10px">
      <div><b>${item.nombre}</b><br><small>${item.precio} - ${item.pais}</small></div>
      <div class="controles">
        <button class="btn-add" onclick="cambiarCantidad(${index}, -1)">-</button>
        <span class="btn-cant">${item.cantidad}</span>
        <button class="btn-add" onclick="cambiarCantidad(${index}, 1)">+</button>
      </div>
    </div>`;
  });
  document.getElementById('items-carrito').innerHTML = html || '<p>Tu carrito está vacío 💤</p>';
  const simbolo = carrito[0]?.precio.match(/[^0-9.]/)?.[0] || 'S/';
  document.getElementById('total').innerText = `Total aprox: ${simbolo}${total.toFixed(2)}`;
}

document.getElementById('btn-enviar-wp').onclick = () => {
  if(carrito.length === 0) return alert('Tu carrito está vacío');
  let mensaje = 'Hola Garfiel! Quiero hacer este pedido:%0A%0A';
  carrito.forEach(i => {mensaje += `• ${i.cantidad}x ${i.nombre} - ${i.precio} (${i.pais})%0A`;});
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
  carrito = []; actualizarContador(); mostrarCarrito(); modal.style.display = 'none';
}

// PRECIOS
const precios = {
  diamantes: {
    PE:{con:[['110','S/2.50'],['341','S/7.00'],['572','S/12.00'],['1166','S/20.00'],['2398','S/36.00'],['6160','S/92.00']],
        sin:[['110','S/3.50'],['341','S/10.00'],['572','S/15.00'],['1166','S/26.00'],['2398','S/52.00'],['6160','S/126.00']]},
    CL:{con:[['110','$875'],['341','$2450'],['572','$4200'],['1166','$7000'],['2398','$12600'],['6160','$32200']],
        sin:[['110','$1225'],['341','$3500'],['572','$5250'],['1166','$9100'],['2398','$18200'],['6160','$44100']]},
    AR:{con:[['110','$1300'],['341','$3380'],['572','$5720'],['1166','$9880'],['2398','$18200'],['6160','$46800']],
        sin:[['110','$1820'],['341','$4680'],['572','$7800'],['1166','$13520'],['2398','$27040'],['6160','$65520']]},
    MX:{con:[['110','$18.75'],['341','$52.50'],['572','$90'],['1166','$150'],['2398','$270'],['6160','$690']],
        sin:[['110','$26.25'],['341','$75'],['572','$112.5'],['1166','$195'],['2398','$390'],['6160','$945']]},
    BO:{con:[['110','$11.25'],['341','$31.5'],['572','$54'],['1166','$90'],['2398','$162'],['6160','$414']],
        sin:[['110','$15.75'],['341','$45'],['572','$67.5'],['1166','$117'],['2398','$234'],['6160','$567']]},
    UY:{con:[['110','$37.5'],['341','$105'],['572','$180'],['1166','$300'],['2398','$540'],['6160','$1380']],
        sin:[['110','$52.5'],['341','$150'],['572','$225'],['1166','$390'],['2398','$780'],['6160','$1890']]}
  },
  spam: {
    PE:[['3 días','S/5.50'],['5 días','S/7.50'],['1 semana','S/9.50']],
    CL:[['3 días','$1750'],['5 días','$2450'],['1 semana','$3150']],
    AR:[['3 días','$2750'],['5 días','$3850'],['1 semana','$4950']],
    UY:[['3 días','$75'],['5 días','$105'],['1 semana','$135']],
    BO:[['3 días','Bs 22.5'],['5 días','Bs 31.5'],['1 semana','Bs 40.5']],
    CO:[['3 días','$7500'],['5 días','$10500'],['1 semana','$13500']],
    US:[['3 días','$2'],['5 días','$3'],['1 semana','$4']],
    MX:[['3 días','$37.5'],['5 días','$52.5'],['1 semana','$67.5']]
  },
  luu: {
    PE:[['Tex Logo','S/3'],['Plantillas 2x1','S/4'],['Caligráficos 2x1','S/3'],['Jersey','S/5']],
    CL:[['Tex Logo','$1050'],['Plantillas 2x1','$1050'],['Caligráficos 2x1','$1050'],['Jersey','$1750']],
    AR:[['Tex Logo','$1560'],['Plantillas 2x1','$1560'],['Caligráficos 2x1','$1560'],['Jersey','$2600']],
    MX:[['Tex Logo','$22.5'],['Plantillas 2x1','$22.5'],['Caligráficos 2x1','$22.5'],['Jersey','$37.5']],
    UY:[['Tex Logo','$22.5'],['Plantillas 2x1','$22.5'],['Caligráficos 2x1','$22.5'],['Jersey','$75']],
    BO:[['Tex Logo','Bs 13.5'],['Plantillas 2x1','Bs 13.5'],['Caligráficos 2x1','Bs 13.5'],['Jersey','Bs 22.5']],
    CO:[['Tex Logo','$4500'],['Plantillas 2x1','$4500'],['Caligráficos 2x1','$4500'],['Jersey','$7500']],
    US:[['Tex Logo','$2'],['Plantillas 2x1','$2'],['Caligráficos 2x1','$2'],['Jersey','$2']]
  },
  combo: {
    PE:[['Contrato Semanal','S/15']],
    AR:[['Contrato Semanal','$7000']],
    CL:[['Contrato Semanal','$5000']],
    BO:[['Contrato Semanal','Bs 55.5']],
    UY:[['Contrato Semanal','$210']],
    MX:[['Contrato Semanal','$114']]
  },
  seguidores: {
    PE:[['250','S/1.50'],['500','S/2.50'],['1000','S/5'],['2000','S/10'],['5000','S/20']],
    AR:[['250','$720'],['500','$1340'],['1000','$2750'],['2000','$5500'],['5000','$11000']],
    CL:[['250','$525'],['500','$875'],['1000','$1750'],['2000','$3500'],['5000','$7000']],
    MX:[['250','$11.25'],['500','$18.75'],['1000','$37.5'],['2000','$75'],['5000','$150']],
    UY:[['250','$22.5'],['500','$37.5'],['1000','$75'],['2000','$150'],['5000','$300']],
    BO:[['250','Bs 6.75'],['500','Bs 11.25'],['1000','Bs 22.5'],['2000','Bs 45'],['5000','Bs 90']]
  },
  numeros: {
    PE: '$2 USD', AR: '$2 USD', CL: '$2 USD', MX: '$2 USD', UY: '$2 USD', BO: '$2 USD', CO: '$2 USD', US: '$2 USD'
  },
  pase: {
    PE:[['Semanal','S/5']],
    AR:[['Semanal','$2750']],
    CL:[['Semanal','$1750']],
    MX:[['Semanal','$38']],
    UY:[['Semanal','$75']],
    BO:[['Semanal','Bs 23']]
  },
  membresia: {
    PE:[['Semanal','S/7.50'],['Mensual','S/32']],
    AR:[['Semanal','$3850'],['Mensual','$16500']],
    CL:[['Semanal','$2450'],['Mensual','$10500']],
    MX:[['Semanal','$52'],['Mensual','$240']],
    UY:[['Semanal','$105'],['Mensual','$480']],
    BO:[['Semanal','Bs 32'],['Mensual','Bs 135']]
  }
}

const listaNumeros = ['🇨🇴 +57 Colombia','🇨🇱 +56 Chile','🇰🇲 +269 Comoras','🇮🇩 +62 Indonesia','🇿🇦 +27 Sudáfrica','🇧🇳 +673 Brunéi','🇦🇼 +297 Aruba','🇧🇿 +501 Belice','🇦🇬 +1-268 Antigua','🇫🇷 +594 Guayana','🇬🇼 +245 Guinea-Bissau','🇻🇨 +1-784 San Vicente','🇹 +1-868 Trinidad','🇫🇷 +687 Nueva Caledonia','🇱🇸 +266 Lesoto','🇨🇷 +506 Costa Rica','🇵🇬 +675 Papúa','🇻🇳 +212 Vietnam'];

window.onload = () => {
  ['diamantes','spam','luu','combo','seguidores','pase','membresia'].forEach(cambiarPrecio);
  cargarNumeros('PE');
}

function cargarNumeros(pais){
  const precioNum = precios.numeros[pais] || '$2 USD';
  let html = '';
  listaNumeros.forEach(num => {
    html += `<table><tr><td>${num}</td><td>${precioNum}</td><td><button class="btn-add" onclick="añadirCarrito('Número ${num}','${precioNum}','${pais}')">Añadir</button></td></tr></table>`;
  });
  document.getElementById('tabla-numeros').innerHTML = html;
}

function cambiarPrecio(tipo){
  const pais = document.getElementById(`pais-${tipo}`)?.value;
  let html = '';

  if(tipo === 'diamantes'){
    html = '<table>';
    precios.diamantes[pais].con.forEach(i => {
      html += `<tr><td>${i[0]}💎</td><td>${i[1]}</td><td><button class="btn-add" onclick="añadirCarrito('${i[0]} Diamantes Con Stock','${i[1]}','${pais}')">Añadir</button></td></tr>`;
    });
    html += '</table>';
    document.getElementById('tabla-diamantes-con').innerHTML = html;

    html = '<table>';
    precios.diamantes[pais].sin.forEach(i => {
      html += `<tr><td>${i[0]}💎</td><td>${i[1]}</td><td><button class="btn-add" onclick="añadirCarrito('${i[0]} Diamantes Sin Stock','${i[1]}','${pais}')">Añadir</button></td></tr>`;
    });
    html += '</table>';
    document.getElementById('tabla-diamantes-sin').innerHTML = html;
  }
  else if(tipo === 'numeros'){
    cargarNumeros(pais);
  }
  else {
    precios[tipo][pais].forEach(i => {
      html += `<table><tr><td>${i[0]}</td><td>${i[1]}</td><td><button class="btn-add" onclick="añadirCarrito('${i[0]}','${i[1]}','${pais}')">Añadir</button></td></tr></table>`;
    });
    document.getElementById(`tabla-${tipo}`).innerHTML = html;
  }
}