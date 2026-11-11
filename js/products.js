const products = [
  { 
    id: 'prunex', 
    name: 'Prunex 1', 
    price: 138100, 
    priceLarge: 138100, 
    phase: 'Fase 1: Limpieza Intestinal', 
    category: 'Limpieza', 
    description: 'Limpia el colon y combate el estreñimiento. Alto contenido de fibra.', 
    color: '#2D5A3D',
    servings: '28 sobres',
    image: 'img/products/prunex.jpg'
  },
  { 
    id: 'floraliv', 
    name: 'Flora Liv', 
    price: 165400, 
    priceLarge: 165400, 
    phase: 'Fase 2: Flora Intestinal', 
    category: 'Probióticos', 
    description: 'Regenera y equilibra la flora intestinal. 10 mil millones de probióticos por toma.', 
    color: '#C07850',
    servings: '28 sobres',
    image: 'img/products/floraliv.jpg'
  },
  { 
    id: 'rexet', 
    name: 'Rexet', 
    price: 138100, 
    priceLarge: null, 
    phase: 'Fase 3: Detox Hepático', 
    category: 'Detox', 
    description: 'Protege y desintoxica tu hígado de manera natural.', 
    color: '#D4C5A9',
    servings: '28 sobres',
    image: 'img/products/rexet.jpg'
  },
  { 
    id: 'vitta', 
    name: 'Vita Xtra T+', 
    price: 138100, 
    priceLarge: 138100, 
    phase: 'Fase 4: Energía y Vitalidad', 
    category: 'Energía', 
    description: 'Energía prolongada, reduce la fatiga y fortalece el sistema inmunológico.', 
    color: '#1E3F2B',
    servings: '28 sobres',
    image: 'img/products/vitta.jpg'
  }
];

function formatPrice(price) {
  return '$' + Number(price).toLocaleString('es-CO');
}
