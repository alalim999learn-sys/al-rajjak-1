


// lib/solar.ts

export interface FAQ {
  question: string;
  answer: string;
}

export interface SolarClient {
  id: string;
  slug: string;
  shopName: string;
  websiteName: string;
  logoUrl: string;
  mapUrl: string;
  welcomeMsg: string;
  category: string;
  price: string;
  address: string;
  phone: string;
  email: string;
  faqs: FAQ[];
}

export const solarClients: SolarClient[] = [
  {
    id: "LAW-01",
    slug: "solar-recht",
    shopName: "SOLAR Rechtsanwälte",
    websiteName: "www.solar-recht.de",
    logoUrl: "https://solar-recht.de/logo.png", // তাদের আসল লোগো ইউআরএল
    mapUrl: "https://goo.gl/maps/leipzig-solar-recht",
    welcomeMsg: "Willkommen bei SOLAR Rechtsanwälte. Wir vertreten Sie kompetent im Energierecht. Wie können wir Ihnen heute juristisch helfen?",
    category: "Kanzlei für Energierecht & PV-Recht",
    price: "Kostenloses Erstgespräch",
    address: "Max-Beckmann-Straße 10, 04109 Leipzig",
    phone: "+49 (0) 341 9288 1534",
    email: "info@solar-recht.de",
    faqs: [
      // --- RECHTSBERATUNG & VERTRÄGE ---
      { question: "Was kostet eine Erstberatung?", answer: "Wir bieten ein kostenloses Erstgespräch an, um Ihre rechtliche Situation zu bewerten." },
      { question: "Erstellen Sie auch PV-Verträge?", answer: "Ja, wir haben bereits über 280 Verträge für Unternehmen und Endkunden erstellt und geprüft." },
      { question: "Sind Sie auf Prozessvertretung spezialisiert?", answer: "Ja, mit über 160 geführten Prozessen im regenerativen Energierecht sind wir sehr erfahren vor Gericht." },

      // --- AKTUELLE URTEILE & THEMEN ---
      { question: "Sind Balkonkraftwerke in Schrebergärten erlaubt?", answer: "Ja, laut Landgericht Dessau (Mai 2025) haben Kleingärtner nun grünes Licht für Balkonkraftwerke." },
      { question: "Was tun bei Zähler-Delay des Netzbetreibers?", answer: "Wir helfen Ihnen, die Einspeisevergütung ab dem Zeitpunkt der nachweislichen Kenntnis durchzusetzen." },
      { question: "Kann ich den Vertrag bei fehlerhafter Widerrufsbelehrung widerrufen?", answer: "Ja, bei Fehlern verlängert sich die Widerrufsfrist erheblich, was eine Rückabwicklung ermöglichen kann." },
      { question: "Was gilt bei Blendwirkung durch Nachbarn?", answer: "Laut OLG Düsseldorf besteht nicht immer eine Duldungspflicht. Wir prüfen Ihren individuellen Fall." },

      // --- STEUERN & GEWÄHRLEISTUNG ---
      { question: "Gilt der 0% Steuersatz auch 2026?", answer: "Ja, der Nullsteuersatz gemäß § 12 Abs. 3 UStG gilt weiterhin für PV-Anlagen auf Wohngebäuden." },
      { question: "Ist PV-Montage Werkvertragsrecht?", answer: "Ja, laut Rechtsprechung ist die vollständige Montage oft als Werkvertrag mit Erfolgskontrolle zu werten." },
      { question: "Habe ich Anspruch auf Bauhandwerkersicherung?", answer: "Das OLG Naumburg entschied, dass dies für reine PV-Lieferung/Montage oft nicht geltend gemacht werden kann." },
      // --- ALLGEMEINES ---
      { question: "Wo ist Ihr Standort?", answer: "Unsere Kanzlei befindet sich in der Max-Beckmann-Straße 10, 04109 Leipzig." },
      { question: "Wer ist der Ansprechpartner?", answer: "Ihr Ansprechpartner ist Rechtsanwalt Julius-Friedrich Ostermai." },
      { question: "Wie erreiche ich Sie am besten?", answer: "Sie erreichen uns Mo-Fr von 9:00 bis 16:00 Uhr unter +49 (0) 341 9288 1534." }
    ]
  },
  {
    id: "GSE-01",
    slug: "gse-solar",
    shopName: "GSE Solar Solutions GmbH",
    websiteName: "www.gse-solar.de",
    logoUrl: "/logos/gse-solar.png", 
    mapUrl: "https://goo.gl/maps/markkleeberg-gse",
    welcomeMsg: "Willkommen bei GSE Solar Solutions! Ihr Partner für Photovoltaik in Leipzig & Köthen. Wie können wir Ihnen heute helfen?",
    category: "Zertifiziertes Fachunternehmen für Solarenergie",
    price: "Kostenlose Erstberatung",
    address: "Raschwitzer Str. 58, 04416 Markkleeberg - Leipzig",
    phone: "+49 341 2270 8493",
    email: "info@gse-solar.de",
    faqs: [
      // --- CORE SERVICES ---
      { question: "Welche Leistungen bieten Sie an?", answer: "Wir bieten Solaranlagen, Batteriespeicher, Wallboxen, Wärmepumpen, Mieterstrom und Repowering aus einer Hand an." },
      { question: "Wo sind Sie tätig?", answer: "Unser Fokus liegt auf Leipzig, Markkleeberg, Köthen (Anhalt) sowie ganz Sachsen-Anhalt und Umgebung." },
      { question: "Sind Ihre Elektriker zertifiziert?", answer: "Ja, unser Team besteht aus zertifizierten Elektrikern und Experten für termingerechte Umsetzung." },

      // --- TECHNICAL EXPLAINER ---
      { question: "Was ist der Unterschied zwischen DC- und AC-Montage?", answer: "DC-Montage umfasst alles auf dem Dach (Module, Kabel). AC-Montage betrifft alles nach dem Wechselrichter (Speicher, Zähler)." },
      { question: "Was bedeutet Repowering?", answer: "Repowering ist der Austausch alter Module durch effizientere. Dank Solarpaket 1 behalten Sie oft Ihre alte EEG-Vergütung." },
      { question: "Was ist Mieterstrom?", answer: "Vermieter verkaufen Solarstrom an Mieter. Der Preis ist auf 90% des Grundversorgungstarifs begrenzt." },

      // --- BENEFITS ---
      { question: "Wie viel Stromkosten kann ich sparen?", answer: "Mit einer eigenen PV-Anlage von GSE Solar können Sie Ihre Stromkosten um bis zu 80% reduzieren." },
      { question: "Bieten Sie Notstrom-Lösungen an?", answer: "Ja, unsere Batteriespeicher verfügen über Smart Management und bieten Notstrom bei Stromausfall." },
      { question: "Kann ich mein E-Auto mit Solarstrom laden?", answer: "Ja, wir installieren intelligente Wallboxen für das Überschussladen direkt von Ihrem Dach." },

      // --- CONTACT & NEXT STEPS ---
      { question: "Ist die Beratung wirklich kostenlos?", answer: "Ja, wir bieten Ihnen eine unverbindliche und kostenlose Erstberatung für Ihr Projekt an." },
      { question: "Wie erreiche ich den Kundenservice?", answer: "Sie erreichen uns Mo-Fr von 9:00 bis 17:00 Uhr unter +49 341 2270 8493 oder per WhatsApp." },
      { question: "Wie schnell antworten Sie auf E-Mails?", answer: "Wir garantieren eine Antwort auf Ihre E-Mail-Anfrage innerhalb von 24 Stunden." }
    ]
  },
  {
    id: "PRE-01",
    slug: "leipzig-photovoltaik",
    shopName: "Presolaris UG (Solaranlage Leipzig)",
    websiteName: "www.leipzig-photovoltaik.de",
    logoUrl: "/logos/presolaris-logo.png", 
    mapUrl: "https://goo.gl/maps/leipzig-presolaris",
    welcomeMsg: "Guten Tag! Ich bin Ihr KI-Assistent von Presolaris. Wir haben bereits über 2.400 Projekte in Leipzig realisiert. Wie kann ich Ihnen heute bei Ihrer Energiewende helfen?",
    category: "Fachbetrieb für Photovoltaik & Energiespeicher",
    price: "Komplettsysteme ab 8.900 €",
    address: "An der Hebemärchte 1, 04316 Leipzig",
    phone: "+49 341 98 99 03 91",
    email: "kontakt@leipzig-photovoltaik.de",
    faqs: [
      // --- PREISE & WIRTSCHAFTLICHKEIT ---
      { question: "Was kostet eine Solaranlage 2026?", answer: "Eine 8-10 kWp Anlage kostet inkl. Installation zwischen 9.500€ und 12.500€. Mit 10 kWh Speicher liegen die Kosten bei 15.000€ bis 19.000€. Wir bieten eine Festpreis-Garantie." },
      { question: "Wie viel Stromkosten kann ich sparen?", answer: "Mit unseren Anlagen senken Sie Ihre Energiekosten um bis zu 80% und werden unabhängig von steigenden Strompreisen." },
      { question: "Wann amortisiert sich die Anlage?", answer: "In der Regel nach 8-12 Jahren. Mit Speicher dauert es ca. 10-14 Jahre, wobei die steigenden Strompreise die Zeit verkürzen." },

      // --- TECHNIK & SMART HOME ---
      { question: "Was ist der Solarmanager?", answer: "Ein intelligentes System, das PV, Speicher, Wallbox und Wärmepumpe steuert. Es erhöht den Eigenverbrauch um bis zu 30% (ca. 500€ Ersparnis/Jahr)." },
      { question: "Welche Modul-Qualität bieten Sie?", answer: "Wir nutzen Premium-Komponenten mit über 25 Jahren Leistungsgarantie, die auch bei bewölktem Himmel in Leipzig hohe Erträge liefern." },
      { question: "Funktioniert die Anlage bei Stromausfall?", answer: "Standardanlagen schalten ab, aber mit unseren Speichern und Notstromfunktion bleiben wichtige Geräte wie Kühlschrank und Licht aktiv." },

      // --- SERVICE & INSTALLATION ---
      { question: "Wie lange dauert die Installation?", answer: "Die Montage dauert nur 1-3 Tage. Von Auftrag bis Inbetriebnahme vergehen meist 6-12 Wochen." },
      { question: "Bieten Sie auch Wartung an?", answer: "Ja, wir empfehlen eine Wartung alle 2-3 Jahre. Wir bieten Wartungsverträge ab 150€ pro Jahr an." },
      { question: "Gilt die 0% MwSt auch 2026?", answer: "Ja, der Nullsteuersatz für PV-Anlagen auf Wohngebäuden gilt weiterhin, was Ihre Investition deutlich günstiger macht." },

      // --- ÜBER PRESOLARIS ---
      { question: "Sind Sie ein erfahrener Betrieb?", answer: "Ja, wir haben bereits über 2.400 Projekte erfolgreich umgesetzt und sind Ihr lokaler Partner direkt in Leipzig." },
      { question: "Wer ist der Geschäftsführer?", answer: "Der Geschäftsführer der Presolaris UG ist Janos Kolpin." }
    ]
  },
{
    id: "DHS-01",
    slug: "dhs-solar",
    shopName: "DHS Solar – Danny Hübner",
    websiteName: "www.dhs-solar.de",
    logoUrl: "/logos/dhs-solar.png", 
    mapUrl: "https://goo.gl/maps/schkeuditz-dhs",
    welcomeMsg: "Willkommen bei DHS Solar! Ich bin Ihr Assistent von Danny Hübner. Wir haben über 20 Jahre Erfahrung in Leipzig & Schkeuditz. Wie kann ich Ihnen heute helfen?",
    category: "Fachbetrieb für Photovoltaik, Stromspeicher & SENEC-Cloud",
    price: "Unverbindliches Angebot nach Vor-Ort-Termin",
    address: "Gutshofstraße 22, 04435 Schkeuditz",
    phone: "+49 (0) 34204 35 35 10",
    email: "info@dhs-solar.de",
    faqs: [
      // --- CORE VALUES & EXPERIENCE ---
      { question: "Warum sollte ich DHS Solar wählen?", answer: "Wir bieten 20 Jahre Erfahrung, persönliche Vor-Ort-Beratung und eine fachgerechte Montage durch ein eingespieltes Team aus Handwerkern." },
      { question: "Wie lange dauert ein Projekt bei Ihnen?", answer: "Wir sind sehr schnell! Kunden berichten oft, dass von der Planung bis zur fertigen Installation nur 2 Wochen bis 2,5 Monate vergehen." },
      { question: "Wer ist mein Ansprechpartner?", answer: "Herr Danny Hübner betreut Sie persönlich von der Planung bis zur Inbetriebnahme Ihrer Anlage." },

      // --- SPECIAL SERVICES (SENEC CLOUD) ---
      { question: "Was ist die SENEC-Strom-Cloud?", answer: "Mit der Cloud nutzen Sie Ihren Strom grenzenlos. Überschüssiger Strom wird virtuell gespeichert und kann im Winter oder an bewölkten Tagen abgerufen werden." },
      { question: "Bieten Sie Glas-Glas-Module an?", answer: "Ja, auf Wunsch installieren wir hochwertige Glas/Glas-Module, die besonders langlebig und widerstandsfähig sind." },
      { question: "Was gehört zum Stromspeicher-Service?", answer: "Wir wählen den Speicher optimal für Ihren Hauswirtschaftsraum (HWR) aus, um maximale Funktionalität auf kleinstem Raum zu bieten." },

      // --- PROCESS ---
      { question: "Wie ist der Ablauf bei DHS Solar?", answer: "1. Kontaktaufnahme, 2. Vor-Ort-Termin, 3. Planung & Angebot, 4. Montage & Inbetriebnahme inkl. Anmeldung beim Netzbetreiber." },
      { question: "Übernehmen Sie die Anmeldung beim Netzbetreiber?", answer: "Ja, wir kümmern uns um alle Formulare und die fristgerechte Einreichung beim Energieversorger, damit alles reibungslos läuft." },
      { question: "Bieten Sie auch Wartung an?", answer: "Ja, wir führen regelmäßige Reinigungen und Wartungen mit Messprotokollen durch, um Ihre Erträge langfristig zu sichern." },

      // --- CUSTOMER TRUST ---
      { question: "Gibt es Referenzen in der Region?", answer: "Ja, wir haben zahlreiche zufriedene Kunden in Leipzig, Schkeuditz und Umgebung, die unsere Pünktlichkeit und saubere Arbeit schätzen." }
    ]
  }
];



export function getSolarClientBySlug(slug: string): SolarClient | undefined {
  return solarClients.find(client => client.slug === slug);
}