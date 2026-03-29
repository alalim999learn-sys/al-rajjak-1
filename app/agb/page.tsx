import Link from "next/link";

export default function AGB() {
  return (
    <main className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">AGB (Allgemeine Geschäftsbedingungen)</h1>
      <p className="mb-4">§1 Geltungsbereich: Dienstleistungen für KI-Chatbots von Shanon Khan.</p>
      <p className="mb-4">§2 Zahlung: 50% Vorauszahlung, 50% nach Fertigstellung (Euro).</p>
      <p className="mb-4">§3 Haftung: Keine Haftung für KI-generierte medizinische Fehlinformationen.</p>
      
      <Link href="/" className="mt-10 block text-blue-500">← Zurück / Back</Link>
    </main>
  );
}