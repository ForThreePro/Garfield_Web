const productos = [
  // === DIAMANTES 💎 ===
  { id: 501, cat: "Diamantes", name: "110 Diamantes", rating: 5.0 },
  { id: 502, cat: "Diamantes", name: "341 Diamantes", rating: 5.0 },
  { id: 503, cat: "Diamantes", name: "572 Diamantes", rating: 5.0 },
  { id: 504, cat: "Diamantes", name: "1166 Diamantes", rating: 5.0 },
  { id: 505, cat: "Diamantes", name: "2398 Diamantes", rating: 5.0 },
  { id: 506, cat: "Diamantes", name: "6160 Diamantes", rating: 5.0 },

  // === INSTAGRAM SEGUIDORES ===
  { id: 101, cat: "Instagram", name: "250 Seguidores Instagram", rating: 4.9 },
  { id: 102, cat: "Instagram", name: "500 Seguidores Instagram", rating: 4.9 },
  { id: 103, cat: "Instagram", name: "1000 Seguidores Instagram", rating: 4.9, discount: 10 },
  { id: 104, cat: "Instagram", name: "2000 Seguidores Instagram", rating: 5.0, discount: 15 },
  { id: 105, cat: "Instagram", name: "5000 Seguidores Instagram", rating: 5.0, discount: 20 },

  // === SPAM ===
  { id: 201, cat: "Spam", name: "Spam 3 Días", desc: "3 horas al día", rating: 5.0 },
  { id: 202, cat: "Spam", name: "Spam 5 Días", desc: "3 horas al día", rating: 5.0 },
  { id: 203, cat: "Spam", name: "Spam 1 Semana", desc: "3 horas al día", rating: 5.0, discount: 5 },

  // === LUU DESIGN 🩵 ===
  { id: 301, cat: "Luu Design", name: "Text Logo y Logos", rating: 4.9 },
  { id: 302, cat: "Luu Design", name: "Plantillas 2x1", rating: 4.9 },
  { id: 303, cat: "Luu Design", name: "Caligráficos 2x1", rating: 4.9 },
  { id: 304, cat: "Luu Design", name: "Jersey", rating: 5.0 },

  // === COMBO DECANA LUU 🎀 ===
  { id: 401, cat: "Combo", name: "Contrato Semanal Decana Luu", rating: 5.0, discount: 25,
    desc: "Busca vs diario + Reclutamiento + Editar vs ganado + Spam de reclu" },

  // === STREAMING ===
  { id: 1, cat: "Streaming", name: "Netflix Premium 1 Pantalla", rating: 4.9, old: 20, discount: 25 },
  { id: 4, cat: "Música", name: "Spotify Premium Individual", rating: 4.9, old: 14, discount: 29 },
];

const categorias = ["Todos","Diamantes","Instagram","Spam","Luu Design","Combo","Streaming","Música"];