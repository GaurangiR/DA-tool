import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      custom={0.3}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="flex justify-center items-center gap-2 mt-4"
    >
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded-md border cursor-pointer ${
            page === i + 1
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </motion.div>
  );
}
