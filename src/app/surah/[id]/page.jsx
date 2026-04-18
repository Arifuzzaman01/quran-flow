import SurahView from "@/components/SurahView";
import { getSurahDetails } from "@/utils/getSurah";

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function SurahPage({ params }) {
  const { id } = await params;
  const surah = await getSurahDetails(id);

  

  if (!surah) {
    return <div className="p-10 text-center">Surah is Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Surah Info Section (Server Side) */}
      <div className="text-center mb-10 p-8 bg-emerald-50 rounded-2xl">
        <h1 className="text-4xl font-bold text-emerald-800">{surah.name}</h1>
        <h2 className="text-xl text-emerald-600 mt-2">
          {surah.transliteration}
        </h2>
        <p className="text-gray-600 mt-2">
          {surah.translation} • {surah.total_verses} Verses
        </p>
      </div>

      {/* Verses List (Client Side View) */}
      <SurahView surah={surah} />
    </div>
  );
}
