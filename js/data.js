/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Data Katalog Produk Resmi OJANK HELMET (20 Produk Sesuai Foto Pengguna)
 * Merek: AGV, Arai, Shoei, HJC
 * Kategori: Full Face & Open Face / Jet
 */

export const CATEGORIES = [
  { id: 'all', label: 'Semua Koleksi' },
  { id: 'full-face', label: 'Full Face' },
  { id: 'open-face', label: 'Open Face / Jet' }
];

export const BRANDS = ['Semua Merek', 'AGV', 'Arai', 'Shoei', 'HJC'];

export const PRODUCTS = [
  // 1. AGV Pista GP RR Mono Matte Carbon
  {
    id: 'agv-pista-gp-rr-matte',
    name: 'AGV Pista GP RR Mono Matte Carbon',
    brand: 'AGV',
    category: 'full-face',
    price: 23500000,
    image: '/assets/images/agv-pista-gp-rr-matte.jpg',
    imageAlt: 'Helm balap AGV Pista GP RR serat karbon matte dengan stiker FIM dan pro spoiler',
    description: 'Replika helm MotoGP 100% serat karbon matte yang dirancang untuk performa tertinggi di lintasan balap dunia dengan aerodinamika Pro Spoiler dan hidrasi siap pasang.',
    specification: {
      material: '100% Carbon Fiber Shell (4 shell sizes)',
      weight: '1.450 gram (± 50g)',
      certification: 'FIM Racing Homologated & ECE 22.06',
      visor: 'Visor Class 1 Optic 5mm dengan Pinlock Max Vision 120',
      retention: 'Titanium Double D-Ring',
      ventilation: '5 ventilasi logam depan & 2 ekstraktor belakang',
      sizes: ['S', 'MS', 'ML', 'L', 'XL']
    },
    featured: true
  },

  // 2. AGV Pista GP RR Forged Carbon
  {
    id: 'agv-pista-forged-carbon',
    name: 'AGV Pista GP RR Limited Forged Carbon Iridium Aqua',
    brand: 'AGV',
    category: 'full-face',
    price: 28900000,
    image: '/assets/images/agv-pista-forged-carbon.jpg',
    imageAlt: 'Helm balap langka AGV Pista GP RR forged carbon dengan visor iridium cyan aqua',
    description: 'Edisi terbatas AGV Pista GP RR dengan motif anyaman forged carbon eksklusif dipadukan visor iridium aqua-cyan dan sistem interior 360° adaptive fit.',
    specification: {
      material: '100% Forged Carbon Fiber Shell',
      weight: '1.420 gram (± 50g)',
      certification: 'FIM FRHPhe-01 & ECE 22.06 Homologation',
      visor: 'Iridium Aqua Cyan Anti-Scratch Visor Class 1 Optic',
      retention: 'Titanium Double D-Ring Anodized',
      ventilation: 'Metal air vents alloy dengan internal channeling terpadu',
      sizes: ['MS', 'ML', 'L', 'XL']
    },
    featured: true
  },

  // 3. AGV K3 New Upgrade Matte Black
  {
    id: 'agv-k3-matte-black',
    name: 'AGV K3 New Upgrade Matte Black',
    brand: 'AGV',
    category: 'full-face',
    price: 4250000,
    image: '/assets/images/agv-k3-matte-black.jpg',
    imageAlt: 'Helm full face AGV K3 New Upgrade warna hitam matte elegan',
    description: 'Evolusi terbaru helm serbaguna AGV K3 dengan profil pelindung tulang selangka, sun visor internal terintegrasi, dan cangkang termoplastik resistensi tinggi berstandar ECE 22.06.',
    specification: {
      material: 'High Resistance Thermoplastic Resin (HIR-TH)',
      weight: '1.500 gram (± 50g)',
      certification: 'ECE 22.06 & DOT Approved',
      visor: 'Ultravision 190° horizontal view + internal drop-down sun visor',
      retention: 'Steel Micrometric Clasp',
      ventilation: '4 ventilasi depan dan 1 ekstraktor belakang yang dapat diatur',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: false
  },

  // 4. AGV Pista GP R Carbon Gloss Edition
  {
    id: 'agv-pista-carbon-spec',
    name: 'AGV Pista GP R Carbon 3K Gloss Edition',
    brand: 'AGV',
    category: 'full-face',
    price: 19800000,
    image: '/assets/images/agv-pista-carbon-spec.jpg',
    imageAlt: 'Tampilan helm balap AGV Pista GP R serat karbon tenun 3K gloss mengkilap',
    description: 'Masterpiece lintasan balap sirkuit dengan cangkang serat karbon 3K mengkilap, spoiler biplano aerodinamis, dan sistem pelepasan darurat pipi (ERS).',
    specification: {
      material: '100% 3K Carbon Fiber Structure',
      weight: '1.350 gram (± 50g)',
      certification: 'ECE 22.05 / 22.06 & FIM Approved',
      visor: 'Race 3 Class Optic 1 Shield + Pinlock 120 ready',
      retention: 'Titanium Double D-Ring',
      ventilation: 'IVS (Integrated Ventilation System) logam murni',
      sizes: ['S', 'MS', 'ML', 'L']
    },
    featured: false
  },

  // 5. AGV K1 S Gothic Winter Test Graphic
  {
    id: 'agv-k1s-gothic',
    name: 'AGV K1 S Gothic Winter Test Graphic',
    brand: 'AGV',
    category: 'full-face',
    price: 3900000,
    image: '/assets/images/agv-k1s-gothic.jpg',
    imageAlt: 'Helm AGV K1 S grafis balap Gothic Winter Test kombinasi silver kuning biru',
    description: 'Helm sport harian berkarakter balap agresif dengan grafis legendaris Gothic Winter Test, spoiler aero belakang, dan sertifikasi keselamatan ECE 22.06 terkini.',
    specification: {
      material: 'High Resistance Thermoplastic Shell',
      weight: '1.500 gram (± 50g)',
      certification: 'ECE 22.06 Homologation',
      visor: 'Anti-scratch visor dengan Pinlock ready profile',
      retention: 'Double D-Ring klasik',
      ventilation: 'Ventilasi model sarang lebah dengan sirkulasi udara optimal',
      sizes: ['M', 'L', 'XL']
    },
    featured: false
  },

  // 6. Arai RX-7X Maverick Vinales Edition
  {
    id: 'arai-rx7x-vinales',
    name: 'Arai RX-7X Maverick Vinales Edition',
    brand: 'Arai',
    category: 'full-face',
    price: 14800000,
    image: '/assets/images/arai-rx7x-vinales.jpg',
    imageAlt: 'Helm balap Arai RX-7X edisi pembalap Maverick Vinales grafis merah putih biru',
    description: 'Replika resmi helm balap MotoGP Maverick Vinales dengan grafis bintang tricolor, cangkang PB-SNC2 berteknologi cakar penguat serat jaring, dan sistem visor VAS-V.',
    specification: {
      material: 'PB-SNC2 (Peripherally Belted Structural Net Composite)',
      weight: '1.550 gram (± 50g)',
      certification: 'SNELL M2020D & ECE 22.06 / JIS',
      visor: 'VAS-V Max Vision Shield dengan Pinlock Insert terpasang',
      retention: 'Stainless Steel Double D-Ring',
      ventilation: 'Diffuser Type 12 dengan IC Duct5 dan Brow Vents khas Arai',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: true
  },

  // 7. Arai RX-7V EVO Solid Pure White
  {
    id: 'arai-rx7v-white',
    name: 'Arai RX-7V EVO Solid Pure White',
    brand: 'Arai',
    category: 'full-face',
    price: 12500000,
    image: '/assets/images/arai-rx7v-white.jpg',
    imageAlt: 'Helm balap Arai RX-7V EVO warna putih mutiara solid mulus dengan spoiler belakang',
    description: 'Kesempurnaan minimalis Arai RX-7V EVO dalam warna putih solid gloss. Dilengkapi diffuser balap aerodinamis dan interior Eco-Pure antibakteri yang dapat disesuaikan.',
    specification: {
      material: 'PB-SNC2 Shell Handcrafted in Japan',
      weight: '1.560 gram (± 50g)',
      certification: 'ECE R22.06 Homologation',
      visor: 'VAS-V MV Shield dengan tuas pengunci cepat',
      retention: 'Double D-Ring klasik',
      ventilation: 'Aliran udara kontinu dengan ventilasi alis visor unik Arai',
      sizes: ['M', 'L', 'XL', 'XXL']
    },
    featured: false
  },

  // 8. Arai RX-7 RC Carbon Checkered Flag
  {
    id: 'arai-rx7-rc-carbon',
    name: 'Arai RX-7 RC Carbon Checkered Flag',
    brand: 'Arai',
    category: 'full-face',
    price: 38000000,
    image: '/assets/images/arai-rx7-rc-carbon.jpg',
    imageAlt: 'Helm super premium Arai RX-7 RC full carbon dengan motif bendera kotak catur balap',
    description: 'Kasta tertinggi perlindungan helm dunia buatan tangan master craftsman di Jepang. Menggunakan serat karbon grade kedirgantaraan Formula 1 dengan anyaman catur eksklusif.',
    specification: {
      material: 'Aircraft-grade Carbon Fiber & Zylon Reinforced Matrix',
      weight: '1.380 gram (sangat presisi dan seimbang)',
      certification: 'SNELL M2020, ECE 22.06 & FIM FRHPhe-01',
      visor: 'VAS-V Racing Shield dengan tear-off posts',
      retention: 'Titanium Double D-Ring Hand-Polished',
      ventilation: 'Diffuser Type 12 Airfoil dengan saluran udara terkompresi',
      sizes: ['M', 'L', 'XL']
    },
    featured: true
  },

  // 9. Arai VZ-RAM Dani Pedrosa Samurai Open Face
  {
    id: 'arai-vz-ram-pedrosa',
    name: 'Arai VZ-RAM Dani Pedrosa Samurai Open Face',
    brand: 'Arai',
    category: 'open-face',
    price: 9800000,
    image: '/assets/images/arai-vz-ram-pedrosa.jpg',
    imageAlt: 'Helm open face jet Arai VZ-RAM grafis Dani Pedrosa Samurai nomor 26',
    description: 'Helm open-face jet paling bergengsi di dunia dengan grafis Samurai Dani Pedrosa #26. Menggunakan diffuser balap dari seri RX-7X untuk kenyamanan turing santai nan bertenaga.',
    specification: {
      material: 'PB-cLc2 (Peripherally Belted Complex Laminate Construction)',
      weight: '1.380 gram (± 50g)',
      certification: 'SNELL & ECE 22.05 / 22.06',
      visor: 'VAS-Z Long Visor Shield dengan dudukan Pinlock',
      retention: 'Double D-Ring',
      ventilation: 'Diffuser Type 12 dengan pendinginan kepala atas maksimal',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: false
  },

  // 10. Arai RX-7X Nakasuga 21 Fire Graphic
  {
    id: 'arai-rx7x-nakasuga-fire',
    name: 'Arai RX-7X Nakasuga 21 Fire Graphic',
    brand: 'Arai',
    category: 'full-face',
    price: 15500000,
    image: '/assets/images/arai-rx7x-nakasuga-fire.png',
    imageAlt: 'Helm balap Arai RX-7X grafis api tribal graffiti Katsuyuki Nakasuga nomor 21',
    description: 'Edisi balap legenda Suzuka 8 Hours Katsuyuki Nakasuga no. 21. Memadukan grafis api graffiti dinamis, stempel Made in Japan, dan sertifikasi SNELL M2020.',
    specification: {
      material: 'PB-SNC2 High Rigid Shell Structure',
      weight: '1.560 gram (± 50g)',
      certification: 'SNELL M2020D & JIS Standard',
      visor: 'VAS-V MV Clear Shield + Pinlock Insert Ready',
      retention: 'Double D-Ring',
      ventilation: 'Diffuser Type 12 balap dengan lubang buang samping aerodinamis',
      sizes: ['M', 'L', 'XL']
    },
    featured: false
  },

  // 11. Shoei X-Fifteen Marc Marquez Ducati Edition
  {
    id: 'shoei-xfifteen-marquez-ducati',
    name: 'Shoei X-Fifteen Marc Marquez Ducati Edition',
    brand: 'Shoei',
    category: 'full-face',
    price: 17800000,
    image: '/assets/images/shoei-xfifteen-marquez-ducati.webp',
    imageAlt: 'Helm balap Shoei X-Fifteen edisi Marc Marquez MotoGP bersama sponsor Ducati Lenovo merah',
    description: 'Helm balap sirkuit flagship Shoei X-15 edisi Marc Marquez bersama Ducati Lenovo dan Estrella Galicia. Didesain untuk kestabilan kecepatan ekstrem melampaui 350 km/jam.',
    specification: {
      material: 'AIM+ (Advanced Integrated Matrix Plus Multi-Fiber)',
      weight: '1.500 gram (± 50g)',
      certification: 'ECE 22.06 & FIM FRHPhe-01 Racing Standards',
      visor: 'CWR-F2R Racing Shield dengan sistem 2-stage lock',
      retention: 'Double D-Ring racing system',
      ventilation: 'Ventilasi pipi inovatif dengan 7 lubang masuk dan 6 keluar',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: true
  },

  // 12. Shoei X-Fourteen Marquez Motegi 3 Edition
  {
    id: 'shoei-xfourteen-motegi-93',
    name: 'Shoei X-Fourteen Marquez Motegi 3 Edition',
    brand: 'Shoei',
    category: 'full-face',
    price: 14500000,
    image: '/assets/images/shoei-xfourteen-motegi-93.webp',
    imageAlt: 'Helm balap Shoei X-Fourteen edisi khusus GP Motegi Marquez nomor 93',
    description: 'Edisi legendaris GP Motegi Jepang dengan grafis semut ikonik Marc Marquez #93 berlatar merah dan navy blue, cangkang AIM+ multi-ply berkecepatan tinggi.',
    specification: {
      material: 'AIM+ 6-Layer Organic Fiber Shell',
      weight: '1.550 gram (± 50g)',
      certification: 'SNELL M2020 & DOT & ECE',
      visor: 'CWR-F Flat Racing Shield + Tear-off posts',
      retention: 'Double D-Ring',
      ventilation: 'Cheek Pad cooling air system',
      sizes: ['M', 'L', 'XL']
    },
    featured: false
  },

  // 13. Shoei Z-8 / RF-1400 Daruma TC-10 Traditional Art
  {
    id: 'shoei-daruma-japanese',
    name: 'Shoei Z-8 Daruma TC-10 Traditional Japanese Art',
    brand: 'Shoei',
    category: 'full-face',
    price: 11200000,
    image: '/assets/images/shoei-daruma-japanese.webp',
    imageAlt: 'Helm Shoei Z-8 grafis tradisional Jepang boneka Daruma ombak dan sakura',
    description: 'Helm sport-touring ultra-ringan Shoei Z-8 dengan balutan karya seni tradisional Jepang boneka Daruma, ombak samudra, dan bunga sakura yang sarat filosofi pantang menyerah.',
    specification: {
      material: 'Compact AIM Matrix Shell',
      weight: '1.380 gram (± 50g, sangat ringan)',
      certification: 'ECE 22.06 & JIS Standard',
      visor: 'CWR-F2 Center-lock shield dengan Pinlock EVO insert',
      retention: 'Double D-Ring',
      ventilation: 'High airflow dahi dan ekstraktor leher sunyi getaran',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: false
  },

  // 14. Shoei X-Fifteen Escalate TC-1 Racing Tricolor
  {
    id: 'shoei-xfifteen-tricolor',
    name: 'Shoei X-Fifteen Escalate TC-1 Racing Tricolor',
    brand: 'Shoei',
    category: 'full-face',
    price: 15200000,
    image: '/assets/images/shoei-xfifteen-tricolor.webp',
    imageAlt: 'Helm Shoei X-Fifteen Escalate grafis tricolor balap merah putih biru',
    description: 'Evolusi aerodinamika sirkuit murni Shoei X-15 dalam motif grafis Escalate balap berkecepatan tinggi. Memberikan sudut pandang atas yang lebih tinggi saat menunduk di motor sport.',
    specification: {
      material: 'AIM+ Shell with Integrated Spoiler',
      weight: '1.500 gram (± 50g)',
      certification: 'ECE 22.06 & FIM Homologation',
      visor: 'CWR-F2R Racing Shield 2D Flat dengan Pinlock 120',
      retention: 'Double D-Ring',
      ventilation: 'Individual cheek pad ventilation channels',
      sizes: ['M', 'L', 'XL']
    },
    featured: false
  },

  // 15. Shoei X-Fifteen Proxy TC-5 Stealth Camo
  {
    id: 'shoei-xfifteen-camo',
    name: 'Shoei X-Fifteen Proxy TC-5 Stealth Camo',
    brand: 'Shoei',
    category: 'full-face',
    price: 15600000,
    image: '/assets/images/shoei-xfifteen-camo.webp',
    imageAlt: 'Helm balap Shoei X-Fifteen motif militer kamuflase digital matte stealth',
    description: 'Tampilan taktis modern Shoei X-15 dalam balutan grafis militer digital camouflage matte dengan aksen abu-abu gelap, menghadirkan estetika misterius di jalan raya dan sirkuit.',
    specification: {
      material: 'AIM+ High Performance Shell',
      weight: '1.510 gram (± 50g)',
      certification: 'ECE 22.06 & FIM Racing Approved',
      visor: 'CWR-F2R Pinlock Ready Optical Class 1',
      retention: 'Double D-Ring Racing',
      ventilation: '7 inlet udara dan 6 outlet ekstraksi aerodinamis',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: false
  },

  // 16. HJC RPHA 1 MotoGP Official Racing Blue
  {
    id: 'hjc-rpha1-blue-aero',
    name: 'HJC RPHA 1 MotoGP Official Racing Blue',
    brand: 'HJC',
    category: 'full-face',
    price: 13900000,
    image: '/assets/images/hjc-rpha1-blue-aero.webp',
    imageAlt: 'Helm balap HJC RPHA 1 edisi resmi sirkuit MotoGP grafis biru aero spoiler transparan',
    description: 'Helm balap resmi standar FIM Racing FRHPhe-01 yang dikembangkan bersama pembalap MotoGP dunia. Dilengkapi spoiler aero transparan tambahan dan cangkang PIM+ Carbon Glass.',
    specification: {
      material: 'P.I.M. Plus (Premium Integrated Matrix: Carbon, Aramid, Glass Fiber)',
      weight: '1.400 gram (± 50g)',
      certification: 'FIM Racing Homologated & ECE 22.06',
      visor: 'HJ-35 Optical Class 1 Shield dengan Pinlock 120 dan Tear-Off film',
      retention: 'Double D-Ring Racing System',
      ventilation: 'ACS (Advanced Channeling System) 5 intakes & 4 exhausts',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: true
  },

  // 17. HJC RPHA 11 Pro Carbon Black Red
  {
    id: 'hjc-rpha11-carbon-red',
    name: 'HJC RPHA 11 Pro Carbon Black Red',
    brand: 'HJC',
    category: 'full-face',
    price: 8900000,
    image: '/assets/images/hjc-rpha11-carbon-red.webp',
    imageAlt: 'Helm HJC RPHA 11 cangkang full carbon serat ekspos dengan lis garis merah balap',
    description: 'Helm sirkuit dan sport teringan dari HJC dengan cangkang 100% serat karbon ekspos berbobot hanya 1.300 gram, visor gelap gratis dalam paket, dan sudut pandang perifer luas.',
    specification: {
      material: 'Full Carbon Fiber Outer Shell Construction',
      weight: '1.300 gram (sangat ringan di kelasnya)',
      certification: 'ECE 22.05 / 22.06 & DOT Approved',
      visor: 'HJ-26 Anti-fog Shield (Termasuk Dark Smoke Visor & Pinlock)',
      retention: 'Double D-Ring',
      ventilation: 'Top vent precision control wheel dengan sarung tangan',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: false
  },

  // 18. HJC RPHA 11 Pro Chakri Racing Tricolor
  {
    id: 'hjc-rpha11-chakri',
    name: 'HJC RPHA 11 Pro Chakri Racing Tricolor',
    brand: 'HJC',
    category: 'full-face',
    price: 6800000,
    image: '/assets/images/hjc-rpha11-chakri.webp',
    imageAlt: 'Helm balap HJC RPHA 11 grafis Chakri kombinasi tajam merah putih biru',
    description: 'Grafis balap Chakri yang tajam dan dinamis. Menyajikan aliran udara aerodinamis luar biasa, interior busa antibakteri MultiCool yang menyerap keringat seketika, dan emergency pads.',
    specification: {
      material: 'P.I.M. Plus Multi-Fiber Matrix Shell',
      weight: '1.350 gram (± 50g)',
      certification: 'ECE 22.05 / 22.06 Standard',
      visor: 'RapidFire II Visor Replacement System + Pinlock',
      retention: 'Double D-Ring',
      ventilation: 'Aerodynamic shell structure untuk performa kecepatan puncak',
      sizes: ['M', 'L', 'XL']
    },
    featured: false
  },

  // 19. HJC RPHA 11 Solid Nardo Silver Edition
  {
    id: 'hjc-rpha11-nardo-silver',
    name: 'HJC RPHA 11 Solid Nardo Silver Edition',
    brand: 'HJC',
    category: 'full-face',
    price: 5950000,
    image: '/assets/images/hjc-rpha11-nardo-silver.webp',
    imageAlt: 'Helm balap sport HJC RPHA 11 warna solid perak nardo dengan visor smoke hitam',
    description: 'Kombinasi kemurnian warna titanium nardo perak polos dengan visor dark smoke, menawarkan profil aerodinamis kelas dunia yang sangat disukai para penggemar street bike.',
    specification: {
      material: 'P.I.M. Plus Composite Fiber Structure',
      weight: '1.320 gram (± 50g)',
      certification: 'ECE 22.05 / 22.06 Approved',
      visor: 'HJ-26 MaxVision Pinlock Included + Dark Visor',
      retention: 'Double D-Ring',
      ventilation: 'Advanced channeling system tanpa turbulensi',
      sizes: ['S', 'M', 'L', 'XL']
    },
    featured: false
  },

  // 20. HJC i11 Sport Touring Red Black
  {
    id: 'hjc-i11-red-black',
    name: 'HJC i11 Sport Touring Red Black',
    brand: 'HJC',
    category: 'full-face',
    price: 3450000,
    image: '/assets/images/hjc-i11-red-black.webp',
    imageAlt: 'Helm sport touring HJC i11 warna merah hitam dengan visor bening dan sun visor internal',
    description: 'Pilihan helm sport-touring bernilai tinggi dengan sertifikasi keselamatan terbaru ECE 22.06, sun visor gelap internal yang mudah dioperasikan, dan slot siap interkom.',
    specification: {
      material: 'Advanced Polycarbonate Composite Shell',
      weight: '1.580 gram (± 50g)',
      certification: 'ECE 22.06 Homologation',
      visor: 'HJ-38 Visor Pinlock Ready + Integrated IS-11 Sun Shield',
      retention: 'Micro Buckle Quick Release System',
      ventilation: 'Full front-to-back airflow ventilation system',
      sizes: ['M', 'L', 'XL']
    },
    featured: false
  }
];

/**
 * Helper mencari produk berdasarkan ID
 * @param {string} id
 * @returns {object|undefined}
 */
export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
