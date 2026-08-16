const PRECIOS = {
  // === DIAMANTES 💎 === id: { pais: {con:, sin:} }
  501: { PE: {con:2.50, sin:3.50}, AR:{con:1300, sin:1820}, CL:{con:875, sin:1225}, MX:{con:18.75, sin:26.25}, UY:{con:37.5, sin:52.5}, BO:{con:11.25, sin:15.75}, CO:{con:3750, sin:5250}, US:{con:0.68, sin:0.95} },
  502: { PE: {con:7.00, sin:10.00}, AR:{con:3380, sin:4680}, CL:{con:2450, sin:3500}, MX:{con:52.5, sin:75}, UY:{con:105, sin:150}, BO:{con:31.5, sin:45}, CO:{con:10500, sin:15000}, US:{con:1.90, sin:2.70} },
  503: { PE: {con:12.00, sin:15.00}, AR:{con:5720, sin:7800}, CL:{con:4200, sin:5250}, MX:{con:90, sin:112.5}, UY:{con:180, sin:225}, BO:{con:54, sin:67.5}, CO:{con:18000, sin:22500}, US:{con:3.25, sin:4.05} },
  504: { PE: {con:20.00, sin:26.00}, AR:{con:9880, sin:13520}, CL:{con:7000, sin:9100}, MX:{con:150, sin:195}, UY:{con:300, sin:390}, BO:{con:90, sin:117}, CO:{con:30000, sin:39000}, US:{con:5.40, sin:7.02} },
 505: { PE: {con:36.00, sin:52.00}, AR:{con:18200, sin:27040}, CL:{con:12600, sin:18200}, MX:{con:270, sin:390}, UY:{con:540, sin:780}, BO:{con:162, sin:234}, CO:{con:54000, sin:78000}, US:{con:9.72, sin:14.04} },
 506: { PE: {con:92.00, sin:126.00}, AR:{con:46800, sin:65520}, CL:{con:32200, sin:44100}, MX:{con:690, sin:945}, UY:{con:1380, sin:1890}, BO:{con:414, sin:567}, CO:{con:138000, sin:189000}, US:{con:24.84, sin:34.02} },

  // === INSTAGRAM ===
 101: { PE: 1.50, AR: 520, CL: 525, MX: 11.25, UY: 22.5, BO: 6.75, CO: 1500, US: 0.27 },
  102: { PE: 2.50, AR: 1040, CL: 875, MX: 18.75, UY: 37.5, BO: 11.25, CO: 2500, US: 0.45 },
  103: { PE: 5.00, AR: 2080, CL: 1750, MX: 37.5, UY: 75, BO: 22.5, CO: 5000, US: 0.90 },
  104: { PE: 10.00, AR: 4680, CL: 3500, MX: 75, UY: 150, BO: 45, CO: 10000, US: 1.80 },
  105: { PE: 20.00, AR: 9360, CL: 7000, MX: 150, UY: 300, BO: 90, CO: 20000, US: 3.60 },

  // === SPAM ===
 201: { PE: 5.50, AR: 2600, CL: 1750, MX: 37.5, UY: 75, BO: 22.5, CO: 7500, US: 2.00 },
  202: { PE: 7.50, AR: 3640, CL: 2450, MX: 52.5, UY: 105, BO: 31.5, CO: 10500, US: 3.00 },
  203: { PE: 9.50, AR: 4680, CL: 3150, MX: 67.5, UY: 135, BO: 40.5, CO: 13500, US: 4.00 },

  // === LUU DESIGN ===
  301: { PE: 3.00, AR: 1560, CL: 1050, MX: 22.5, UY: 22.5, BO: 13.5, CO: 4500, US: 2.00 },
  302: { PE: 4.00, AR: 1560, CL: 1050, MX: 22.5, UY: 22.5, BO: 13.5, CO: 4500, US: 2.00 },
 303: { PE: 3.00, AR: 1560, CL: 1050, MX: 22.5, UY: 22.5, BO: 13.5, CO: 4500, US: 2.00 },
 304: { PE: 5.00, AR: 2600, CL: 1750, MX: 37.5, UY: 75, BO: 22.5, CO: 7500, US: 2.00 },

  // === COMBO ===
  401: { PE: 15.00, AR: 7000, CL: 5000, MX: 114, UY: 210, BO: 55.5, CO: 15000, US: 4.50 },

  // === STREAMING ===
  1: { PE: 15, AR: 7800, CL: 5250, MX: 112.5, UY: 225, BO: 67.5, CO: 22500, US: 4.00 },
 4: { PE: 10, AR: 5200, CL: 3500, MX: 75, UY: 150, BO: 45, CO: 15000, US: 2.70 },
};

const MONEDA = {
  pais: "PE", // CAMBIA AQUI: PE, AR, CL, MX, UY, BO, CO, US
  simbolos: { PE: "S/", AR: "$", CL: "$", MX: "$", UY: "$", BO: "Bs", CO: "$", US: "$" }
}

const obtenerPrecio = (id) => {
  const precio = PRECIOS[id];
  return typeof precio[MONEDA.pais] === 'object'? precio[MONEDA.pais].con : precio[MONEDA.pais];
}

const obtenerPrecioDiamante = (id, stock) => {
  return PRECIOS[id][MONEDA.pais][stock? 'con' : 'sin'] || 0;
}

const formatearPrecio = (id) => {
  const precio = obtenerPrecio(id);
  const simbolo = MONEDA.simbolos[MONEDA.pais];
  return `${simbolo} ${precio.toLocaleString('es')}`
}

const formatearPrecioDiamante = (id, stock) => {
  const precio = obtenerPrecioDiamante(id, stock);
  const simbolo = MONEDA.simbolos[MONEDA.pais];
  return `${simbolo} ${precio.toLocaleString('es')}`
}