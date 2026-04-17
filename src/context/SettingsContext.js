"use client";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // useState-এর ভেতরেই সরাসরি localStorage চেক করা (এটি শুধু প্রথম রেন্ডারে চলে)
  const [arabicFont, setArabicFont] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("arabicFont") || "font-amiri";
    }
    return "font-amiri";
  });

  const [arabicSize, setArabicSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arabicSize");
      return saved ? Number(saved) : 24;
    }
    return 24;
  });

  const [translationSize, setTranslationSize] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("translationSize");
      return saved ? Number(saved) : 16;
    }
    return 16;
  });

  // সেটিংস আপডেট এবং সেভ করার ফাংশন
  const updateSettings = (key, value) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
    
    // স্টেট আপডেট করা
    if (key === "arabicFont") setArabicFont(value);
    if (key === "arabicSize") setArabicSize(value);
    if (key === "translationSize") setTranslationSize(value);
  };

  return (
    <SettingsContext.Provider value={{ arabicFont, arabicSize, translationSize, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);