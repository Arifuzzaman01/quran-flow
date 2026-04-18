"use client";
import { Settings, X } from "lucide-react";
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";

const Setting = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-all"
      >
        <Settings className="h-5 w-5" />
      </button>

      <div
        className={`fixed inset-0 z-[9999] ${isOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`fixed inset-0 h-screen bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`fixed top-0 right-0 h-screen w-[280px] md:w-[350px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full hidden"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <h2 className="text-lg font-bold">Setting</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="h-[calc(100vh-65px)] overflow-y-auto bg-white">
            <SettingsSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
