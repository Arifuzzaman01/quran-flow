"use client";
import { useSettings } from "@/context/SettingsContext";
import { useEffect, useState } from "react";

export default function SettingsSidebar() {
  const { arabicFont, arabicSize, translationSize, updateSettings } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) return null;

  return (
    <div className="p-4 bg-white shadow-lg h-full ">
      <h2 className="text-xl font-bold mb-6">Setting Panel</h2>

      {/* Font Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Arabic Font</label>
        <select 
          value={arabicFont}
          onChange={(e) => updateSettings("arabicFont", e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="font-amiri">Amiri (Classic)</option>
          <option value="font-scheherazade">Scheherazade (Modern)</option>
        </select>
      </div>

      {/* Font Size Sliders */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">আরবি ফন্ট সাইজ ({arabicSize}px)</label>
        <input 
          type="range" min="20" max="60" 
          value={arabicSize}
          onChange={(e) => updateSettings("arabicSize", Number(e.target.value))}
          className="w-full h-2 bg-emerald-200 rounded-lg cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">অনুবাদ ফন্ট সাইজ ({translationSize}px)</label>
        <input 
          type="range" min="14" max="30" 
          value={translationSize}
          onChange={(e) => updateSettings("translationSize", Number(e.target.value))}
          className="w-full h-2 bg-emerald-200 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );
}