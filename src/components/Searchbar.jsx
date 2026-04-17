"use client";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const Searchbar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const desktopInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopInputRef.current &&
        !desktopInputRef.current.contains(event.target)
      ) {
        setIsDesktopSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API Call
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 2) {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://quran-flow-server.vercel.app/api/search?q=${encodeURIComponent(searchTerm)}`,
          );
          const data = await res.json();
          setResults(data.results || []);
        } catch (err) {
          console.error("Search failed:", err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Input Change Handler
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      {/* --- Desktop View --- */}
      <div
        className="hidden md:flex items-center relative h-10"
        onMouseEnter={() => setIsDesktopSearchOpen(true)}
        ref={desktopInputRef}
      >
        <div
          className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out bg-gray-100 rounded-lg ${
            isDesktopSearchOpen
              ? "w-64 px-2 mr-2 border border-emerald-500"
              : "w-0 border-none"
          }`}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search surah or verse..."
            className="bg-transparent border-none outline-none text-sm w-full py-1.5"
            autoFocus={isDesktopSearchOpen}
          />
        </div>

        <button className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-emerald-600 transition-colors">
          <SearchIcon className="h-5 w-5" />
          {!isDesktopSearchOpen && <span>Search</span>}
        </button>
      </div>

      {/* --- Mobile View --- */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="p-1.5 text-gray-800"
        >
          {isMobileSearchOpen ? <X size={24} /> : <SearchIcon size={24} />}
        </button>

        <div
          className={`absolute top-12 right-0 w-[90vw] bg-white border-b border-gray-200 shadow-md transition-all duration-300 ease-in-out rounded-b-2xl z-[40] ${
            isMobileSearchOpen
              ? "max-h-20 py-3 translate-y-0 opacity-100"
              : "max-h-0 py-0 -translate-y-2 opacity-0 overflow-hidden"
          }`}
        >
          <div className="container mx-auto px-4">
            <div className="relative flex items-center bg-gray-100 rounded-full px-4">
              <SearchIcon size={18} className="text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full bg-transparent p-2 text-sm outline-none"
                autoFocus={isMobileSearchOpen}
              />
            </div>
          </div>
        </div>
      </div>
      {/* global backdrop */}
      {searchTerm.length > 2 && (results.length > 0 || isLoading) && (
        <div
          className="fixed inset-0 z-[998] bg-black/15 h-[100vh]"
          onClick={() => {
            setResults([]);
            setSearchTerm("");
            setIsMobileSearchOpen(false);
            setIsDesktopSearchOpen(false);
          }}
        />
      )}
      {/* Search Results Dropdown */}
      {searchTerm.length > 2 && (results.length > 0 || isLoading) && (
        <div className="absolute top-24 right-0 md:left-0 w-[90vw]   md:w-64 lg:w-80 bg-white shadow-2xl rounded-b-xl border border-gray-100 mt-2 z-[999] max-h-[400px] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              Finding...
            </div>
          ) : (
            results.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  router.push(`/surah/${item.surahId}#verse-${item.verseId}`);
                  setSearchTerm("");
                  setResults([]);
                  setIsMobileSearchOpen(false);
                }}
                className="p-4 hover:bg-emerald-50 cursor-pointer border-b last:border-none transition-colors"
              >
                <div className="flex justify-between items-start mb-1 gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {item.surahName} ({item.surahId}:{item.verseId})
                  </span>
                  <span className="text-sm font-arabic text-right leading-loose">
                    {item.text.length > 40
                      ? item.text.substring(0, 40) + "..."
                      : item.text}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                  {item.translation}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
