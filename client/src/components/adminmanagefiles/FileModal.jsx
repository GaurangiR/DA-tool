import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function FileModal({ modalFile, onClose }) {
  if (!modalFile) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">{modalFile.fileName}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <FiX size={20} />
          </button>
        </div>
        <div className="p-4 max-h-[60vh] overflow-auto text-sm">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>{modalFile.headers.map((h) => <th key={h} className="p-1 border">{h}</th>)}</tr>
            </thead>
            <tbody>
              {modalFile.data.map((row, i) => (
                <tr key={i} className={i % 2 ? "bg-gray-50" : ""}>
                  {modalFile.headers.map((h) => <td key={h} className="p-1 border">{row[h]}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
