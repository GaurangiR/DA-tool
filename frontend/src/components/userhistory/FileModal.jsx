import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

const FileModal = ({ content, onClose }) => (
  <div className="fixed inset-0 backdrop-blur-3xl flex justify-center items-center z-50">
    <motion.div
      custom={0.4}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="bg-white p-6 rounded shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-blue-700">File Content</h3>
        <button onClick={onClose} className="text-red-500 font-bold">
          ✖
        </button>
      </div>
      <pre className="text-sm whitespace-pre-wrap text-gray-700">
        {JSON.stringify(content, null, 2)}
      </pre>
    </motion.div>
  </div>
);

export default FileModal;
