const numero = '51927174369';

// MUSICA
const audio = document.getElementById('musica');
const btnMusica = document.getElementById('btn-musica');
let playing = false;
btnMusica.onclick = () => {
  if(playing){audio.pause(); btnMusica.innerText='🎵 OFF';}
  else{audio.play(); btnMusica.innerText='🎵 ON';}
  playing =!playing;
}

// COMPRAR
function comprar(producto, precio, pais){
  const moneda = document.getElementById('moneda-numero')?.value || precio;
  const mensaje = `Hola Garfiel! Quiero comprar:%0AProducto: ${producto}%0APrecio: ${moneda}%0APaís: ${pais}`;
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
}

// PRECIOS COMPLETOS
const precios = {
  diamantes: {
    PE:{con:[['1166','S/20'],['2200','S/35'],['5000','S/75']], sin:[['1166','S/18'],['2200','S/32'],['5000','S/68']]},
    AR:{con:[['1166','$5000'],['2200','$9000'],['5000','$20000']], sin:[['1166','$4500'],['2200','$8000'],['5000','$18000']]},
    CL:{con:[['1166','$7000'],['2200','$13000'],['5000','$29000']], sin:[['1166','$6500'],['2200','$12000'],['5000','$27000']]},
    BO:{con:[['1166','Bs 80'],['2200','Bs 140'],['5000','Bs 310']], sin:[['1166','Bs 70'],['2200','Bs 130'],['5000','Bs 290']]},
    UY:{con:[['1166','$350'],['2200','$650'],['5000','$1450']], sin:[['1166','$320'],['2200','$600'],['5000','$1350']]},
    MX:{con:[['1166','$200'],['2200','$380'],['5000','$850']], sin:[['1166','$180'],['2200','$350'],['5000','$780']]}
  },
  spam: {
    PE:[['3 días','S/15'],['5 días','S/25'],['1 semana','S/35']],
    CL:[['3 días','$4500'],['5 días','$7500'],['1 semana','$10500']],
    AR:[['3 días','$7000'],['5 días','$12000'],['1 semana','$16500']],
    UY:[['3 días','$180'],['5 días','$300'],['1 semana','$420']],
    BO:[['3 días','Bs 50'],['5 días','Bs 85'],['1 semana','Bs 120']],
    CO:[['3 días','$15000'],['5 días','$25000'],['1 semana','$35000']],
    US:[['3 días','$6'],['5 días','$10'],['1 semana','$14']],
    MX:[['3 días','$100'],['5 días','$170'],['1 semana','$240']]
  },
  luu: {
    PE:[['Tex Logo','S/10'],['Plantillas 2x1','S/20'],['Jersey','S/25'],['Banner','S/15']],
    CL:[['Tex Logo','$3500'],['Plantillas 2x1','$7000'],['Jersey','$9000'],['Banner','$5000']],
    AR:[['Tex Logo','$5500'],['Plantillas 2x1','$11000'],['Jersey','$14000'],['Banner','$8000']],
    MX:[['Tex Logo','$120'],['Plantillas 2x1','$240'],['Jersey','$300'],['Banner','$180']],
    UY:[['Tex Logo','$200'],['Plantillas 2x1','$400'],['Jersey','$500'],['Banner','$300']],
    BO:[['Tex Logo','Bs 40'],['Plantillas 2x1','Bs 80'],['Jersey','Bs 100'],['Banner','Bs 60']],
    CO:[['Tex Logo','$12000'],['Plantillas 2x1','$24000'],['Jersey','$30000'],['Banner','$18000']],
    US:[['Tex Logo','$4'],['Plantillas 2x1','$8'],['Jersey','$10'],['Banner','$6']]
  },
  combo: {
    PE:[['VS Diario','S/30'],['Reclutamiento','S/40'],['Edición VS','S/50'],['Combo Completo','S/100']],
    CL:[['VS Diario','$9000'],['Reclutamiento','$12000'],['Edición VS','$15000'],['Combo Completo','$30000']],
    AR:[['VS Diario','$14000'],['Reclutamiento','$18000'],['Edición VS','$22000'],['Combo Completo','$45000']],
    MX:[['VS Diario','$250'],['Reclutamiento','$350'],['Edición VS','$420'],['Combo Completo','$850']],
    US:[['VS Diario','$8'],['Reclutamiento','$12'],['Edición VS','$15'],['Combo Completo','$30']],
    BR:[['VS Diario','R$40'],['Reclutamiento','R$55'],['Edición VS','R$70'],['Combo Completo','R$140']]
  },
  seguidores: {
    PE:[['250','S/3'],['500','S/5'],['1000','S/9'],['2500','S/20'],['5000','S/38']],
    CL:[['250','$1000'],['500','$1700'],['1000','$3000'],['2500','$6500'],['5000','$12000']],
    AR:[['250','$1500'],['500','$2500'],['1000','$4500'],['2500','$10000'],['5000','$18000']],
    MX:[['250','$40'],['500','$70'],['1000','$130'],['2500','$280'],['5000','$520']],
    US:[['250','$1.5'],['500','$2.5'],['1000','$4.5'],['2500','$10'],['5000','$18']],
    BR:[['250','R$8'],['500','R$14'],['1000','R$25'],['2500','R$55'],['5000','R$100']],
    CO:[['250','$5000'],['500','$8500'],['1000','$15000'],['2500','$32000'],['5000','$60000']]
  },
  numeros: ['🇨🇴 +57 Colombia','🇨🇱 +56 Chile','🇰🇲 +269 Comoras','🇮🇩 +62 Indonesia','🇿🇦 +27 Sudáfrica','🇧🇳 +673 Brunéi','🇦🇼 +297 Aruba','🇧🇿 +501 Belice','🇦🇬 +1-268 Antigua','🇫🇷 +594 Guayana','🇬🇼 +245 Guinea-Bissau','🇻🇨 +1-784 San Vicente','🇹 +1-868 Trinidad','🇫🇷 +687 Nueva Caledonia','🇱🇸 +266 Lesoto','🇨🇷 +506 Costa Rica','🇵🇬 +675 Papúa','🇻🇳 +212 Vietnam'],
  pase: {
    PE:[['Semanal','S/12'],['Mensual','S/40']],
    CL:[['Semanal','$3500'],['Mensual','$12000']],
    AR:[['Semanal','$5500'],['Mensual','$18000']],
    MX:[['Semanal','$120'],['Mensual','$400']],
    BR:[['Semanal','R$25'],['Mensual','R$80']],
    US:[['Semanal','$3'],['Mensual','$10']]
  }
}

// CARGAR TODO
window.onload = () => {
  cambiarPrecio('diamantes'); cambiarPrecio('spam'); cambiarPrecio('luu');
  cambiarPrecio('combo'); cambiarPrecio('seguidores'); cambiarPrecio('pase');
  cargarNumeros();
}

function cargarNumeros(){
  let html = '';
  precios.numeros.forEach(pais => {
    html += `<table><tr><td>${pais}</td><td><button class="btn" onclick="comprar('Número ${pais}','ver selector','${pais}')">Comprar</button></td></tr></table>`;
  });
  document.getElementById('tabla-numeros').innerHTML = html;
}

function cambiarPrecio(tipo){
  const pais = document.getElementById(`pais-${tipo}`).value;
  let html = '';

  if(tipo === 'diamantes'){
    html = '<table>';
    precios.diamantes[pais].con.forEach(i => {
      html += `<tr><td>${i[0]} Diamantes</td><td>${i[1]}</td><td><button class="btn" onclick="comprar('${i[0]} Diamantes Con Stock','${i[1]}','${pais}')">Comprar</button></td></tr>`;
    });
    html += '</table>';
    document.getElementById('tabla-diamantes-con').innerHTML = html;

    html = '<table>';
    precios.diamantes[pais].sin.forEach(i => {
      html += `<tr><td>${i[0]} Diamantes</td><td>${i[1]}</td><td><button class="btn" onclick="comprar('${i[0]} Diamantes Sin Stock','${i[1]}','${pais}')">Comprar</button></td></tr>`;
    });
    html += '</table>';
    document.getElementById('tabla-diamantes-sin').innerHTML = html;
  } else {
    precios[tipo][pais].forEach(i => {
      html += `<table><tr><td>${i[0]}</td><td>${i[1]}</td><td><button class="btn" onclick="comprar('${i[0]}','${i[1]}','${pais}')">Comprar</button></td></tr></table>`;
    });
    document.getElementById(`tabla-${tipo}`).innerHTML = html;
  }
}