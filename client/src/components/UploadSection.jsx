import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function UploadSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewCount, setPreviewCount] = useState(0);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPreviewCount(files.length);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (!selectedFiles.length)
      return alert("Please select a folder containing XML files!");

    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        responseType: "blob",
        headers: { "Content-Type": "multipart/form-data" },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cleaned_xmls.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Upload failed! Please check backend connection.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/80 backdrop-blur-xl border border-blue-100 shadow-2xl rounded-3xl p-10 w-full max-w-md overflow-hidden"
    >
      {/* Soft light animation behind card */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-[#93c5fd]/40 to-[#6366f1]/30 blur-3xl -z-10"
        animate={{
          opacity: [0.6, 0.9, 0.6],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <label
        htmlFor="folderUpload"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-[#2563eb] bg-[#f0f6ff] hover:bg-[#e2ecff] transition rounded-2xl py-10"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#2563eb] mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-6-4v6m0 0l-2.5-2.5M12 18l2.5-2.5M12 10V4m0 0l2.5 2.5M12 4L9.5 6.5"
          />
        </motion.svg>
        <span className="text-[#1e3a8a] font-semibold text-lg">
          Choose XML Folder
        </span>
        <p className="text-gray-500 text-xs mt-1">
          Upload all XML files together
        </p>
      </label>

      <input
        id="folderUpload"
        type="file"
        webkitdirectory="true"
        directory=""
        multiple
        accept=".xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {previewCount > 0 && (
        <p className="mt-5 text-gray-700 text-sm">
          <strong>{previewCount}</strong> XML files selected ✅
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-[#1d4ed8] hover:bg-[#1e40af] active:scale-95"
        }`}
      >
        {loading ? "Processing..." : "Upload & Clean Files"}
      </button>

      {loading && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-[#3b82f6] to-[#6366f1] mt-4 rounded-full"
        />
      )}
    </motion.div>
  );
}
