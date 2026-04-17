"use client";
import { useSettings } from "@/context/SettingsContext";
import { useState, useEffect } from "react";

export default function SurahView({ surah }) {
  const { arabicFont, arabicSize, translationSize } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="space-y-6 opacity-0">Loading verses...</div>;
  }
console.log(arabicFont);
  return (
    <div className="space-y-6">
      {surah.verses.map((verse) => (
        <div
          key={verse.id}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-start gap-4">
            <span className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
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
