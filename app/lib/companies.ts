


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
  },
    {
    "id": "boss-transporte-1",
    "name": "Firma Boss Transporte",
    "slug": "boss-transporte",
    "logo": "/logos/boss1.png",
    "agentName": "Akram",
    "welcomeMsg": "Assalamu Alaikum! Ich bin Akram. Wir sind Ihr zuverlässiger Partner für Umzüge, Transporte und Entrümpelungen in Berlin. Wie kann ich Ihnen heute helfen? 🚛\n\nHinweis: Ich beherrsche alle Sprachen. Schreiben Sie mir einfach in Ihrer bevorzugten Sprache!",
    "placeholder": "Frage zu Umzug, Möbeltaxi oder Entsorgung...",
    "buttonText": "Kostenloses Angebot anfordern",
    "price": "Individuelles Angebot für Ihren Transport",
    "category": "Transport & Logistik",
    "email": "kontakt@bosstransporte.de",
    "phone": "01791239064",
    "mobile": "01795687878",
    "address": "Silbersteinstraße 115, 12051 Berlin",
    "mapsLink": "https://www.google.com/maps/place/Boss+Transporte/@52.46562,12.8163587,10z/data=!3m1!5s0x47a84f9aa0d6f4e3:0x5e5bc0d5fbd80fe8!4m10!1m2!2m1!1sSpedition+Berlin+T%C3%BCrkisch!3m6!1s0x47a84fa93d79a06d:0xe0cf3e945aaa3dc8!8m2!3d52.46562!4d13.4260999!15sChpTcGVkaXRpb24gQmVybGluIFTDvHJraXNjaFocIhpzcGVkaXRpb24gYmVybGluIHTDvHJraXNjaJIBEHNoaXBwaW5nX2NvbXBhbnmaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUlNiMHRsVFZObkVBReABAPoBBQi_AhBG!16s%2Fg%2F11h2qp17_x?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Umzüge, Möbel-Taxi & Entsorgung",
    "coverage": "Berlin, Brandenburg, Potsdam & bundesweit",
    "ownerTitle": "Geschäftsführer: Akram El-Khatib"
},
{
    "id": "mejclean-stuttgart-16",
    "name": "Mejclean Gebäudereinigung",
    "slug": "mejclean-stuttgart",
    "logo": "/logos/mej01.png",
    "agentName": "Arber",
    "welcomeMsg": "Hallo! Ich bin Arber, Ihr digitaler Assistent von Mejclean. Wir sorgen für strahlende Sauberkeit in Stuttgart – von der Gebäudereinigung bis zum Hausmeisterdienst. Wie kann ich Ihnen heute helfen? ✨",
    "placeholder": "Frage zu Gebäudereinigung, Haushaltshilfe oder Preisen...",
    "buttonText": "Kostenloses Angebot anfordern",
    "price": "Individuelles Angebot für Ihre Reinigung",
    "category": "Gebäudereinigung & Hausmeisterservice",
    "email": "mej.clean@web.de",
    "phone": "+4917645341259",
    "mobile": "+4917645341259",
    "address": "Breitscheidstraße 36, 70176 Stuttgart",
    "mapsLink": "https://www.google.com/maps/place/Mejclean+Geb%C3%A4udereinigung/@48.7777552,9.1617421,17z/data=!3m1!4b1!4m6!3m5!1s0x4799db7712f286d7:0xda1bb23904d84827!8m2!3d48.7777552!4d9.164317!16s%2Fg%2F11ysxfsw56?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Gebäudereinigung, Hausmeisterdienst & Haushaltshilfe",
    "coverage": "Stuttgart und Umgebung",
    "ownerTitle": "Inhaber: Arber Mejzinolli"
},



{
    "id": "sp-gebaeudereinigung-20",
    "name": "SP Gebäudereinigung GmbH",
    "slug": "sp-stuttgart",
    "logo": "/logos/sp.png",
    "agentName": "Graziella",
    "welcomeMsg": "Willkommen bei SP Gebäudereinigung! Ich bin Graziella, Ihre digitale Assistentin. Seit über 35 Jahren stehen wir für Sauberkeit in Stuttgart. Wie kann ich Ihnen heute bei Ihrem Projekt helfen? 🏢",
    "placeholder": "Frage zu Büroreinigung, Baureinigung oder Kanalservice...",
    "buttonText": "Kostenlosen Beratungstermin sichern",
    "price": "Individuelle Lösungen seit über 35 Jahren",
    "category": "Premium Gebäudereinigung & Industrieservice",
    "email": "info@s-p-gebaeudereinigung.de",
    "phone": "07116573826",
    "mobile": "07116573826",
    "address": "Schelmenwasenstr. 28, 70567 Stuttgart",
    "mapsLink": "https://www.google.com/maps/place/SP+Geb%C3%A4udereinigung+GmbH/@48.7258786,8.9901591,12z/data=!4m10!1m2!2m1!1sReinigungsfirma+Stuttgart!3m6!1s0x4799dc5c696d0a95:0xbda6be0b70b189f4!8m2!3d48.7376627!4d9.1102518!15sChlSZWluaWd1bmdzZmlybWEgU3R1dHRnYXJ0kgEWaG91c2VfY2xlYW5pbmdfc2VydmljZeABAA!16s%2Fg%2F1tgn8l5b?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Kaufhausreinigung, Baureinigung & Kanalreinigung",
    "coverage": "Stuttgart, Region & öffentliche Einrichtungen",
    "ownerTitle": "Geschäftsführerin: Graziella Girmena"
},
{
    "id": "sultanic-stuttgart-21",
    "name": "Gebäudereinigung Sultanic",
    "slug": "sultanic-stuttgart",
    "logo": "/logos/sultan.png",
    "agentName": "Allmir",
    "welcomeMsg": "Willkommen bei Gebäudereinigung Sultanic! Ich bin Allmir, Ihr digitaler Assistent. Als Meisterbetrieb in Stuttgart garantieren wir höchste Reinigungsqualität. Wie kann ich Ihnen heute helfen? 🏆",
    "placeholder": "Frage zu Meister-Reinigungsdienst, Büroreinigung oder Terminen...",
    "buttonText": "Meister-Beratung anfordern",
    "price": "Qualität vom Meisterbetrieb in Stuttgart",
    "category": "Meisterbetrieb für Gebäudereinigung",
    "email": "verwaltung@sultanic.de",
    "phone": "071128431882",
    "mobile": "017678344112",
    "address": "Am Wammesknopf 39, 70439 Stuttgart",
    "mapsLink": "https://www.google.com/maps/place/Geb%C3%A4udereinigung+Sultanic/@48.7258786,8.9901591,12z/data=!4m10!1m2!2m1!1sReinigungsfirma+Stuttgart!3m6!1s0x4799dbfb2ed62d6f:0x2b54cad6e0cbbe0c!8m2!3d48.854746!4d9.1467508!15sChlSZWluaWd1bmdzZmlybWEgU3R1dHRnYXJ0WhsiGXJlaW5pZ3VuZ3NmaXJtYSBzdHV0dGdhcnSSARZob3VzZV9jbGVhbmluZ19zZXJ2aWNlmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDIxWmVXUXdVVEJaTW1oVVZVZDRNVk50YkZsa2VrSktVbGhDUTJWR1JSQULgAQD6AQUIpQMQQw!16s%2Fg%2F11fvc4_4tv?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Gewerbereinigung, Fassadenreinigung & Glaspflege",
    "coverage": "Ganz Stuttgart und Umgebung",
    "ownerTitle": "Geschäftsführer: Allmir Sultanic"
},
{
    "id": "allstgt-stuttgart-22",
    "name": "AllStgt Gebäudereinigung",
    "slug": "allstgt-stuttgart",
    "logo": "/logos/all.png",
    "agentName": "Karatas",
    "welcomeMsg": "Hallo! Ich bin Karatas, Ihr digitaler Assistent von AllStgt. Mit fast 20 Jahren Erfahrung sorgen wir in Stuttgart für Sauberkeit mit Herz. Wie kann ich Ihnen heute helfen? 🏠",
    "placeholder": "Frage zu Büroreinigung, Fensterreinigung oder Hausservice...",
    "buttonText": "Kostenloses Angebot anfordern",
    "price": "Zuverlässiger Service seit 2004",
    "category": "Gebäudereinigung & Dienstleistungen",
    "email": "info@allstgt.de",
    "phone": "071112568740",
    "mobile": "071112568740",
    "address": "Düsseldorfer Str. 48, 70376 Stuttgart",
    "mapsLink": "https://www.google.com/maps/place/AllStgt+Reinigung/@48.854746,8.9943155,12z/data=!3m1!5s0x4799d08e878591f9:0x97e5d364724b94e7!4m10!1m2!2m1!1sReinigungsfirma+Stuttgart!3m6!1s0xa3d5276646e4bc45:0x34ec38b63ba194e1!8m2!3d48.948576!4d9.2776791!15sChlSZWluaWd1bmdzZmlybWEgU3R1dHRnYXJ0WhsiGXJlaW5pZ3VuZ3NmaXJtYSBzdHV0dGdhcnSSAQhjbGVhbmVyc5oBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyNVJNV1ZJYTNSVE1WbzBXV2t4WVdGc1NYaGlNVTB3VmtWMGRrNHhSUkFC4AEA-gEECF4QRg!16s%2Fg%2F11yntf_br8?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Büroreinigung, Glasreinigung & Bauendreinigung",
    "coverage": "Stuttgart und ganz Baden-Württemberg",
    "ownerTitle": "Geschäftsführer: A. Karatas"
},
{
    "id": "purify-fassadenreinigung-23",
    "name": "Purify Fassadenreinigung",
    "slug": "purify-fassaden",
    "logo": "/logos/purify.png",
    "agentName": "Purify-Expert",
    "welcomeMsg": "Willkommen bei Purify! Ich bin Ihr Spezialist für Fassadenreinigung. Ob Algen, Schimmel oder Graffiti – wir machen Ihre Fassade wieder wie neu, ganz ohne Gerüst. Wie kann ich Ihnen heute helfen? 🧼",
    "placeholder": "Frage zu Algenentfernung, Graffitischutz oder Probefläche...",
    "buttonText": "Kostenlose Probefläche vereinbaren",
    "price": "Bis zu 70% günstiger als ein Neuanstrich",
    "category": "Spezialisierte Fassadenreinigung",
    "email": "info@purify-fassadenreinigung.de",
    "phone": "+4971912299824",
    "mobile": "+4971912299824",
    "address": "Alte Ziegeleistraße 1, 71554 Weissach im Tal",
    "mapsLink": "https://www.google.com/maps/place/Purify+Fassadenreinigung/@48.925006,9.3275657,12z/data=!4m9!1m2!2m1!1sReinigungsfirma+Stuttgart!3m5!1s0x4799b3a046c2099d:0x4695319e196e7158!8m2!3d48.925006!4d9.4800014!16s%2Fg%2F11q1dmqqb9?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Graffitientfernung, Algen- & Schimmelbeseitigung",
    "coverage": "Stuttgart, Backnang und Umgebung",
    "ownerTitle": "Geschäftsführer: Purify GbR"
},









{
    "id": "optik-billard-muenchen-1890",
    "name": "Optik Billard",
    "slug": "optik-billard-muenchen",
    "logo": "/logos/optik-billard.png",
    "agentName": "Billard-Assistant",
    "welcomeMsg": "Willkommen bei Optik Billard! 👓 Seit über 130 Jahren sind wir Ihr Experte für Augenoptik am Gärtnerplatz. Möchten Sie einen Termin für den DNEye® Scanner vereinbaren oder haben Sie Fragen zu unseren Gleitsicht- und Sportbrillen? Ich berate Sie gerne!",
    "placeholder": "Fragen zu Sehtest, DNEye® Scanner oder Kinderbrillen...",
    "buttonText": "Termin online buchen",
    "price": "Biometrische Brillengläser & Präzisions-Augenprüfung",
    "category": "Traditionelle Augenoptik & Fachgeschäft",
    "email": "info@optik-billard.de",
    "phone": "+49892015654",
    "mobile": "+49892015654",
    "address": "Reichenbachstraße 21, 80469 München",
    "mapsLink": "https://www.google.com/maps?sca_esv=a0d70b9a05ec05b7&output=search&q=optik-billard.de/&source=lnms&fbs=ADc_l-aN0CWEZBOHjofHoaMMDiKpaEWjvZ2Py1XXV8d8KvlI3sbM0Xv-BZKE_VrZb6-djVhCkJfkPjVZOtcwoV4dUmaVQJQMZgmMy4RLTGx47saJcJ7DX857GX7cu6ce7bRstzWdpYjWBlAS_CNY18VQO5JNAKoyQqtEAMwGdPQJbn-aeQf5iGv1BHNT7I9IWKObTQMj_wSNFLn_j8j3_bNln3VH13WZUQ&entry=mc&ved=1t:200715&ictx=111",
    "specialty": "DNEye® Scanner, Gleitsichtbrillen, Sportbrillen",
    "coverage": "München (Gärtnerplatz / Isarvorstadt)",
    "ownerTitle": "Geschäftsführer: Timo Beyer | Dirk Stader (OUNDA GmbH)"
},
{
    "id": "trendoptic-schwabing-muenchen",
    "name": "trendOptic Schwabing",
    "slug": "trendoptic-schwabing",
    "logo": "/logos/trend.png",
    "agentName": "TrendOptic-Expert",
    "welcomeMsg": "Willkommen bei trendOptic in Schwabing! 👓 Suchen Sie nach Kontaktlinsen von Alcon oder Bausch & Lomb, oder möchten Sie einen Sehtest in der Leopoldstraße vereinbaren? Ich berate Sie gerne zu unseren Marken und Services!",
    "placeholder": "Frage zu Kontaktlinsen, Sehtest oder Marken wie CooperVision...",
    "buttonText": "Individuellen Termin vereinbaren",
    "price": "Markenvielfalt & Kompetente Augenoptik",
    "category": "Exklusives Brillenfachgeschäft",
    "email": "schwabing@trendoptic.de",
    "phone": "+4908938899639",
    "mobile": "+4908938899639",
    "address": "Leopoldstr. 76, 80802 München",
    "mapsLink": "https://www.google.com/maps/place/trendOptic+Schwabing+GmbH/@48.1523359,11.499159,11.5z/data=!3m1!5s0x479e75b88d5d04b7:0x635fac4b47244519!4m11!1m3!2m2!1sOptik+Fachgesch%C3%A4ft+M%C3%BCnchen!6e6!3m6!1s0x479e75b8ed542fd1:0x25361e0e0d1dd9ec!8m2!3d48.1606086!4d11.5863214!15sChxPcHRpayBGYWNoZ2VzY2jDpGZ0IE3DvG5jaGVuWh4iHG9wdGlrIGZhY2hnZXNjaMOkZnQgbcO8bmNoZW6SAQhvcHRpY2lhbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VSNmJsQkVZMjEzUlJBQuABAPoBBAg3ED8!16s%2Fg%2F1tcv596d?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Kontaktlinsen-Spezialist, Markenbrillen, Sehtest",
    "coverage": "München (Schwabing)",
    "ownerTitle": "Geschäftsführer: Thomas Schneider, Slieman Mohammad"
},
{
    "id": "arabella-optic-muenchen-2004",
    "name": "arabella optic",
    "slug": "arabella-optic",
    "logo": "/logos/arabella.png",
    "agentName": "Arabella-Expert",
    "welcomeMsg": "Willkommen bei arabella optic am Rosenkavalierplatz! 👓 Suchen Sie nach unseren speziellen Nachtlinsen (Ortho-K) oder möchten Sie eine Augenglasbestimmung mit der MKH-Methode? Ich helfe Ihnen gerne bei Fragen zu scharfem und entspanntem Sehen!",
    "placeholder": "Fragen zu Nachtlinsen, Prismenbrillen oder Sehtest...",
    "buttonText": "Termin vereinbaren",
    "price": "Spezialist für Funktional-Optometrie & Kontaktlinsen",
    "category": "Optometrie & Fachgeschäft",
    "email": "9arabella@online.de",
    "phone": "+4989911310",
    "mobile": "+491759204699",
    "address": "Rosenkavalierplatz 12, 81925 München",
    "mapsLink": "https://www.google.com/maps/place/arabella+optic/@48.1523359,11.499159,11.5z/data=!3m1!5s0x479e750d5de367dd:0xfacfc43864a1be26!4m11!1m3!2m2!1sOptik+Fachgesch%C3%A4ft+M%C3%BCnchen!6e6!3m6!1s0x479e750d7aab976b:0x74274d39c99dd6be!8m2!3d48.151032!4d11.6202062!15sChxPcHRpayBGYWNoZ2VzY2jDpGZ0IE3DvG5jaGVuWh4iHG9wdGlrIGZhY2hnZXNjaMOkZnQgbcO8bmNoZW6SARBzdW5nbGFzc2VzX3N0b3JlmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJwVmVsZEdWakZVV0c5NFRYcHJNRk5WU2xSalZtaG1WREpqTUUxRlJSQULgAQD6AQUIwAIQSA!16s%2Fg%2F1tj5pqsm?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Ortho-Keratologie (Nachtlinsen), Prismenbrillen, Easy Scan Netzhaut-Screening",
    "coverage": "München (Arabellapark / Bogenhausen)",
    "ownerTitle": "Inhaber: Thomas Roehm (Optometrist)"
},
{
    "id": "optik-paradies-suchy-1984",
    "name": "Optik Paradies Suchy",
    "slug": "optik-paradies-suchy",
    "logo": "/logos/optik-pray.png",
    "agentName": "Suchy-Expert",
    "welcomeMsg": "Herzlich Willkommen im Optik Paradies Suchy! 👓 Suchen Sie eine neue Brille aus unserer Auswahl von über 1000 Gestellen oder benötigen Sie eine Reparatur in unserer eigenen Werkstatt? Ich helfe Ihnen gerne bei Fragen zu Sehtests und anatomischen Anpassungen!",
    "placeholder": "Fragen zu Sehtest, Reparatur in 1 Stunde oder Brillengestellen...",
    "buttonText": "Beratungstermin vereinbaren",
    "price": "Handwerkliche Präzision & Express-Service in 1 Stunde",
    "category": "Traditioneller Augenoptiker & Meisterbetrieb",
    "email": "info@optikparadiessuchy.com",
    "phone": "+49897600000",
    "mobile": "+49897600000",
    "address": "Sendlinger Strasse 60, 80331 München",
    "mapsLink": "https://www.google.com/maps/place/Optik+Paradies+GmbH/@48.1523359,11.499159,11.5z/data=!3m1!5s0x479ddf5f47ae2159:0xf430984ae436a0ca!4m11!1m3!2m2!1sOptik+Fachgesch%C3%A4ft+M%C3%BCnchen!6e6!3m6!1s0x479ddf5f4667f999:0x100039a1e2783fd0!8m2!3d48.1343705!4d11.5682103!15sChxPcHRpayBGYWNoZ2VzY2jDpGZ0IE3DvG5jaGVuWh4iHG9wdGlrIGZhY2hnZXNjaMOkZnQgbcO8bmNoZW6SAQhvcHRpY2lhbpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOZloyRlBaVXBCRUFF4AEA-gEFCJADEDo!16s%2Fg%2F1tg780l5?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Eigene Werkstatt, Reparatur in einer Stunde, über 1000 Brillengestelle",
    "coverage": "München (Altstadt / Zentrum)",
    "ownerTitle": "Vertreten durch: Herrn Ole Geelhaar"
},
{
    "id": "augenstern-optik-muenchen-smolka",
    "name": "Augenstern Optik",
    "slug": "augenstern-optik",
    "logo": "/logos/auge.png",
    "agentName": "Augenstern-Guide",
    "welcomeMsg": "Willkommen bei Augenstern Optik in der Sternstraße! 👓 Ich bin Ihr KI-Assistent für Meisterqualität in München. Haben Sie Fragen zu unseren Öffnungszeiten, möchten Sie einen (auch inoffiziellen) Termin vereinbaren oder suchen Sie eine individuelle Beratung bei Herrn Smolka? Ich helfe Ihnen gerne!",
    "placeholder": "Frage zu inoffiziellen Terminen, Sehtest oder Kontakt zu Herrn Smolka...",
    "buttonText": "Termin anfragen",
    "price": "Individuelle Meisteroptik & Persönlicher Service",
    "category": "Inhabergeführter Augenoptikermeister-Betrieb",
    "email": "info@augenstern-optik.de",
    "phone": "+498921329865",
    "mobile": "+498921329865",
    "address": "Sternstraße 26, 80538 München",
    "mapsLink": "https://www.google.com/maps/place/Augenstern+Optik+Christian+Smolka/@48.1523359,11.499159,11.5z/data=!4m11!1m3!2m2!1sOptik+Fachgesch%C3%A4ft+M%C3%BCnchen!6e6!3m6!1s0x479e7585a31c3637:0xa3f9df30d8942aa3!8m2!3d48.1402438!4d11.5912281!15sChxPcHRpayBGYWNoZ2VzY2jDpGZ0IE3DvG5jaGVuWh4iHG9wdGlrIGZhY2hnZXNjaMOkZnQgbcO8bmNoZW6SAQhvcHRpY2lhbpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOS2QwdFFOMk5CRUFF4AEA-gEECAAQHg!16s%2Fg%2F1v2kwf71?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Individuelle Termine außerhalb der Geschäftszeiten, Meisterberatung",
    "coverage": "München (Lehel / Altstadt-Lehel)",
    "ownerTitle": "Inhaber: Christian Smolka (Augenoptikermeister)"
},

{
    "id": "optik-hartogs-muenchen-leopold-27",
    "name": "Optik Hartogs",
    "slug": "optik-hartogs",
    "logo": "/logos/hartogs.png",
    "agentName": "Hartogs-Style-Expert",
    "welcomeMsg": "Willkommen bei Optik Hartogs in der Leopoldstraße! 🕶️ Suchen Sie nach exklusiven Marken wie Chanel, Lindberg oder Tom Ford? Mit über 60 Top-Marken im Sortiment helfe ich Ihnen gerne dabei, die perfekte Brille zu finden oder einen Termin zu vereinbaren!",
    "placeholder": "Fragen zu Marken (z.B. Lindberg, Gucci), Sehtest oder Öffnungszeiten...",
    "buttonText": "Beratungstermin vereinbaren",
    "price": "Exklusive Markenvielfalt & Erstklassige Optik",
    "category": "Premium Brillenfachgeschäft & Marken-Experte",
    "email": "optik.hartogs@t-online.de",
    "phone": "+4989333312",
    "mobile": "+4989333312",
    "address": "Leopoldstraße 27, 80802 München",
    "mapsLink": "https://www.google.com/maps/place/Optik+Hartogs/@48.1523359,11.499159,11.5z/data=!4m11!1m3!2m2!1sOptik+Fachgesch%C3%A4ft+M%C3%BCnchen!6e6!3m6!1s0x479e75bf45339a45:0xf9501bd2c232b254!8m2!3d48.1581906!4d11.58462!15sChxPcHRpayBGYWNoZ2VzY2jDpGZ0IE3DvG5jaGVuWh4iHG9wdGlrIGZhY2hnZXNjaMOkZnQgbcO8bmNoZW6SAQhvcHRpY2lhbpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOQ2ExOXhjM1JSUlJBQuABAPoBBAgAED4!16s%2Fg%2F1tjz6yqs?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D ",
    "specialty": "Riesige Markenauswahl (Chanel, Lindberg, Mykita), Hornbrillen, Sportbrillen",
    "coverage": "München (Schwabing)",
    "ownerTitle": "Geschäftsführer: Christoph Hartogs, Kai Steggewentz, Dominik Hartogs"
},


{
    "id": "optik-klockau-muenchen-schwabing",
    "name": "Optik Klockau",
    "slug": "optik-klockau",
    "logo": "/logos/optik-klochau.png",
    "agentName": "Klockau-Expert",
    "welcomeMsg": "Willkommen bei Optik Klockau in Schwabing! 👓 Ich bin Ihr Spezialist für Kontaktlinsen und exklusive Brillenmarken wie Markus T und RESREI. Wie kann ich Ihnen heute bei Ihrer Sehberatung helfen?",
    "placeholder": "Fragen zu Kontaktlinsen, Sehtest oder Marken wie Markus T...",
    "buttonText": "Termin vereinbaren",
    "price": "Individuelle Beratung durch Experten-Meisterbetrieb",
    "category": "Augenoptikermeister & Contactlinsenspezialist",
    "email": "klockau@optik-klockau.de",
    "phone": "+4989393485",
    "mobile": "+4989393485",
    "address": "Karl-Theodor-Straße 63, 80803 München",
    "mapsLink": "https://www.google.com/maps/place/Optik+Klockau+%7C+Brillen+Kontaktlinsen+und+Brillenreparaturen+%7C+M%C3%BCnchen/@48.1523359,11.499159,11.5z/data=!4m11!1m3!2m2!1sOptik+Fachgesch%C3%A4ft+M%C3%BCnchen!6e6!3m6!1s0x479e7542edbb58b3:0x1efef4dc58ff742f!8m2!3d48.1667053!4d11.5768345!15sChxPcHRpayBGYWNoZ2VzY2jDpGZ0IE3DvG5jaGVuWh4iHG9wdGlrIGZhY2hnZXNjaMOkZnQgbcO8bmNoZW6SAQhvcHRpY2lhbpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSdWQzUklXRkozRUFF4AEA-gEECCwQIg!16s%2Fg%2F11h_jszrc6?entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D",
    "specialty": "Contactlinsenspezialist, Exklusive Marken (Markus T, RESREI, Lool)",
    "coverage": "München (Schwabing-West / Karl-Theodor-Str.)",
    "ownerTitle": "Inhaberin: Barbara Klockau"
}


];

export const getCompanyBySlug = (slug: string) => {
  return companies.find((c) => c.slug === slug);
};