


//C:\Users\Shanon\al-rajjak-1\app\lib\electrician.ts
// app\lib\electrician.ts

export interface FAQ {
  question: string;
  answer: string;
}

export interface ElectricianClient {
  id: string;
  slug: string;
  shopName: string;
  category: string;
  logoUrl: string;
  address: string;
  phone: string;
  email: string;
  websiteName: string;
  faqs: FAQ[];
}

export const electricianClients: ElectricianClient[] = [
 {
  id: "ELEC-HZ-001",
  slug: "holzweissig-elektro-leipzig",
  shopName: "Holzweißig Elektro und Kabelbau GmbH",
  category: "Experte für Elektrotechnik & Kabelbau",
  logoUrl: "https://www.holzweissig-elektro.de/templates/pwa-e-partner/img/logo.png", // লোগো ইউআরএল ঠিক আছে
  address: "Saarländer Straße 42, 04179 Leipzig, Germany",
  phone: "0172 3420420",
  email: "info@holzweissig-elektro.de",
  websiteName: "www.holzweissig-elektro.de",
  faqs: [
    { 
      question: "Welche Leistungen bieten Sie in Leipzig an?", 
      answer: "Wir bieten komplette Elektroinstallationen, Kabelbau, Smarthome-Lösungen, Beleuchtungstechnik sowie IT-Lösungen für Privat- und Gewerbekunden an." 
    },
    { 
      question: "Helfen Sie auch bei der Elektromobilität / Wallboxen?", 
      answer: "Ja, wir sind Ihr Partner für Elektromobilität. Wir planen und installieren Ihre Ladeinfrastruktur fachgerecht nach aktuellen Sicherheitsstandards." 
    },
    { 
      question: "Bieten Sie Lösungen für Smarthome und Sicherheit an?", 
      answer: "Absolut. Von der intelligenten Haussteuerung bis hin zur modernen Videoüberwachung und Einbruchschutz sichern wir Ihr Zuhause smart ab." 
    },
    { 
      question: "Suchen Sie aktuell Verstärkung für Ihr Team?", 
      answer: "Ja, wir suchen Elektroinstallateure und Zählermonteure. Bewerbungen können direkt an bewerbung@holzweissig-elektro.de gesendet werden." 
    },
    { 
      question: "Wie sind Ihre Öffnungszeiten für eine Beratung?", 
      answer: "Wir sind Mo-Do von 06:45 bis 16:15 Uhr und Fr bis 16:00 Uhr für Sie da. Kontaktieren Sie uns gerne für einen individuellen Termin." 
    }
  ]
},
{
  id: "ELEC-EK-002",
  slug: "elektro-krueger-leipzig",
  shopName: "Elektro- und Hausservice Krüger",
  category: "Experte für Hausinstallation & Sicherheitstechnik",
  logoUrl: "https://www.ehk-leipzig.de/images/logo.png", // লোগো ইউআরএল ঠিক আছে
  address: "Dreilindenstr. 26, 04177 Leipzig, Germany",
  phone: "0341/4808896",
  email: "info@ehk-leipzig.de",
  websiteName: "www.ehk-leipzig.de",
  faqs: [
    { 
      question: "Welche Leistungen bieten Sie in Leipzig an?", 
      answer: "Wir sind Ihr Partner für klassische Elektroinstallationen, moderne Sicherheitstechnik, Beleuchtungssysteme sowie Multimedia-Lösungen im Raum Leipzig." 
    },
    { 
      question: "Kümmern Sie sich auch um Wartung und Reparaturen?", 
      answer: "Ja, als zuverlässiger Servicepartner übernehmen wir die fachgerechte Wartung und Reparatur Ihrer elektrischen Anlagen und Haustechnik." 
    },
    { 
      question: "Bieten Sie Beratung für energieeffiziente Beleuchtung?", 
      answer: "Absolut. Wir planen und installieren stilvolle sowie energieeffiziente Lichtlösungen für jeden Raum, ganz nach Ihren Wünschen." 
    },
    { 
      question: "Wie sind Ihre Bürozeiten in der Dreilindenstraße?", 
      answer: "Unser Team ist von Montag bis Freitag jeweils von 07:00 bis 16:00 Uhr für Sie erreichbar." 
    },
    { 
      question: "Wie kann ich schnell eine Anfrage stellen?", 
      answer: "Nutzen Sie einfach unser Kontaktformular oben oder rufen Sie uns direkt unter 0341/4808896 an. Wir freuen uns auf Ihr Projekt!" 
    }
  ]
},







{
  id: "ELEC-EMP-003",
  slug: "emp-elektro-leipzig",
  shopName: "EMP GmbH Elektroinstallation",
  category: "Spezialist für Objektgeschäft & moderne Gebäudetechnik",
  logoUrl: "https://www.emp-leipzig.de/images/logo.png", 
  address: "Weißenfelser Straße 67, 04229 Leipzig, Germany",
  phone: "+49 (0) 341 49 29 10 0",
  email: "info@emp-leipzig.de",
  websiteName: "www.emp-leipzig.de",
  faqs: [
    { 
      question: "Welche Großprojekte betreuen Sie in Leipzig?", 
      answer: "Wir haben umfangreiche Erfahrung im Objektgeschäft, darunter Projekte wie das Grassimuseum, den Zoo Leipzig und Harley-Davidson Leipzig. Wir bieten Projektmanagement aus einer Hand." 
    },
    { 
      question: "Was bietet Ihr Studio für Technik-Erlebnisse?", 
      answer: "In unserem Studio präsentieren wir Ihnen Siedle-Produkte, moderne Beleuchtung, exklusives Schalterdesign und intelligente Komfortfunktionen zum Anfassen." 
    },
    { 
      question: "Helfen Sie auch bei kleinen Aufträgen oder Störungen?", 
      answer: "Ja, für uns ist kein Auftrag zu klein. Ob Herd-Anschluss oder Störungen in Ihrer Elektroanlage – wir sind für Privat- und Gewerbekunden da." 
    },
    { 
      question: "Bieten Sie Lösungen für KNX und Datennetze an?", 
      answer: "Ja, wir sind Experten für KNX-Haussteuerung, moderne Beleuchtungsplanung und die Installation strukturierter Datennetze für anspruchsvolle Bauvorhaben." 
    },
    { 
      question: "Suchen Sie aktuell Auszubildende oder Fachkräfte?", 
      answer: "Ja, wir suchen motivierte Elektroniker und bieten fundierte Ausbildungsplätze an. Details finden Sie unter dem Punkt Stellenangebote auf unserer Website." 
    }
  ]
},

];

export function getElectricianClientBySlug(slug: string): ElectricianClient | undefined {
  return electricianClients.find(client => client.slug === slug);
}