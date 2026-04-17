import { getAllSurah } from '@/utils/getSurah';
import Link from 'next/link';


export default async function HomePage() {
  const surahs = await getAllSurah();

  return (
    <div className="min-h-screen bg-gray-50 py-10 rounded-xl">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">Al-Quran</h1>
          <p className="text-gray-600">List of all Surahs and their translations</p>
        </div>

        {/* Surah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {surahs.map((surah) => (
            <Link 
              key={surah.id} 
              href={`/surah/${surah.id}`}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-emerald-500 hover:shadow-md transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {/* surah no */}
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 rounded-xl text-emerald-700 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  {surah.id}
                </div>
                
                {/* Name and Translation */}
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{surah.transliteration}</h2>
                  <p className="text-sm text-gray-500">
                    {surah.translation} • {surah.total_verses} Verses
                  </p>
                </div>
              </div>

              {/* Arabic Name */}
              <div className="text-right">
                <span className="text-2xl font-serif text-emerald-600 font-semibold tracking-wide">
                  {surah.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}