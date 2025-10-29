import React from "react";
import UploadSection from "./components/UploadSection";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
          Flookup Capital Advisors
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          XML Cleaner Tool – Upload your XML folder and get clean, validated files
        </p>
      </motion.div>

      <UploadSection />

      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} Flookup Capital Advisors. All rights reserved.
      </footer>
    </div>
  );
}
