import Link from "next/link";

export default function Impressum() {
  return (
    <main className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6">Impressum</h1>
      <p className="font-bold">Shanon Khan</p>
      <p>Dhaka, Bangladesh</p>
      <p className="mt-4">Web: <span className="text-blue-600">shanon-alam.de</span></p>
      <p className="mt-2 text-blue-600 underline">shanonkhan47@gmail.com</p>
      <p className="mt-2 text-blue-600 underline">LinkedIn: Shanon Khan</p>
      
      <div className="mt-10 pt-4 border-t text-sm text-gray-500">
        Verantwortlich gemäß § 5 TMG: Shanon Khan
      </div>
      
      <Link href="/" className="mt-10 block text-blue-500">← Zurück / Back</Link>
    </main>
  );
}