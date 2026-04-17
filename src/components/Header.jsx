import Link from 'next/link';
import { BookOpen, Search, Settings } from 'lucide-react'; 

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-gray-300 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Quran<span className="text-emerald-600">Flow</span>
              </span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors"
            >
              Surah List
            </Link>
            <Link 
              href="/search" 
              className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-emerald-600 transition-colors"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-all"
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            
            {/* Mobile Menu Button (Placeholder for functionality) */}
            <button className="md:hidden p-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;