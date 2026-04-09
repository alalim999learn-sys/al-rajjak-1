


//lib/cars.ts
// ১. কমন ১৭টি গাড়ির লিস্ট
const commonCars = [
  { 
    id: "n1", 
    name: "BMW i5 M60 (Electric)", 
    price: "95900", // স্ট্রিং থেকে সিম্বল ও ডট সরিয়ে শুধু সংখ্যা রাখা হয়েছে
    displayPrice: "€95.900", // দেখানোর জন্য আলাদা ফিল্ড
    image: "/cars/1.webp", 
    specs: { engine: "Electric 442kW", hp: 601, year: "2024" } // hp এখন পিওর নাম্বার
  },
  { 
    id: "n2", 
    name: "Mercedes-Benz C 200 (2025)", 
    price: "54200", 
    displayPrice: "€54.200",
    image: "/cars/2.avif", 
    specs: { engine: "2.0 Mild-Hybrid", hp: 204, year: "2025" }
  },
  { 
    id: "n3", 
    name: "VW Tiguan (New Gen)", 
    price: "42800", 
    displayPrice: "€42.800",
    image: "/cars/3.avif", 
    specs: { engine: "1.5 eTSI", hp: 150, year: "2024" }
  },
  { 
    id: "m1", 
    name: "Audi A4 Avant S-line", 
    price: "28500", 
    displayPrice: "€28.500",
    image: "/cars/4.avif", 
    specs: { engine: "2.0 TDI", hp: 190, year: "2019" }
  },
  { 
    id: "m2", 
    name: "Tesla Model 3 Long Range", 
    price: "34900", 
    displayPrice: "€34.900",
    image: "/cars/5.jpeg", 
    specs: { engine: "Dual Motor AWD", hp: 498, year: "2021" }
  },
  { 
    id: "m3", 
    name: "Skoda Octavia Combi", 
    price: "21500", 
    displayPrice: "€21.500",
    image: "/cars/6.webp", 
    specs: { engine: "2.0 TDI", hp: 150, year: "2020" }
  },
  { 
    id: "m4", 
    name: "Hyundai Tucson Hybrid", 
    price: "31200", 
    displayPrice: "€31.200",
    image: "/cars/7.avif", 
    specs: { engine: "1.6 T-GDI", hp: 230, year: "2022" }
  },
  { 
    id: "m5", 
    name: "BMW 118i M-Sport", 
    price: "24800", 
    displayPrice: "€24.800",
    image: "/cars/8.jpg", 
    specs: { engine: "1.5 Benzin", hp: 136, year: "2018" }
  },
  { 
    id: "b1", 
    name: "Volkswagen Golf VII (7)", 
    price: "11500", 
    displayPrice: "€11.500",
    image: "/cars/9.webp", 
    specs: { engine: "1.6 TDI", hp: 110, year: "2014" }
  },
  { 
    id: "b2", 
    name: "Ford Fiesta Titanium", 
    price: "8900", 
    displayPrice: "€8.900",
    image: "/cars/10.jpg", 
    specs: { engine: "1.0 EcoBoost", hp: 100, year: "2016" }
  },
  { 
    id: "b3", 
    name: "Opel Astra K 1.4 Turbo", 
    price: "12400", 
    displayPrice: "€12.400",
    image: "/cars/11.jpg", 
    specs: { engine: "1.4 Benzin", hp: 150, year: "2015" }
  },
  { 
    id: "b4", 
    name: "Toyota Yaris Hybrid", 
    price: "13800", 
    displayPrice: "€13.800",
    image: "/cars/12.jpg", 
    specs: { engine: "1.5 Hybrid", hp: 101, year: "2017" }
  },
  { 
    id: "c1", 
    name: "Mercedes-Benz E 240 (W210)", 
    price: "5500", 
    displayPrice: "€5.500",
    image: "/cars/13.jpg", 
    specs: { engine: "2.4 V6 Benzin", hp: 170, year: "1999" }
  },
  { 
    id: "c2", 
    name: "BMW 320i (E46)", 
    price: "4900", 
    displayPrice: "€4.900",
    image: "/cars/14.jpg", 
    specs: { engine: "2.2 Benzin", hp: 170, year: "2001" }
  },
  { 
    id: "c3", 
    name: "Audi A3 (8P) Attraction", 
    price: "3200", 
    displayPrice: "€3.200",
    image: "/cars/15.jpg", 
    specs: { engine: "1.6 Benzin", hp: 102, year: "2005" }
  },
  { 
    id: "c4", 
    name: "VW Golf IV (4) Generation", 
    price: "2800", 
    displayPrice: "€2.800",
    image: "/cars/16.jpg", 
    specs: { engine: "1.4 Benzin", hp: 75, year: "1998" }
  },
  { 
    id: "c5", 
    name: "Mercedes S-Klasse (W140)", 
    price: "14500", 
    displayPrice: "€14.500",
    image: "/cars/17.jpg", 
    specs: { engine: "3.2 Benzin", hp: 231, year: "1993" }
  }
];

// ২. ক্লায়েন্ট ডাটাবেজ
const clients: Record<string, any> = {
  "01": {
    slug: "01", 
    shopName: "Al-Rajjak Autohaus",
    email: "info@alrajjak-auto.de",
    phone: "+49 123 4567890",
    address: "Heidelberger Str. 45, 69115 Heidelberg, Germany",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Heidelberger+Str.+45+69115+Heidelberg",
    logoUrl: "/logos/alrajjak.png"
  },
  "sd-autohandel-pflege": {
    slug: "sd-autohandel-pflege",
    shopName: "SD-Autohandel & Pflege",
    email: "info@sd-autohandel.de",
    phone: "+49 176 00000000",
    address: "Hauptstraße 1, Heidelberg",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Hauptstraße+1+Heidelberg",
    logoUrl: "/logos/sd.jpg"
  },
  "shanon-luxury": {
    slug: "shanon-luxury",
    shopName: "Shanon Luxury Cars",
    email: "shanon@lemonskn.com",
    phone: "+49 111 2223334",
    address: "Kurfürsten-Anlage 60, 69115 Heidelberg",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Kurfürsten-Anlage+60+69115+Heidelberg", 
    logoUrl: "/logos/shanon.png"
  }
};

// ৩. ডাটা এক্সপোর্ট ফাংশন
export function getCarClientInfo(slug: string) {
  const client = clients[slug]; 
  if (!client) return null;
  return {
    ...client,
    properties: commonCars 
  };
}