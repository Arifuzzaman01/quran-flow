"use client";
import { useSettings } from "@/context/SettingsContext";
import { useState, useEffect } from "react";

export default function SurahView({ surah }) {
  const { arabicFont, arabicSize, translationSize } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // --- Scroll to Verse Logic ---
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.replace("#", "");
      
      // ডাটা লোড হওয়ার জন্য কিছুটা সময় দেওয়া (Timeout)
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // সার্চ করে আসলে সেই আয়াতটি হালকা হাইলাইট হবে
          element.style.transition = "background-color 1s ease";
          element.style.backgroundColor = "#ecfdf5"; // emerald-50
          
          setTimeout(() => {
            element.style.backgroundColor = "white";
          }, 3000);
        }
      }, 700); // হাইড্রেশন এবং রেন্ডারিং শেষ হতে ৭০০ms সময় দেওয়া সেফ

      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) {
    return <div className="space-y-6 opacity-0">Loading verses...</div>;
  }

  return (
    <div className="space-y-6">
      {surah.verses.map((verse) => (
        <div
          key={verse.id}
          id={`verse-${verse.id}`} // এই ID-টিই সার্চবারের হাশের সাথে মিলবে
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-700"
        >
          <div className="flex justify-between items-start gap-4">
            <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm shrink-0">
              {verse?.id}
            </span>
            <p
              className={`text-right leading-loose ${arabicFont}`}
              style={{ fontSize: `${arabicSize}px` }}
            >
              {verse?.text}
            </p>
          </div>
          <p
            className="mt-4 text-gray-700 border-t pt-4"
            style={{ fontSize: `${translationSize}px` }}
          >
            {verse?.translation}
          </p>
        </div>
      ))}
    </div>
  );
}