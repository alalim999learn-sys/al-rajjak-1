


//C:\Users\Shanon\al-rajjak-1\app\lib\companies.ts
// C:\Users\Shanon\al-rajjak-1\app\lib\companies.ts

// C:\Users\Shanon\al-rajjak-1\app\lib\companies.ts

// C:\Users\Shanon\al-rajjak-1\app\lib\companies.ts

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  agentName: string;
  welcomeMsg: string;
  placeholder: string;
  buttonText: string;
  price: string;
  category: string;
  email: string;
  phone: string;
  address: string;
  mapsLink : string;
  specialty?: string;
  coverage?: string;
  mobile?: string;
  ownerTitle?: string;
}

export const companies: Company[] = [
  {
    id: "perfect-1",
    name: "Perfekt gereinigt",
    slug: "perfekt-gereinigt",
    logo: "/logos/pray.png",
    agentName: "Lisa",
    welcomeMsg: "Guten Tag! Ich bin Lisa. Suchen Sie eine zuverlässige Reinigung in Stuttgart? Ich helfe Ihnen in 2 Minuten zum Angebot! 🧹\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Was können wir für Sie reinigen?",
    buttonText: "Jetzt Angebot einholen",
    price: "Individuelles Bestpreis-Angebot",
    category: "Gebäudereinigung",
    email: "info@perfekt-gereinigt.de",
    phone: "0711 25286721",
    address: "Schützenstraße 14, 70182 Stuttgart",
    mapsLink: "https://www.google.com/maps/place/Perfekt+gereinigt/@48.7809767,9.1861015,17.5z/data=!4m6!3m5!1s0x436b23456c9cc0d5:0xb5aff549c3ebd543!8m2!3d48.7814647!4d9.1900756!16s%2Fg%2F11y6_l5_tr?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
    coverage: "Stuttgart und Umgebung"
  },
  {
    id: "eme-1",
    name: "EME Gebäudereinigung",
    slug: "eme-gebaeudereinigung",
    logo: "/logos/eme.png",
    agentName: "Eric",
    welcomeMsg: "Guten Tag! Ich bin Eric. Wir bieten professionelle Meister-Reinigung und Desinfektion in Stuttgart. Wie kann ich Ihnen heute helfen? 🛡️\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Frage zu Büro-, Praxis- oder Sonderreinigung...",
    buttonText: "Kostenloses Angebot anfordern",
    price: "Meisterqualität zum Bestpreis",
    category: "Meisterbetrieb & Desinfektion",
    email: "info@eme-gebaeudereinigung.de",
    phone: "0711 93340839",
    address: "Rohrer Höhe 32, 70565 Stuttgart",
    mapsLink: "https://www.google.com/maps/place/EME+Geb%C3%A4udereinigung+Meisterbetrieb/@48.7183177,9.0887427,17z/data=!3m1!4b1!4m6!3m5!1s0x4799db5f6548402f:0x5adaeef60fd6a6c!8m2!3d48.7183177!4d9.0913176!16s%2Fg%2F1tdmcvxp?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
    specialty: "Staatlich geprüfter Desinfektor",
    coverage: "Stuttgart Region"
  },
  {
    id: "glanz-1",
    name: "Glanz Gebäudereinigung",
    slug: "glanz-gebaeudereinigung",
    logo: "/logos/glan99.png",
    agentName: "Zeljka",
    welcomeMsg: "Willkommen! Ich bin Zeljka. Wir bringen Glanz in Ihre Büros und Privaträume. Was kann ich für Sie tun? ✨\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Fragen Sie nach Büro-, Praxis- oder Privatreinigung...",
    buttonText: "Kostenloses Angebot",
    price: "Gutes Preis-Leistungs-Verhältnis",
    category: "Gebäude- & Privatreinigung",
    email: "info@benakovic-glanz.de",
    phone: "0176 72 64 4762",
    address: "Wildensteinstrasse 19, 70469 Stuttgart",
    mapsLink: "https://www.google.com/maps/place/Glanz+Geb%C3%A4udereinigung+GmbH/@48.804415,9.1536363,17z/data=!3m1!4b1!4m6!3m5!1s0x4799dae47d5f3961:0x46bd54b1de04c307!8m2!3d48.804415!4d9.1562112!16s%2Fg%2F11b8z0p6hb?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
    coverage: "Stuttgart, Ludwigsburg, Esslingen"
  },
  {
    id: "duda-1",
    name: "Duda Gebäudeservice",
    slug: "duda-gebaeudeservice",
    logo: "/logos/duda.png",
    agentName: "Wiktoria",
    welcomeMsg: "Guten Tag! Ich bin Wiktoria Duda. Wir garantieren höchste Effizienz und Sauberkeit in Stuttgart. Wie kann ich Ihnen heute helfen? 📈\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Was kann ich für Sie tun?",
    buttonText: "Angebot anfordern",
    price: "Faire Konditionen nach Besichtigung",
    category: "Professioneller Gebäudeservice",
    email: "dudainfo7@gmail.com",
    phone: "0711 91288071",
    mobile: "0176 55459062",
    address: "Gundelsheimer Straße 42, 70437 Stuttgart",
    mapsLink: "https://www.google.com/maps?sca_esv=d115e34c1a0f1aef&biw=1920&bih=919&output=search&q=duda-gebaeudeservice.de&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3vWUtYx0DZdicpfE1faGYek-FGtKxD7AwCl01PyIDDohWYbrlrQeF6xGRCNN5fTbZEHC_U9M1-M7bIrXxb6PewKPp1FZlOMZKD9egrP_kvTuiGDmO5BHhXvD0MDe4Pe8mbXwy280fqmKGVgIk_epJBUzilNWpYQCjYebsDW0sR1gFMiVHg&entry=mc&ved=1t:200715&ictx=111",
    ownerTitle: "Master of Management",
    coverage: "Stuttgart Region"
  },
  {
    id: "mars-gs-1",
    name: "MARS Gebäudeservice GmbH",
    slug: "mars-gebaeudeservice",
    logo: "/logos/mars.png",
    agentName: "Mehmet",
    welcomeMsg: "Guten Tag! Ich bin Mehmet. Ihr Partner für Gebäudemanagement seit 2001. Wie kann ich Ihnen heute helfen? 🏗️\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Frage zu Glas-, Industrie- oder Brandschadensanierung...",
    buttonText: "Kostenloses Angebot anfordern",
    price: "Kompetenz seit over 20 Jahren",
    category: "Gebäudemanagement & Reinigung",
    email: "info@mars-gs.de",
    phone: "0711 45 95 80-0",
    address: "Ulmer Straße 254, 70327 Stuttgart",
    mapsLink: "https://www.google.com/maps?sca_esv=d115e34c1a0f1aef&output=search&q=Ulmer+Stra%C3%9Fe+254+70327+Stuttgart+mars&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpUrv6YeyJhXfuYqj4Fj6c1U4Z6Yq0xAU8tFlmuJvKXCsINjFxHEx_8fz7FUtRiLjLrgJvQrdI7U8DZTrIxCLgEABsno1Zl6nRed6iAxkCo7zpMaAIH9qn8eGlWBoHthDW8Ojxhrrzlmt1Q3DpU0KpVXzWUFtSKofSUtDM_NDTdTKCSdBPzKNjrJDtYUQtXjDSTdA01g&entry=mc&ved=1t:200715&ictx=111",
    specialty: "ISO 9001/14001 Zertifiziert",
    coverage: "Stuttgart, Heilbronn & Region",
    ownerTitle: "Geschäftsführer: Mehmet Sakar"
  },
  {
    id: "planreinigung-1",
    name: "PlanReinigung",
    slug: "planreinigung-stuttgart",
    logo: "/logos/pray2.png",
    agentName: "Efstathios",
    welcomeMsg: "Guten Tag! Ich bin Efstathios. Zuverlässige Reinigung ab 129€ monatlich. Suchen Sie Hilfe für Ihr Büro বা Haus? 📝\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Frage zu Büro, PC-Reinigung oder Haushalt...",
    buttonText: "Probe-Reinigung vereinbaren",
    price: "Haushalt ab 129€ | Büro ab 149€",
    category: "Gebäudereinigung & PC-Service",
    email: "info@planreinigung.de",
    phone: "+49 7031 92 23 053",
    mobile: "0178 828 56 55",
    address: "Gauß Straße 6, 71032 Böblingen",
    mapsLink: "https://www.google.com/maps/place/PlanReinigung/@48.781964,9.1751793,17z/data=!3m1!4b1!4m6!3m5!1s0x4799bf2260b66c85:0x7cfecafbcc4b1b6f!8m2!3d48.781964!4d9.1777542!16s%2Fg%2F11fy1ltr4c?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
    specialty: "PC-Reinigung & Gastronomie-Service",
    coverage: "Stuttgart, Böblingen und Umgebung",
    ownerTitle: "Inhaber: Efstathios Lazaridis"
  },
  {
    id: "krasniqi-1",
    name: "Krasniqi Gebäudereinigung",
    slug: "krasniqi-gebaeudereinigung",
    logo: "/logos/kras.png",
    agentName: "Astrit",
    welcomeMsg: "Guten Tag! Ich bin Astrit Krasniqi, Ihr Meisterbetrieb für Reinigung und Winterdienst. 🧼\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Fragen Sie nach Büro, Fenster oder Winterdienst...",
    buttonText: "Unverbindliches Angebot",
    price: "Faire Preise vom Meisterbetrieb",
    category: "Meisterbetrieb Gebäudereinigung",
    email: "info@krasniqi-gebaeudereinigung.de",
    phone: "0711 7949350",
    address: "Christophstraße 40, 70771 Leinfelden-Echterdingen",
    mapsLink: "https://www.google.com/maps/place/Krasniqi+Geb%C3%A4udereinigung+Meisterbetrieb/@48.6852548,9.1650374,17z/data=!3m1!4b1!4m6!3m5!1s0x4799c2a5be81f02f:0x7d45ee785fab6a93!8m2!3d48.6852548!4d9.1676123!16s%2Fg%2F11b70r84bd?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
    specialty: "Staatlich geprüfter Desinfektor",
    coverage: "Leinfelden-Echterdingen, Stuttgart & Umgebung",
    ownerTitle: "Inhaber: Astrit Krasniqi"
  },
  {
    id: "aktiv-stuttgart-1",
    name: "Aktiv Stuttgart Gebäudemanagement GmbH",
    slug: "aktiv-stuttgart",
    logo: "/logos/akti.png",
    agentName: "Adem",
    welcomeMsg: "Herzlich Willkommen! Ich bin Adem. Ihr 24/7 Partner für Reinigung und Winterdienst. ❄️\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir in Ihrer bevorzugten Sprache!",
    placeholder: "Frage zu Büro-, Industrie- oder Krankenhausreinigung...",
    buttonText: "Kostenlose Beratung anfordern",
    price: "Attraktives Preis-Leistungs-Verhältnis",
    category: "Gebäudemanagement & 24/7 Service",
    email: "info@aktiv-group.de",
    phone: "+49 711 504 450 06",
    address: "Linzer Str. 88 C, 70469 Stuttgart",
    mapsLink: "https://www.google.com/maps?sca_esv=d115e34c1a0f1aef&output=search&q=Aktiv+Stuttgart+Geb%C3%A4udemanagement+GmbH+Verwaltung+Stuttgart+Holder%C3%A4ckerstra%C3%9Fe+4+70499+Stuttgart&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpyjlKjHcf0Gfll8GFgal4hTg-TO6j2hK084tXdPRqXpoL4OSxaylUbn8ej1EEalS7xWamwOt8MLZlMdwzW12hdiFFpGiLm5uayvV21RI4NKTp-LCU6hd0iFVYT3oEp4CLjKLQm3f4p331BMt906IGhNf_vT6A5aMm4rTRQ2mGATan1FqiPKj-GxXsZYDK2VwmvU7Fjg&entry=mc&ved=1t:200715&ictx=111",
    specialty: "24/7 Service & Krankenhausreinigung",
    coverage: "Stuttgart und Region",
    ownerTitle: "Geschäftsführer: Adem Nazioglu"
  },
  {
    id: "brandt-haus-garten-1",
    name: "Brandt Haus & Garten",
    slug: "brandt-haus-garten",
    logo: "/logos/bran.png",
    agentName: "Max",
    welcomeMsg: "Guten Tag! Ich bin Max. Wir pflegen Ihren Garten und Ihre Immobilie mit Leidenschaft. Was kann ich für Sie tun? 🌳\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    placeholder: "Frage zu Garten, Reinigung oder Hausmeister...",
    buttonText: "Kostenlose Anfrage stellen",
    price: "Individuelles Angebot für Ihr Objekt",
    category: "Haus- & Gartenpflege",
    email: "info@brandt-haus-garten.de",
    phone: "07158-67543",
    mobile: "0170-9602212",
    address: "Friedhofstraße 7, 70794 Filderstadt",
    mapsLink: "https://www.google.com/maps/place/Brandt+Haus-+%26+Gartenpflege/@48.6675802,9.2311618,17z/data=!3m1!4b1!4m6!3m5!1s0x6ec95faacb73f8af:0xae2677b25a34cf62!8m2!3d48.6675802!4d9.2337367!16s%2Fg%2F11w9fgpr8s?entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
    specialty: "Garten- & Landschaftspflege",
    coverage: "Filderstadt, Stuttgart & Umgebung",
    ownerTitle: "Inhaber: Max Brandt"
  }
];

export const getCompanyBySlug = (slug: string) => {
  return companies.find((c) => c.slug === slug);
};