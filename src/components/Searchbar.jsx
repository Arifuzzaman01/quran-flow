"use client";
import { SearchIcon, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Searchbar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const desktopInputRef = useRef(null);

  // ক্লিক আউটসাইড হলে ইনপুট বন্ধ করার জন্য
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopInputRef.current && !desktopInputRef.current.contains(event.target)) {
        setIsDesktopSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* --- Desktop View --- */}
      <div 
        className="hidden md:flex items-center relative h-10"
        onMouseEnter={() => setIsDesktopSearchOpen(true)}
        ref={desktopInputRef}
      >
        <div className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out bg-gray-100 rounded-lg ${
          isDesktopSearchOpen ? "w-64 px-2 mr-2" : "w-0"
        }`}>
          <input
            type="text"
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

        {/* Shutter Down Search Input */}
        <div className={`absolute top-full -right-6 sm:-right-20 w-screen bg-white border-b shadow-md transition-all duration-300 ease-in-out z-[40] ${
          isMobileSearchOpen ? "max-h-20 py-3 translate-y-0" : "max-h-0 py-0 -translate-y-2 opacity-0 overflow-hidden"
        }`}
        
        >
          <div className="container mx-auto px-4">
            <div className="relative flex items-center bg-gray-100 rounded-full px-4">
              <SearchIcon size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent p-2 text-sm outline-none"
                autoFocus={isMobileSearchOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;