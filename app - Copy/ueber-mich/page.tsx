



//ueber-mich/page.tsx
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Über mich | Shanon Alam - KI-Experte',
  description: 'Erfahren Sie mehr über Shanon Khan, Ihren Experten für KI-Automatisierung und IT-Sicherheit.',
};
export default function UeberMichPage() {
  return (
    /* margin-top: 100px করা হয়েছে যাতে পেজটা ওপর থেকে একটু নিচে নামে */
    <div style={{ maxWidth: '800px', margin: '100px auto', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      
      {/* Header */}
      <h1 style={{ borderBottom: '2px solid #0056b3', paddingBottom: '10px', color: '#0056b3', fontSize: '2.2rem' }}>
        Über mich: Shanon Khan
      </h1>

      {/* Intro Section */}
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '30px', color: '#1a1a1a' }}>
        Cybersecurity-Experte & Spezialist für KI-Integration
      </p>
      
      <p style={{ marginTop: '20px' }}>
        Mein Name ist Shanon Khan. Ich helfe Arztpraxen und Anwaltskanzleien in Deutschland dabei, 
        ihre digitale Effizienz durch sichere KI-Lösungen zu steigern. Mit meinem Hintergrund in 
        der Cybersicherheit sorge ich dafür, dass Innovation und Datenschutz Hand in Hand gehen.
      </p>

      {/* Education & Journey */}
      <h2 style={{ marginTop: '40px', color: '#444', fontSize: '1.6rem' }}>Mein Hintergrund</h2>
      <ul style={{ listStyleType: 'square', marginTop: '15px' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>Akademische Ausbildung:</strong> Studium der Chemie am renommierten <strong>Dhaka College</strong>.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Schulzeit:</strong> Abschluss am <strong>Mohammadpur Model School & College</strong>.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Cybersecurity:</strong> Seit meiner Schulzeit (12. Klasse) beschäftige ich mich intensiv mit Web-Sicherheit und WordPress-Hardening.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>KI-Expertise:</strong> Seit Anfang 2024 konzentriere ich mich auf das Training von KI-Modellen, um administrative Aufgaben in hochsensiblen Bereichen zu automatisieren.
        </li>
      </ul>

      {/* Vision Section */}
      <h2 style={{ marginTop: '40px', color: '#444', fontSize: '1.6rem' }}>Warum ich tue, was ich tue</h2>
      <p style={{ marginTop: '15px' }}>
        Ich liebe es, KI-Modelle zu trainieren und sie so zu optimieren, dass sie echten Mehrwert bieten. 
        Mein Ziel ist es, Ärzte und Anwälte von repetitiven Aufgaben zu entlasten, damit sie sich auf 
        das Wesentliche konzentrieren können: ihre Patienten und Klienten.
      </p>

      {/* Values */}
      <div style={{ backgroundColor: '#f9f9f9', padding: '25px', borderRadius: '8px', marginTop: '40px', borderLeft: '5px solid #0056b3 shadow: 0 2px 4px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: '0', fontStyle: 'italic' }}>
          <strong>Meine Philosophie:</strong> "Technologie sollte den Menschen dienen, nicht umgekehrt. 
          Sicherheit ist dabei kein optionales Extra, sondern das Fundament."
        </p>
      </div>

      {/* Footer link */}
      <div style={{ marginTop: '60px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '30px' }}>
        <a href="/kontakt" style={{ color: '#0056b3', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
          ➔ Lassen Sie uns zusammenarbeiten
        </a>
      </div>

    </div>
  );
}