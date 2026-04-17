import Link from 'next/link';
import { BookOpen, Search, SearchIcon, Settings } from 'lucide-react'; 
import Setting from './Setting';
import Searchbar from './Searchbar';

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
           <Searchbar />
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 h-full">
            <Setting />
            
            {/* Mobile Menu Button (Placeholder for functionality) */}
            <div className="md:hidden p-2 text-gray-600">
              <Searchbar />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;