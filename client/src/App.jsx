import React from "react";
import UploadSection from "./components/UploadSection";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e8f0ff] via-[#f8fbff] to-[#e1ebff] text-gray-800">
      {/* Animated Company Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-[#1e3a8a] mb-2"
      >
        Flookup Capital Advisors
      </motion.h1>

      <p className="text-gray-600 mb-10 text-sm md:text-base text-center max-w-md">
        Intelligent XML Error Correction & Validation Tool
      </p>

      <UploadSection />

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Flookup Capital Advisors. All rights reserved.
      </footer>
    </div>
  );
}
