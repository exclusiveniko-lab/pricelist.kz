import { Product } from '../types';

export const productsData: Product[] = [
  // Page 1: Power Banks & Chargers
  {
    id: "TFB-N137",
    model: "TFB-N137",
    category: "Power Bank",
    images: [
      "https://picsum.photos/seed/TFB-N137/400/400",
      "https://picsum.photos/seed/TFB-N137-pkg/400/400",
      "https://picsum.photos/seed/TFB-N137-side/400/400",
    ],
    color: "Black",
    price: 2010, // 33.5 * 60
    parameters: ["22.5W Fast Charging", "10000mAh Capacity", "PD 20W Two-way Fast Charge", "LED Display"],
    cartonInfo: "BOX: 60*37.5*27.5, CTN/112PCS",
    stockQuantity: 150
  },
  {
    id: "TFB-N126",
    model: "TFB-N126",
    category: "Power Bank",
    images: [
      "https://picsum.photos/seed/TFB-N126/400/400",
      "https://picsum.photos/seed/TFB-N126-pkg/400/400",
    ],
    color: "Black/White",
    price: 2490, // 41.5 * 60
    parameters: ["22.5W Super Fast Charging", "20000mAh Capacity", "PD20W fast charging", "Comes with cable"],
    cartonInfo: "BOX: 60*37.5*27.5, CTN/72PCS",
    stockQuantity: 80
  },
   {
    id: "TFB-N95",
    model: "TFB-N95",
    category: "Power Bank",
    images: [
      "https://picsum.photos/seed/TFB-N95/400/400",
      "https://picsum.photos/seed/TFB-N95-pkg/400/400",
      "https://picsum.photos/seed/TFB-N95-cable/400/400",
    ],
    color: "White",
    price: 1920, // 32.0 * 60
    parameters: ["10000mAh Capacity", "Comes with Lightning & Type-C Cable", "PD20W fast charging"],
    cartonInfo: "BOX: 60*37.5*27.5, CTN/112PCS",
    stockQuantity: 0
  },

  // Page 2: Cables
  {
    id: "TC-41S",
    model: "TC-41S",
    category: "Cable",
    images: [
      "https://picsum.photos/seed/TC-41S/400/400",
      "https://picsum.photos/seed/TC-41S-pkg/400/400",
    ],
    color: "White",
    price: 132, // 2.2 * 60
    parameters: ["1.2m Fast Charge", "Data Cable", "Lightning/Micro/Type-C"],
    cartonInfo: "Small Box:49*37*24.5 100PCS, Big Box:51*39*51 400PCS",
    stockQuantity: 1200
  },
  {
    id: "TC-300M",
    model: "TC-300M",
    category: "Cable",
    images: [
      "https://picsum.photos/seed/TC-300M/400/400",
      "https://picsum.photos/seed/TC-300M-pkg/400/400",
    ],
    color: "White",
    price: 60, // 1.0 * 60
    parameters: ["1.0m Fast Charge", "Data Cable", "Lightning/Micro/Type-C"],
    cartonInfo: "Small Box:49*37*24.5 100PCS, Big Box:51*39*51 400PCS",
    stockQuantity: 3000
  },
  {
    id: "TC-2081C",
    model: "TC-2081C",
    category: "Cable",
    images: [
      "https://picsum.photos/seed/TC-2081C/400/400",
      "https://picsum.photos/seed/TC-2081C-pkg/400/400",
    ],
    color: "Black",
    price: 240, // 4.0 * 60
    parameters: ["1.2m Aluminum alloy", "Nylon cable", "Type-C to Lightning"],
    cartonInfo: "Small Box:49*37*24.5 50PCS, Big Box:51*39*51 200PCS",
    stockQuantity: 500
  },
  
  // Page 3: Chargers
  {
    id: "TTC-723(GAN)",
    model: "TTC-723(GAN)",
    category: "Charger",
    images: [
      "https://picsum.photos/seed/TTC-723/400/400",
      "https://picsum.photos/seed/TTC-723-pkg/400/400",
    ],
    color: "Black",
    price: 960, // 16.0 * 60
    parameters: ["30W GAN Charger", "QC3.0 PD Fast Charge", "UK/EU/US Plug"],
    cartonInfo: "BOX: 44*36*43.5, CTN/300PCS",
    stockQuantity: 450
  },
  {
    id: "TTC-F380(QC)",
    model: "TTC-F380(QC)",
    category: "Charger",
    images: [
      "https://picsum.photos/seed/TTC-F380/400/400",
      "https://picsum.photos/seed/TTC-F380-pkg/400/400",
    ],
    color: "White",
    price: 606, // 10.1 * 60
    parameters: ["QC3.0 1USB+PD20W", "Type-C Fast Charge", "UK/EU/US Plug"],
    cartonInfo: "BOX: 44*36*43.5, CTN/400PCS",
    stockQuantity: 0
  },
  
  // Page 4: Audio
  {
    id: "TW-S09",
    model: "TW-S09",
    category: "Earbuds",
    images: [
      "https://picsum.photos/seed/TW-S09/400/400",
      "https://picsum.photos/seed/TW-S09-pkg/400/400",
    ],
    color: "Black",
    price: 1500, // 25.0 * 60
    parameters: ["Bluetooth v5.3", "Battery 230mAh+30mAh*2", "Playing time: 4-5 hours", "ENC noise reduction"],
    cartonInfo: "BOX: 47*42*35.5, CTN/100PCS",
    stockQuantity: 200
  },
  {
    id: "TW-05",
    model: "TW-05",
    category: "Earbuds",
    images: [
      "https://picsum.photos/seed/TW-05/400/400",
      "https://picsum.photos/seed/TW-05-pkg/400/400",
    ],
    color: "White",
    price: 1620, // 27.0 * 60
    parameters: ["Bluetooth v5.0", "Operating distance 10 meters", "Charging box 250mAh"],
    cartonInfo: "BOX: 47*42*35.5, CTN/100PCS",
    stockQuantity: 250
  },

  // Page 5: Holders
  {
    id: "TCB-812",
    model: "TCB-812",
    category: "Holder",
    images: [
      "https://picsum.photos/seed/TCB-812/400/400",
      "https://picsum.photos/seed/TCB-812-pkg/400/400",
    ],
    color: "Black/White",
    price: 564, // 9.4 * 60
    parameters: ["Metal Desktop Shelf", "For Phone/Tablet", "Aluminum alloy"],
    cartonInfo: "BOX: 57.5*37.5*46, CTN/104PCS, CTN/27.4KG",
    stockQuantity: 300
  },
  {
    id: "TCC-F01",
    model: "TCC-F01",
    category: "Car Charger",
    images: [
      "https://picsum.photos/seed/TCC-F01/400/400",
      "https://picsum.photos/seed/TCC-F01-pkg/400/400",
    ],
    color: "Black",
    price: 864, // 14.4 * 60
    parameters: ["Quick charging output", "5V/3.1A, 9V/2A, 12V/1.5A", "Pure metal shell", "Supports QC3.0, AFC, FCP"],
    cartonInfo: "Big Box: 72*35.5*58.5, 240PCS, CTN/17.4KG",
    stockQuantity: 180
  },

  // Page 6: Tripods
  {
    id: "TRS-1207",
    model: "TRS-1207",
    category: "Tripod",
    images: [
      "https://picsum.photos/seed/TRS-1207/400/400",
      "https://picsum.photos/seed/TRS-1207-pkg/400/400",
    ],
    color: "Black",
    price: 1146, // 19.1 * 60
    parameters: ["Weight: 332g", "Material: Nylon GF+Aluminum", "Max Length: 170cm", "Remote Range: 10m"],
    cartonInfo: "BOX: 40.5*33*40.5, CTN/48PCS, CTN/17.8KG",
    stockQuantity: 95
  },
  {
    id: "TTS-1001",
    model: "TTS-1001",
    category: "Tripod",
    images: [
      "https://picsum.photos/seed/TTS-1001/400/400",
      "https://picsum.photos/seed/TTS-1001-pkg/400/400",
    ],
    color: "Black",
    price: 2100, // 35.0 * 60
    parameters: ["1.3 Meters enhanced tripod", "2kg load bearing", "For mobile phone or camera"],
    cartonInfo: "BOX 47*38*46, CTN/20PCS, CTN/17KG",
    stockQuantity: 60
  },

  // Page 8: Power Sockets
  {
    id: "TPS-901",
    model: "TPS-901",
    category: "Power Socket",
    images: [
      "https://picsum.photos/seed/TPS-901/400/400",
      "https://picsum.photos/seed/TPS-901-pkg/400/400",
    ],
    color: "White",
    price: 2400, // 40.0 * 60
    parameters: ["3000W-16A", "110-265V", "USB Output: DC 5V 3.1A", "Material: PC"],
    cartonInfo: "BOX: 63.5*46.5*49, CTN/50pcs, CTN/29KG",
    stockQuantity: 100
  },
  {
    id: "TPS-902",
    model: "TPS-902",
    category: "Power Socket",
    images: [
      "https://picsum.photos/seed/TPS-902/400/400",
      "https://picsum.photos/seed/TPS-902-pkg/400/400",
    ],
    color: "White",
    price: 2778, // 46.3 * 60
    parameters: ["38W Total Output", "QC 3.0 Output", "USB-C 20W", "Fireproof, Overload protection"],
    cartonInfo: "BOX: 53*49.5*46.5, CTN/50pcs, CTN/29KG",
    stockQuantity: 75
  },
  
  // --- Start of Additional 100 Products ---
  
  // More Power Banks (15)
  ...Array.from({ length: 15 }, (_, i) => {
    const model = `TFB-M${200 + i}`;
    const capacity = 10000 + (i % 3) * 10000; // 10k, 20k, 30k
    const power = 22.5 + (i % 4) * 5; // 22.5W, 27.5W, 32.5W, 37.5W
    return {
      id: model,
      model,
      category: "Power Bank",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`,
        `https://picsum.photos/seed/${model}-alt/400/400`
      ],
      color: i % 2 === 0 ? "Black" : "White",
      price: (30 + i * 1.5) * 60,
      parameters: [`${capacity}mAh Capacity`, `${power}W PD Fast Charge`, i % 3 === 0 ? "Digital Display" : "LED Indicators", i > 7 ? "Built-in Cable" : "2 Outputs"],
      cartonInfo: "BOX: 60*37.5*27.5, CTN/80PCS",
      stockQuantity: i % 10 !== 0 ? Math.floor(Math.random() * 200) + 50 : 0
    };
  }),

  // More Cables (25)
  ...Array.from({ length: 25 }, (_, i) => {
    const model = `TC-X${500 + i}`;
    const types = ["Lightning", "USB-C", "Micro-USB", "C-to-C", "C-to-L"];
    const materials = ["Braided Nylon", "Silicone", "TPE"];
    const lengths = ["1m", "1.5m", "2m", "0.5m"];
    return {
      id: model,
      model,
      category: "Cable",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`
      ],
      color: ["Black", "White", "Red", "Blue"][i % 4],
      price: (2.5 + i * 0.25) * 60,
      parameters: [`${lengths[i % 4]} Length`, `${materials[i % 3]} Material`, `${types[i % 5]} Connector`],
      cartonInfo: "Big Box:51*39*51 300PCS",
      stockQuantity: Math.floor(Math.random() * 1000) + 200
    };
  }),

  // More Chargers (15)
  ...Array.from({ length: 15 }, (_, i) => {
    const model = `TTC-G${800 + i}`;
    const power = [25, 33, 45, 65, 100][i % 5];
    const ports = ["1x USB-C", "1x USB-A", "1C + 1A", "2C + 1A", "2C"];
    return {
      id: model,
      model,
      category: "Charger",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`
      ],
      color: i % 2 === 0 ? "White" : "Black",
      price: (15 + i * 2) * 60,
      parameters: [`${power}W GaN Technology`, `${ports[i % 5]} Ports`, "Universal Compatibility", "Overheat Protection"],
      cartonInfo: "BOX: 44*36*43.5, CTN/250PCS",
      stockQuantity: i % 8 !== 0 ? Math.floor(Math.random() * 300) + 50 : 0
    };
  }),

  // More Audio (15)
  ...Array.from({ length: 15 }, (_, i) => {
    const model = `TW-A${30 + i}`;
    const features = ["ANC", "ENC for Calls", "Low Latency Gaming Mode", "IPX5 Waterproof", "Hi-Fi Sound"];
    return {
      id: model,
      model,
      category: "Earbuds",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-case/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`
      ],
      color: ["Black", "White", "Pink", "Blue"][i % 4],
      price: (30 + i * 2.5) * 60,
      parameters: [`Bluetooth v5.${i % 4}`, `${5 + (i % 3)} hours playtime`, features[i % 5]],
      cartonInfo: "BOX: 47*42*35.5, CTN/100PCS",
      stockQuantity: Math.floor(Math.random() * 200) + 30
    };
  }),
  
  // More Holders & Car Chargers (15)
  ...Array.from({ length: 15 }, (_, i) => {
    const isHolder = i % 2 === 0;
    const model = isHolder ? `TCB-M${900 + i}` : `TCC-Q${100 + i}`;
    return {
      id: model,
      model,
      category: isHolder ? "Holder" : "Car Charger",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`
      ],
      color: "Black",
      price: (12 + i * 1.8) * 60,
      parameters: isHolder
        ? ["Magnetic Car Mount", ["Dashboard", "Vent"][i % 2], "360° Rotation", "Strong N52 Magnets"]
        : [`${30 + (i%3)*15}W Total Output`, "PD + QC3.0 Ports", "Metal Alloy Body", "LED Ring Light"],
      cartonInfo: "Big Box: 72*35.5*58.5, 200PCS",
      stockQuantity: Math.floor(Math.random() * 400) + 100
    };
  }),

  // More Tripods & Stabilizers (10)
  ...Array.from({ length: 10 }, (_, i) => {
    const isTripod = i % 2 === 0;
    const model = isTripod ? `TTS-P${2000 + i}` : `TRS-S${300 + i}`;
    return {
      id: model,
      model,
      category: isTripod ? "Tripod" : "Stabilizer",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-folded/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`
      ],
      color: "Black",
      price: (40 + i * 5) * 60,
      parameters: isTripod
        ? [`Max Height ${150 + i * 10}cm`, "Lightweight Aluminum", "3kg Load Capacity", "Includes Phone Mount"]
        : ["3-Axis Gimbal", "AI Face Tracking", "8-hour Battery Life", "Foldable & Portable"],
      cartonInfo: "BOX 47*38*46, CTN/15PCS",
      stockQuantity: i % 5 !== 0 ? Math.floor(Math.random() * 80) + 20 : 0
    };
  }),
  
  // More Power Sockets (5)
  ...Array.from({ length: 5 }, (_, i) => {
    const model = `TPS-U${100 + i}`;
    return {
      id: model,
      model,
      category: "Power Socket",
      images: [
        `https://picsum.photos/seed/${model}/400/400`,
        `https://picsum.photos/seed/${model}-pkg/400/400`
      ],
      color: "White",
      price: (45 + i * 3) * 60,
      parameters: [`${4 + i} AC Outlets`, `${2 + i} USB Ports`, "65W PD Fast Charging Port", "Surge Protection"],
      cartonInfo: "BOX: 63.5*46.5*49, CTN/40pcs",
      stockQuantity: Math.floor(Math.random() * 100) + 20
    };
  })
];