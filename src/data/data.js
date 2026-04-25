// src/data/data.js
// export const listingsData = [
//   // === Dar El Bahia - Alger ===
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },
//   { id: 1, name: 'Dar El Bahia', location: 'Alger, Algérie', price: 11500, rating: 4.92, reviews: 134, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=60', tags: ['Vue mer', 'Terrasse', 'WiFi'], badge: 'New', category: 'villa' },

//   // === Riad Casbah - Alger Centre ===
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1507038772120-7fff76f79d79?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },
//   { id: 2, name: 'Riad Casbah', location: 'La Casbah, Alger', price: 7500, rating: 4.89, reviews: 278, img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop&q=60', tags: ['Patio', 'Traditionnel', 'Climatisé'], badge: null, category: 'city' },

//   // === Villa Atlas - Oran ===
//   { id: 3, name: 'Villa Atlas', location: 'Oran, Algérie', price: 16000, rating: 4.96, reviews: 89, img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&auto=format&fit=crop&q=60', tags: ['Piscine', 'Jardin', 'Parking'], badge: 'Top Rated', category: 'villa' },
//   { id: 3, name: 'Villa Atlas', location: 'Oran, Algérie', price: 16000, rating: 4.96, reviews: 89, img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60', tags: ['Piscine', 'Jardin', 'Parking'], badge: 'Top Rated', category: 'villa' },
//   { id: 3, name: 'Villa Atlas', location: 'Oran, Algérie', price: 16000, rating: 4.96, reviews: 89, img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop&q=60', tags: ['Piscine', 'Jardin', 'Parking'], badge: 'Top Rated', category: 'villa' },
//   { id: 3, name: 'Villa Atlas', location: 'Oran, Algérie', price: 16000, rating: 4.96, reviews: 89, img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=600&auto=format&fit=crop&q=60', tags: ['Piscine', 'Jardin', 'Parking'], badge: 'Top Rated', category: 'villa' },
//   { id: 3, name: 'Villa Atlas', location: 'Oran, Algérie', price: 16000, rating: 4.96, reviews: 89, img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop&q=60', tags: ['Piscine', 'Jardin', 'Parking'], badge: 'Top Rated', category: 'villa' },
//   { id: 3, name: 'Villa Atlas', location: 'Oran, Algérie', price: 16000, rating: 4.96, reviews: 89, img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop&q=60', tags: ['Piscine', 'Jardin', 'Parking'], badge: 'Top Rated', category: 'villa' },

//   // === Gîte Djurdjura - Tizi Ouzou ===
//   { id: 4, name: 'Gîte Djurdjura', location: 'Tizi Ouzou, Algérie', price: 5500, rating: 4.87, reviews: 356, img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&auto=format&fit=crop&q=60', tags: ['Montagne', 'Nature', 'Randonnée'], badge: null, category: 'mountain' },
//   { id: 4, name: 'Gîte Djurdjura', location: 'Tizi Ouzou, Algérie', price: 5500, rating: 4.87, reviews: 356, img: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&auto=format&fit=crop&q=60', tags: ['Montagne', 'Nature', 'Randonnée'], badge: null, category: 'mountain' },
//   { id: 4, name: 'Gîte Djurdjura', location: 'Tizi Ouzou, Algérie', price: 5500, rating: 4.87, reviews: 356, img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60', tags: ['Montagne', 'Nature', 'Randonnée'], badge: null, category: 'mountain' },
//   { id: 4, name: 'Gîte Djurdjura', location: 'Tizi Ouzou, Algérie', price: 5500, rating: 4.87, reviews: 356, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&auto=format&fit=crop&q=60', tags: ['Montagne', 'Nature', 'Randonnée'], badge: null, category: 'mountain' },
//   { id: 4, name: 'Gîte Djurdjura', location: 'Tizi Ouzou, Algérie', price: 5500, rating: 4.87, reviews: 356, img: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=600&auto=format&fit=crop&q=60', tags: ['Montagne', 'Nature', 'Randonnée'], badge: null, category: 'mountain' },
//   { id: 4, name: 'Gîte Djurdjura', location: 'Tizi Ouzou, Algérie', price: 5500, rating: 4.87, reviews: 356, img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=60', tags: ['Montagne', 'Nature', 'Randonnée'], badge: null, category: 'mountain' },

//   // === Maison Sahara - Tamanrasset ===
//   { id: 5, name: 'Maison Sahara', location: 'Tamanrasset, Algérie', price: 8800, rating: 4.95, reviews: 112, img: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&auto=format&fit=crop&q=60', tags: ['Désert', 'Étoiles', 'Excursions'], badge: 'New', category: 'villa' },
//   { id: 5, name: 'Maison Sahara', location: 'Tamanrasset, Algérie', price: 8800, rating: 4.95, reviews: 112, img: 'https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?w=600&auto=format&fit=crop&q=60', tags: ['Désert', 'Étoiles', 'Excursions'], badge: 'New', category: 'villa' },
//   { id: 5, name: 'Maison Sahara', location: 'Tamanrasset, Algérie', price: 8800, rating: 4.95, reviews: 112, img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop&q=60', tags: ['Désert', 'Étoiles', 'Excursions'], badge: 'New', category: 'villa' },
//   { id: 5, name: 'Maison Sahara', location: 'Tamanrasset, Algérie', price: 8800, rating: 4.95, reviews: 112, img: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=600&auto=format&fit=crop&q=60', tags: ['Désert', 'Étoiles', 'Excursions'], badge: 'New', category: 'villa' },
//   { id: 5, name: 'Maison Sahara', location: 'Tamanrasset, Algérie', price: 8800, rating: 4.95, reviews: 112, img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&auto=format&fit=crop&q=60', tags: ['Désert', 'Étoiles', 'Excursions'], badge: 'New', category: 'villa' },
//   { id: 5, name: 'Maison Sahara', location: 'Tamanrasset, Algérie', price: 8800, rating: 4.95, reviews: 112, img: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&auto=format&fit=crop&q=60', tags: ['Désert', 'Étoiles', 'Excursions'], badge: 'New', category: 'villa' },

//   // === Appartement Centre - Constantine ===
//   { id: 6, name: 'Appartement Rocher', location: 'Constantine, Algérie', price: 4800, rating: 4.84, reviews: 523, img: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&auto=format&fit=crop&q=60', tags: ['Vue pont', 'Central', 'Confortable'], badge: null, category: 'city' },

//   // === Chalet Aurès - Batna ===
//   { id: 7, name: 'Chalet Aurès', location: 'Batna, Algérie', price: 6800, rating: 4.91, reviews: 198, img: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&auto=format&fit=crop&q=60', tags: ['Forêt', 'Calme', 'Cheminée'], badge: null, category: 'cabin' },

//   // === Villa Bord de Mer - Annaba ===
//   { id: 8, name: 'Villa Seybouse', location: 'Annaba, Algérie', price: 12800, rating: 4.93, reviews: 307, img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&auto=format&fit=crop&q=60', tags: ['Plage', 'Piscine', 'Barbecue'], badge: 'Top Rated', category: 'city' },
// ];
export const listingsData = [
  // Algiers
  {
    id: 1,
    name: 'Modern Apartment in Algiers',
    location: 'Algiers, Algeria',
    price: 7500,
    rating: 4.8,
    reviews: 54,
    img: 'https://images.unsplash.com/photo-1600585154340-1e4b3b1d1d9a',
    tags: ['Wi-Fi', 'Furnished', 'Near Metro'],
    badge: 'New',
    category: 'apartment'
  },
  {
    id: 2,
    name: 'Luxury Penthouse in Algiers',
    location: 'Algiers, Algeria',
    price: 20000,
    rating: 4.95,
    reviews: 12,
    img: 'https://images.unsplash.com/photo-1617098709804-705581f844eb',
    tags: ['Sea View', 'Terrace', 'Modern'],
    badge: 'Premium',
    category: 'apartment'
  },
  {
    id: 3,
    name: 'Family House in Hydra',
    location: 'Algiers, Algeria',
    price: 9500,
    rating: 4.7,
    reviews: 38,
    img: 'https://images.unsplash.com/photo-1635108201275-f2858f087bd9',
    tags: ['Garden', 'Garage', 'Quiet'],
    badge: null,
    category: 'house'
  },
  {
    id: 4,
    name: 'Traditional House in El Harrach',
    location: 'Algiers, Algeria',
    price: 7200,
    rating: 4.5,
    reviews: 26,
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    tags: ['Courtyard', 'Family', 'Affordable'],
    badge: null,
    category: 'house'
  },

  // Oran
  {
    id: 5,
    name: 'Seaside Villa in Oran',
    location: 'Oran, Algeria',
    price: 12000,
    rating: 4.9,
    reviews: 87,
    img: 'https://images.unsplash.com/photo-1600585154340-1e4b3b1d1d9a',
    tags: ['Sea View', 'Pool', 'Family'],
    badge: 'Top Rated',
    category: 'villa'
  },
  {
    id: 6,
    name: 'Apartment near Oran Port',
    location: 'Oran, Algeria',
    price: 6500,
    rating: 4.6,
    reviews: 33,
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39',
    tags: ['Central', 'Balcony', 'Parking'],
    badge: null,
    category: 'apartment'
  },
  {
    id: 7,
    name: 'Traditional House in Oran Suburbs',
    location: 'Oran, Algeria',
    price: 7000,
    rating: 4.7,
    reviews: 29,
    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    tags: ['Courtyard', 'Family', 'Quiet'],
    badge: null,
    category: 'house'
  },
  {
    id: 8,
    name: 'Family House near Ain El Turk',
    location: 'Oran, Algeria',
    price: 8800,
    rating: 4.8,
    reviews: 34,
    img: 'https://images.unsplash.com/photo-1635108201418-0996823f4cc3',
    tags: ['Sea View', 'Garden', 'Garage'],
    badge: null,
    category: 'house'
  },

  // Constantine
  {
    id: 9,
    name: 'Student Studio in Constantine',
    location: 'Constantine, Algeria',
    price: 3500,
    rating: 4.6,
    reviews: 32,
    img: 'https://images.unsplash.com/photo-1617103908936-1a1b1b1b1b1b',
    tags: ['Close to University', 'Furnished', 'Budget'],
    badge: null,
    category: 'student'
  },
  {
    id: 10,
    name: 'Apartment near Suspension Bridge',
    location: 'Constantine, Algeria',
    price: 5500,
    rating: 4.5,
    reviews: 21,
    img: 'https://images.unsplash.com/photo-1608198399988-341f712c3711',
    tags: ['Historic View', 'Balcony', 'Wi-Fi'],
    badge: 'New',
    category: 'apartment'
  },
  {
    id: 11,
    name: 'Family House in Constantine',
    location: 'Constantine, Algeria',
    price: 6000,
    rating: 4.7,
    reviews: 27,
    img: 'https://images.unsplash.com/photo-1635108201275-f2858f087bd9',
    tags: ['Courtyard', 'Family', 'Quiet'],
    badge: null,
    category: 'house'
  },
  {
    id: 12,
    name: 'House near Constantine Old Town',
    location: 'Constantine, Algeria',
    price: 6400,
    rating: 4.6,
    reviews: 19,
    img: 'https://images.unsplash.com/photo-1675409145919-277c0fc2aa7d',
    tags: ['Historic', 'Family', 'Garage'],
    badge: null,
    category: 'house'
  },

  // Tlemcen
  {
    id: 13,
    name: 'Traditional House in Tlemcen',
    location: 'Tlemcen, Algeria',
    price: 5000,
    rating: 4.7,
    reviews: 41,
    img: 'https://images.unsplash.com/photo-1617103908936-1a1b1b1b1b1b',
    tags: ['Historic', 'Courtyard', 'Quiet'],
    badge: null,
    category: 'house'
  },
  {
    id: 14,
    name: 'Apartment near Tlemcen University',
    location: 'Tlemcen, Algeria',
    price: 4800,
    rating: 4.4,
    reviews: 18,
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200',
    tags: ['Close to Campus', 'Furnished', 'Budget'],
    badge: null,
    category: 'student'
  },
  {
    id: 15,
    name: 'Villa with Garden in Tlemcen',
    location: 'Tlemcen, Algeria',
    price: 9500,
    rating: 4.85,
    reviews: 36,
    img: 'https://images.unsplash.com/photo-1675409145919-277c0fc2aa7d',
    tags: ['Garden', 'Family', 'Spacious'],
    badge: 'Top Rated',
    category: 'villa'
  },
  {
    id: 16,
    name: 'House in Mansourah District',
    location: 'Tlemcen, Algeria',
    price: 7200,
    rating: 4.6,
    reviews: 23,
    img: 'https://images.unsplash.com/photo-1635108201418-0996823f4cc3',
    tags: ['Courtyard', 'Family', 'Garage'],
    badge: null,
    category: 'house'
  },

  // Sétif
  {
    id: 17,
    name: 'Family Apartment in Sétif',
    location: 'Sétif, Algeria',
    price: 6000,
    rating: 4.5,
    reviews: 28,
    img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200',
    tags: ['3 Bedrooms', 'Balcony', 'Parking'],
    badge: null,
    category: 'apartment'
  },
  {
    id: 18,
    name: 'Budget Room in Sétif',
    location: 'Sétif, Algeria',
    price: 2500,
    rating: 4.2,
    reviews: 17,
    img: 'https://images.unsplash.com/photo-1608198399988-341f712c3711',
    tags: ['Single Room', 'Wi-Fi', 'Affordable'],
    badge: null,
    category: 'student'
  },
  {
    id: 19,
    name: 'House with Garden in Sétif',
    location: 'Sétif, Algeria',
    price: 7500,
    rating: 4.6,
    reviews: 24,
    img: 'https://images.unsplash.com/photo-1635108201418-0996823f4cc3',
    tags: ['Garden', 'Family', 'Garage'],
    badge: null,
    category: 'house'
  },
];


export const experiencesData = [
  { title: 'Truffle Hunt & Feast', host: 'Hosted by Marco', price: 95, rating: 4.98, reviews: 203, duration: '4 hours', img: 'https://picsum.photos/id/124/400/400' },
  { title: 'Sunset Sail & Wine', host: 'Hosted by Elena', price: 120, rating: 4.97, reviews: 158, duration: '3 hours', img: 'https://picsum.photos/id/23/400/400' },
  { title: 'Kyoto Tea Ceremony', host: 'Hosted by Yuki', price: 65, rating: 4.99, reviews: 341, duration: '2 hours', img: 'https://picsum.photos/id/125/400/400' },
  { title: 'Favela Street Art Tour', host: 'Hosted by Diego', price: 45, rating: 4.92, reviews: 589, duration: '3.5 hours', img: 'https://picsum.photos/id/126/400/400' },
];

export const testimonialsData = [
  {
    rating: 5,
    text: "When my family wanted to spend a week in another wilaya, we had to rely on Facebook groups and endless phone calls. It took days to find something reliable.",
    name: "Family from Constantine",
    loc: "Constantine, Algeria",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    rating: 4,
    text: "During my Sonatrach internship, I struggled to find a short-term rental. Agencies were expensive, and there was no trusted platform to compare options.",
    name: "Engineering Student",
    loc: "Algiers, Algeria",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    rating: 5,
    text: "For my residency exam, I had to travel to Oran. Finding a safe and affordable apartment was stressful without a centralized solution.",
    name: "Medical Student",
    loc: "Oran, Algeria",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    rating: 4,
    text: "I needed housing for a seminar. Hotels were too costly, and I wished there was a simple app to connect me directly with local hosts.",
    name: "Professional",
    loc: "Béjaïa, Algeria",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];
