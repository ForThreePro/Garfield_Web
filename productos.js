const productos = [
  // DIAMANTES CON STOCK
  {cat: 'Diamantes Con Stock', name: '110💎', prices: {PEN:2.50, CLP:875, ARS:1300, MXN:18.75, BOB:11.25, UYU:37.5, USD:0.67, COP:250}},
  {cat: 'Diamantes Con Stock', name: '341💎', prices: {PEN:7.00, CLP:2450, ARS:3380, MXN:52.50, BOB:31.5, UYU:105, USD:1.87, COP:700}},
  {cat: 'Diamantes Con Stock', name: '572💎', prices: {PEN:12.00, CLP:4200, ARS:5720, MXN:90, BOB:54, UYU:180, USD:3.20, COP:1200}},
  {cat: 'Diamantes Con Stock', name: '1166💎', prices: {PEN:20.00, CLP:7000, ARS:9880, MXN:150, BOB:90, UYU:300, USD:5.34, COP:2000}},
  {cat: 'Diamantes Con Stock', name: '2398💎', prices: {PEN:36.00, CLP:12600, ARS:18200, MXN:270, BOB:162, UYU:540, USD:9.61, COP:3600}},
  {cat: 'Diamantes Con Stock', name: '6160💎', prices: {PEN:92.00, CLP:32200, ARS:46800, MXN:690, BOB:414, UYU:1380, USD:24.56, COP:9200}},

  // DIAMANTES SIN STOCK
  {cat: 'Diamantes Sin Stock', name: '110💎', prices: {PEN:3.50, CLP:1225, ARS:1820, MXN:26.25, BOB:15.75, UYU:52.5, USD:0.93, COP:350}},
  {cat: 'Diamantes Sin Stock', name: '341💎', prices: {PEN:10.00, CLP:3500, ARS:4680, MXN:75, BOB:45, UYU:150, USD:2.67, COP:1000}},
  {cat: 'Diamantes Sin Stock', name: '572💎', prices: {PEN:15.00, CLP:5250, ARS:7800, MXN:112.5, BOB:67.5, UYU:225, USD:4.00, COP:1500}},
  {cat: 'Diamantes Sin Stock', name: '1166💎', prices: {PEN:26.00, CLP:9100, ARS:13520, MXN:195, BOB:117, UYU:390, USD:6.94, COP:2600}},
  {cat: 'Diamantes Sin Stock', name: '2398💎', prices: {PEN:52.00, CLP:18200, ARS:27040, MXN:390, BOB:234, UYU:780, USD:13.88, COP:5200}},
  {cat: 'Diamantes Sin Stock', name: '6160💎', prices: {PEN:126.00, CLP:44100, ARS:65520, MXN:945, BOB:567, UYU:1890, USD:33.64, COP:12600}},

  // DESIGN
  {cat: 'Design', name: 'Tex Logo y Logos', prices: {PEN:3, CLP:1050, ARS:1560, MXN:22.5, BOB:13.5, UYU:22.5, USD:2, COP:4500}},
  {cat: 'Design', name: 'Plantillas 2x1', prices: {PEN:4, CLP:1050, ARS:1560, MXN:22.5, BOB:13.5, UYU:22.5, USD:2, COP:4500}},
  {cat: 'Design', name: 'Caligráficos 2x1', prices: {PEN:3, CLP:1050, ARS:1560, MXN:22.5, BOB:13.5, UYU:22.5, USD:2, COP:4500}},
  {cat: 'Design', name: 'Jersey', prices: {PEN:5, CLP:1750, ARS:2600, MXN:37.5, BOB:22.5, UYU:75, USD:2, COP:7500}},

  // COMBO DECANA
  {cat: 'Combo Decana', name: 'Contrato Semanal', prices: {PEN:15, CLP:5000, ARS:7000, MXN:114, BOB:55.5, UYU:210, USD:4.00, COP:1500}},

  // SPAM
  {cat: 'Spam', name: '3 dias', prices: {PEN:5.50, CLP:1750, ARS:2600, MXN:37.5, BOB:22.5, UYU:75, USD:2, COP:7500}},
  {cat: 'Spam', name: '5 dias', prices: {PEN:7.50, CLP:2450, ARS:3640, MXN:52.5, BOB:31.5, UYU:105, USD:3, COP:10500}},
  {cat: 'Spam', name: '1 semana', prices: {PEN:9.50, CLP:3150, ARS:4680, MXN:67.5, BOB:40.5, UYU:135, USD:4, COP:13500}},

  // SEGUIDORES IG
  {cat: 'Seguidores IG', name: '250 Seguidores', prices: {PEN:1.50, CLP:525, ARS:520, MXN:11.25, BOB:6.75, UYU:22.5, USD:0.40, COP:1500}},
  {cat: 'Seguidores IG', name: '500 Seguidores', prices: {PEN:2.50, CLP:875, ARS:1040, MXN:18.75, BOB:11.25, UYU:37.5, USD:0.67, COP:2500}},
  {cat: 'Seguidores IG', name: '1000 Seguidores', prices: {PEN:5, CLP:1750, ARS:2080, MXN:37.5, BOB:22.5, UYU:75, USD:1.34, COP:5000}},
  {cat: 'Seguidores IG', name: '2000 Seguidores', prices: {PEN:10, CLP:3500, ARS:4680, MXN:75, BOB:45, UYU:150, USD:2.67, COP:10000}},
  {cat: 'Seguidores IG', name: '5000 Seguidores', prices: {PEN:20, CLP:7000, ARS:9360, MXN:150, BOB:90, UYU:300, USD:5.34, COP:20000}}
];