import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function UploadSection() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) return alert("Please select a folder with XML files!");

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
      alert("Error while uploading. Please check backend connection.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-8 rounded-2xl shadow-xl w-[90%] md:w-[500px] text-center"
    >
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Upload XML Folder</h2>
      <input
        type="file"
        webkitdirectory="true"
        directory=""
        multiple
        accept=".xml"
        onChange={handleFileChange}
        className="border-2 border-dashed border-blue-400 w-full p-4 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
      />
      {selectedFiles.length > 0 && (
        <p className="mt-3 text-sm text-gray-500">
          {selectedFiles.length} files selected
        </p>
      )}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-6 px-6 py-3 rounded-xl text-white font-medium transition ${
          loading
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Upload & Clean"}
      </button>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: loading ? "100%" : "0%" }}
        transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
        className="h-1 bg-blue-500 mt-4 rounded-full"
      />
    </motion.div>
  );
}
