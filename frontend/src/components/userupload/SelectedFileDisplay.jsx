import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

function SelectedFileDisplay({ fileName, onRemove }) {
  return (
    <motion.div
      custom={0.1}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="relative bg-white border rounded-lg p-3 mb-4 flex items-center justify-between shadow-sm"
    >
      <span className="text-sm text-[#2E3C43] truncate max-w-[85%]">
        {fileName}
      </span>
      <motion.button
        type="button"
        onClick={onRemove}
        className="absolute top-1/2 -translate-y-1/2 right-2 text-[#ff4d4d] text-lg font-bold"
        title="Remove file"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        ❌
      </motion.button>
    </motion.div>
  );
}

export default SelectedFileDisplay;
