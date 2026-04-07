


//lib/realestate.ts
export interface FAQ {
  question: string;
  answer: string;
}

export interface Property {
  id: string;
  name: string;
  price: string;
  location: string;
  description: string;
  images: string[];
  ownerName: string;
  availableFrom: string;
  beds: number;
  baths: number;
  sqft: string;
  energyClass: string;
  type: 'Miete' | 'Kauf';
}

export interface RealEstateClient {
  id: string;
  slug: string;
  shopName: string;
  category: string;
  logoUrl: string;
  mapUrl: string;
  welcomeMsg: string;
  phone: string;
  email: string;
  faqs: FAQ[];
  properties: Property[];
}

// --- ১. কমন FAQ (সবার জন্য এক) ---
const commonFAQs: FAQ[] = [
  { question: "Sind Haustiere erlaubt?", answer: "Das hängt vom jeweiligen Mietobjekt ab. In der Regel benötigen Sie eine schriftliche Genehmigung des Eigentümers." },
  { question: "Wie hoch ist die Kaution?", answer: "Die Kaution beträgt üblicherweise drei Nettokaltmieten." },
  { question: "Bieten Sie Online-Besichtigungen an?", answer: "Ja, wir bieten für viele Objekte virtuelle 3D-Rundgänge oder Video-Telefonate an." },
  { question: "Welche Unterlagen werden für eine Mietbewerbung benötigt?", answer: "Schufa-Auskunft, die letzten drei Gehaltsnachweise, Personalausweiskopie und eine Mietschuldenfreiheitsbescheinigung." },
  { question: "Ist die Einbauküche im Mietpreis enthalten?", answer: "In vielen unserer Objekte ist eine hochwertige Einbauküche bereits vorhanden. Details finden Sie in der Objektbeschreibung." },
  { question: "Wie lange ist die Kündigungsfrist?", answer: "Die gesetzliche Kündigungsfrist beträgt in der Regel drei Monate zum Monatsende." },
  { question: "Bieten Sie auch Gewerbeimmobilien an?", answer: "Ja, wir haben Büros, Ladenlokale und Lagerflächen in Top-Lagen im Portfolio." },
  { question: "Wie wird die Nebenkostenabrechnung erstellt?", answer: "Die Abrechnung erfolgt jährlich basierend auf den tatsächlichen Verbräuchen und Betriebskosten." },
  { question: "Gibt es Stellplätze oder Garagen?", answer: "Viele Objekte verfügen über eigene Stellplätze oder Tiefgaragenplätze, die separat angemietet werden können." },
  { question: "Wie erfolgt die Schlüsselübergabe?", answer: "Nach Unterzeichnung des Mietvertrags und Zahlung der ersten Miete sowie der Kaution erfolgt ein Übergabetermin vor Ort." },
  { question: "Unterstützen Sie beim Immobilienverkauf?", answer: "Ja, von der Marktwertanalyse bis zum Notartermin begleiten wir den gesamten Verkaufsprozess." },
  { question: "Was ist eine Kaltmiete?", answer: "Die Kaltmiete ist der Grund价格 für die Nutzung der Räumlichkeiten ohne Nebenkosten wie Heizung, Wasser oder Müllabfuhr." },
  { question: "Sind Besichtigungen am Wochenende möglich?", answer: "Ja, wir bieten flexible Termine nach Absprache an, auch samstags." },
  { question: "Wie reiche ich eine Mängelmeldung ein?", answer: "Mängel können Sie uns bequem per E-Mail oder über unser Mieter-Portal melden." },
  { question: "Bieten Sie Energieausweise an?", answer: "Ja, bei Verkauf oder Vermittlung sorgen wir für das Vorliegen eines gültigen Energieausweises." },
  { question: "Was ist im Hausgeld enthalten?", answer: "Das Hausgeld umfasst Instandhaltungsrücklagen, Verwaltergebühren und Betriebskosten bei Eigentumswohnungen." },
  { question: "Können Sie meine Immobilie bewerten?", answer: "Ja, wir führen professionelle Wertermittlungen basierend auf dem aktuellen Marktwert durch." },
  { question: "Wie finde ich einen Nachmieter?", answer: "Gerne unterstützen wir Sie bei der Suche nach einem passenden Nachmieter zur Verkürzung der Kündigungsfrist." },
  { question: "Gibt es eine Mindestmietdauer?", answer: "Einige Verträge beinhalten einen Kündigungsverzicht von 12 bis 24 Monaten." },
  { question: "Ist Rauchen in den Wohnungen gestattet?", answer: "Grundsätzlich ist Rauchen erlaubt, wir empfehlen jedoch aus Rücksicht auf die Nachmieter das Rauchen im Freien." },
  { question: "Werden die Treppenhäuser gereinigt?", answer: "Ja, in den meisten Objekten ist eine professionelle Reinigungsfirma beauftragt." },
  { question: "Gibt es Internet-Anschlüsse?", answer: "Ja, unsere Objekte sind meist mit Glasfaser- oder Kabelanschlüssen für Highspeed-Internet ausgestattet." },
  { question: "Wie erreiche ich den Notdienst?", answer: "Für Notfälle außerhalb der Geschäftszeiten finden Sie die Nummern im Aushang im Treppenhaus." },
  { question: "Muss ich die Wohnung beim Auszug renovieren?", answer: "Das hängt von der Vereinbarung im Mietvertrag ab (Schönheitsreparaturen)." },
  { question: "Bieten Sie auch barrierefreie Wohnungen an?", answer: "Ja, wir haben speziell ausgestattete Wohnungen mit Aufzug und ohne Schwellen im Angebot." },
  { question: "Wie sicher sind die Immobilien?", answer: "Wir achten auf moderne Sicherheitsstandards bei Schlössern und Hauseingängen." },
  { question: "Gibt es Kellerabteile?", answer: "Fast jede Wohnung verfügt über ein eigenes, abschließbares Kellerabteil." },
  { question: "Wie hoch ist die Grunderwerbsteuer?", answer: "In Sachsen beträgt die Grunderwerbsteuer aktuell 5,5 % des Kaufpreises." },
  { question: "Helfen Sie bei Finanzierungsfragen?", answer: "Wir können Sie an erfahrene Finanzierungspartner vermitteln." },
  { question: "Sind die Fenster schallisoliert?", answer: "In belebten Lagen achten wir auf hochwertige Schallschutzverglasung." },
  { question: "Gibt es Fahrradabstellplätze?", answer: "Ja, meist gibt es gesonderte Bereiche im Hof oder im Keller für Fahrräder." },
  { question: "Wie groß sind die Balkone?", answer: "Die Größen variieren, bieten aber meist Platz für Tisch und Stühle." },
  { question: "Wann erhalte ich die Nebenkostenabrechnung?", answer: "Spätestens 12 Monate nach Ende des Abrechnungszeitraums." }
];

// --- ২. কমন প্রপার্টিজ (সব ক্লায়েন্টের জন্য এই লিস্ট টাই কাজ করবে) ---
const commonProperties: Property[] = [
  { id: "p1", name: "Penthouse Gohlis", price: "2.500 €", location: "Leipzig Gohlis", description: "Luxus pur mit Dachterrasse.", images: ["/home/one1.jpg", "/home/two1.jpg", "/home/31.jpg", "/home/41.jpg"], ownerName: "Dr. Müller", availableFrom: "01.06.2026", beds: 4, baths: 2, sqft: "145 m²", energyClass: "A", type: "Miete" },
  { id: "p2", name: "Loft Plagwitz", price: "1.800 €", location: "Leipzig Plagwitz", description: "Industrie-Charme.", images: ["/home/one2.jpg", "/home/two2.jpg", "/home/32.jpg", "/home/42.jpg"], ownerName: "Herr Weber", availableFrom: "Sofort", beds: 3, baths: 1, sqft: "110 m²", energyClass: "B", type: "Miete" },
  { id: "p3", name: "Modern Flat Süd", price: "1.200 €", location: "Südvorstadt", description: "Hell und zentral.", images: ["/home/one3.jpg", "/home/two3.jpg", "/home/33.jpg", "/home/43.jpg"], ownerName: "Frau Neumann", availableFrom: "15.05.2026", beds: 2, baths: 1, sqft: "85 m²", energyClass: "B", type: "Miete" },
  { id: "p4", name: "Altbau Classic", price: "950 €", location: "Zentrum-West", description: "Hohe Decken.", images: ["/home/one4.jpg", "/home/two4.jpg", "/home/34.jpg", "/home/44.jpg"], ownerName: "Herr Schmidt", availableFrom: "01.06.2026", beds: 3, baths: 1, sqft: "92 m²", energyClass: "D", type: "Miete" },
  { id: "p5", name: "Studio Apartment", price: "700 €", location: "Reudnitz", description: "Perfekt für Studenten.", images: ["/home/one5.jpg", "/home/two5.jpg", "/home/35.jpg", "/home/45.jpg"], ownerName: "Herr Lange", availableFrom: "Sofort", beds: 1, baths: 1, sqft: "38 m²", energyClass: "C", type: "Miete" },
  { id: "p6", name: "Garden Residence", price: "2.100 €", location: "Marienbrunn", description: "Mit eigenem Garten.", images: ["/home/one6.jpg", "/home/two6.jpg", "/home/36.jpg", "/home/46.jpg"], ownerName: "Frau Fischer", availableFrom: "01.07.2026", beds: 4, baths: 2, sqft: "125 m²", energyClass: "A", type: "Miete" },
  { id: "p7", name: "Skyline View", price: "3.200 €", location: "City Center", description: "Panoramablick.", images: ["/home/one7.jpg", "/home/two7.jpg", "/home/37.jpg", "/home/47.jpg"], ownerName: "Dr. Bauer", availableFrom: "Nach Absprache", beds: 5, baths: 2, sqft: "180 m²", energyClass: "A+", type: "Miete" },
  { id: "p8", name: "Family Home", price: "1.550 €", location: "Connewitz", description: "Ruhige Lage.", images: ["/home/one8.jpg", "/home/two8.jpg", "/home/38.jpg", "/home/48.jpg"], ownerName: "Herr Kraft", availableFrom: "01.08.2026", beds: 4, baths: 1, sqft: "115 m²", energyClass: "B", type: "Miete" },
  { id: "p9", name: "Smart Living", price: "1.100 €", location: "Lindenau", description: "Technik vom Feinstেন।", images: ["/home/one9.jpg", "/home/two9.jpg", "/home/39.jpg", "/home/49.jpg"], ownerName: "Herr Jung", availableFrom: "01.06.2026", beds: 2, baths: 1, sqft: "72 m²", energyClass: "A", type: "Miete" }
];

// --- ৩. ক্লায়েন্ট লিস্ট (এখানে ১৯টি সাইট আসবে) ---
export const realEstateClients: RealEstateClient[] = [
{
    id: "IMMO-WOEBER-002",
    slug: "woeber-immobilien",
    shopName: "Wöber Immobilien GmbH",
    category: "Verkauf | Vermietung | Verwaltung",
    logoUrl: "/logos/woeber.png", // Platzhalter-Logo
    mapUrl: "https://goo.gl/maps/woeber-leipzig-hainstrasse",
    welcomeMsg: "Willkommen bei Wöber Immobilien! Wir sind Ihr persönlicher Makler und Ihre Hausverwaltung in Leipzig. Wie können wir Ihnen heute helfen?",
    phone: "0341 – 99 160 830",
    email: "info@woeber.immo",
    faqs: commonFAQs,
    properties: commonProperties
  },



  
  {
    id: "IMMO-HOFFMANN-004",
    slug: "sylvia-hoffmann-immobilien",
    shopName: "Sylvia Hoffmann Immobilien",
    category: "Vermittlung | Verkauf | Vermietung",
    logoUrl: "/logos/sylvia.png", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/hoffmann-leipzig-karl-liebknecht",
    welcomeMsg: "Willkommen bei Sylvia Hoffmann Immobilien! Wir begleiten Sie kompetent von der ersten Beratung bis zur Schlüsselübergabe in Leipzig. Wie kann ich Ihnen heute helfen?",
    phone: "0341 2471560",
    email: "mail@sylvia-hoffmann-immobilien.de",
    faqs: commonFAQs,
    properties: commonProperties
  },




  

  {
    id: "IMMO-M-QUADRAT-005",
    slug: "m-quadrat-leipzig",
    shopName: "m² Immobilien Leipzig",
    category: "Immobilienkaufmann (IHK) | Verkauf & Bewertung",
    logoUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/m2-immobilien-leipzig-bischofstrasse",
    welcomeMsg: "Willkommen bei m² Immobilien Leipzig! Mein Name ist Michael Datemasch. Mit über 25 Jahren Erfahrung am Bau und in der Immobilienwirtschaft helfe ich Ihnen gerne weiter. Wie kann ich Sie heute unterstützen?",
    phone: "0177 / 720 10 44",
    email: "md@m-quadrat-immobilien.de",
    faqs: commonFAQs,
    properties: commonProperties
  },
  {
    id: "IMMO-ULRICH-006",
    slug: "immobilien-ulrich",
    shopName: "Immobilien Ulrich",
    category: "Digitale Hausverwaltung | WEG-Verwaltung",
    logoUrl: "/logos/ulrich.png", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/ulrich-leipzig-salomonstrasse",
    welcomeMsg: "Willkommen bei Immobilien Ulrich! Wir verbinden traditionelle Verwaltung mit modernen digitalen Tools für maximale Transparenz. Wie können Dr. Peter Ulrich, Moritz Ulrich und unser Team Ihnen heute helfen?",
    phone: "0341 24792 840",
    email: "info@immobilienulrich.de",
    faqs: commonFAQs,
    properties: commonProperties
  },
  {
    id: "IMMO-HIRSCH-007",
    slug: "immobilien-hirsch",
    shopName: "Immobilien Hirsch",
    category: "Makler für Leipzig & Umgebung",
    logoUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/hirsch-leipzig-an-der-kirche",
    welcomeMsg: "Willkommen bei Immobilien Hirsch! Ich bin Matthias Hirsch. Bei mir stehen Sie im Mittelpunkt – ohne wechselnde Ansprechpartner. Wie kann ich Ihnen heute bei Kauf, Verkauf oder Miete helfen?",
    phone: "0157-38081218",
    email: "kontakt@immobilien-hirsch.com",
    faqs: commonFAQs,
    properties: commonProperties
  },

  {
    id: "IMMO-STEINBACH-008",
    slug: "steinbach-immobilien",
    shopName: "Sebastian Steinbach Immobilien",
    category: "Dipl. Betriebswirt | Vermietung & Verkauf",
    logoUrl: "/logos/stein.png", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/steinbach-leipzig-brandvorwerkstr",
    welcomeMsg: "Willkommen bei Sebastian Steinbach Immobilien! Als Dipl. Betriebswirt der Immobilienwirtschaft begleite ich Sie mit Transparenz und Leidenschaft zu Ihrem Wunschobjekt. Wie kann ich Ihnen heute helfen?",
    phone: "+49 (0) 341 99 857 940",
    email: "info@steinbach-immobilienservice.de",
    faqs: commonFAQs,
    properties: commonProperties
  },



{
    id: "IMMO-SCHNEIDER-009",
    slug: "juliane-schneider-immobilien",
    shopName: "Juliane Schneider Immobilien",
    category: "Wohn- & Anlageimmobilien | Zertifizierte Maklerin",
    logoUrl: "/logos/juliane.png", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/schneider-leipzig-gohliser-str",
    welcomeMsg: "Herzlich willkommen! Ich bin Juliane Schneider. Seit 2007 begleite ich Kunden in Leipzig persönlich und professionell zu ihrer Traumimmobilie. Wie kann ich Ihnen heute helfen?",
    phone: "0341 – 39 29 42 14",
    email: "info@juliane-schneider-immobilien.de",
    faqs: commonFAQs,
    properties: commonProperties
  },

  {
    id: "IMMO-NOWAK-010",
    slug: "dr-nowak-immobilien",
    shopName: "Dr. Nowak Immobilien GmbH",
    category: "Verwaltung | Vermietung | Verkauf",
    logoUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/dr-nowak-leipzig-kohlenstrasse",
    welcomeMsg: "Willkommen bei Dr. Nowak Immobilien! Mit über 25 Jahren Erfahrung am Leipziger Markt betreuen wir Ihre Immobilie als echte Wertanlage. Wie können Victoria Hauptmann und unser Team Ihnen heute helfen?",
    phone: "+49 (0)341 2569849 0",
    email: "info@dr-nowak-immobilien.de",
    faqs: commonFAQs,
    properties: commonProperties
  },







  {
    id: "IMMO-ABIS-011",
    slug: "abis-immobilien",
    shopName: "abis Immobilien Stephan Hermanns",
    category: "Verkauf | Vermietung | Facility-Management",
    logoUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/abis-leipzig-peterssteinweg",
    welcomeMsg: "Herzlich willkommen bei abis Immobilien! Seit 1994 stehen wir für kompetente Betreuung in Sachsen. Ob klassisch oder diskret Off-Market – wie können Stephan Hermanns und das Team Ihnen heute helfen?",
    phone: "0341 215 83 96",
    email: "info@abis-immobilien.de",
    faqs: commonFAQs,
    properties: commonProperties
  },







  {
    id: "IMMO-LEIPZIG-MAKLER-012",
    slug: "ihr-leipzig-makler",
    shopName: "IHR LEIPZIG MAKLER",
    category: "Verkauf | Immobilienbewertung | Kauf",
    logoUrl: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/leipzig-makler-humboldtstrasse",
    welcomeMsg: "Willkommen bei IHR LEIPZIG MAKLER! Wir sind Ihr lokaler Experte für den schnellen und sorgenfreien Immobilienverkauf in Leipzig. Wie können Martin Johannes Schmid und unser Team Ihnen heute helfen?",
    phone: "0341-86264666",
    email: "info@ihr-leipzig-makler.de",
    faqs: commonFAQs,
    properties: commonProperties
  },{
    id: "IMMO-KK-013",
    slug: "kk-immobilien-leipzig",
    shopName: "Koengeter & Krekow Immobilien GmbH",
    category: "Verkauf | Vermietung | 360° Service",
    logoUrl: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/kk-immobilien-leipzig-karli",
    welcomeMsg: "Willkommen bei Koengeter & Krekow! Ob modernstes Marketing mit Drohnenaufnahmen oder persönliche Betreuung seit 2012 – Silvio Krekow und unser Team finden Ihr perfektes Zuhause. Wie können wir Ihnen heute helfen?",
    phone: "0341 – 962 888 60",
    email: "info@kk-immobilien-leipzig.de",
    faqs: commonFAQs,
    properties: commonProperties
  },
  {
    id: "IMMO-NACHHAUSE-014",
    slug: "nachhause-immobilien",
    shopName: "Nach Hause Immobilien",
    category: "Leipziger Maklerinnen | Spezialimmobilien",
    logoUrl: "/logos/nachhause.png", // প্লেসহোল্ডার লোগো
    mapUrl: "https://goo.gl/maps/nachhause-leipzig-froschkoenigweg",
    welcomeMsg: "Willkommen bei Nach Hause Immobilien! Wir sind Ihre Expertinnen für einen sorgenfreien Immobilienverkauf in Leipzig. Ob diskreter Verkauf oder Wertermittlung – Daniela Kasch und unser Team begleiten Sie mit Herz und Know-how. Wie können wir Ihnen heute helfen?",
    phone: "0341 86 05 966",
    email: "info@nachhause-immobilien.de",
    faqs: commonFAQs,
    properties: commonProperties
  },
  // পরবর্তী ক্লায়েন্ট অ্যাড করার জন্য এখানে কমা (,) দিয়ে নতুন অবজেক্ট বসান
];

// --- Helper Function ---
export const getClientBySlug = (slug: string) => {
  return realEstateClients.find(client => client.slug === slug);
};