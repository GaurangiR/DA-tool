import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";

const InsightList = ({ insights, onCopy }) => (
  <div className="mt-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 animate-fade-in-up">
    {insights.map((insight, i) => (
      <motion.div
        key={i}
        className="p-4 bg-white rounded shadow transition duration-300"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-blue-800">{insight.type}</h3>
          <button onClick={() => onCopy(`${insight.type}: ${insight.text}`)} className="text-blue-500 hover:text-blue-700">
            <FiCopy className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-700">{insight.text}</p>
      </motion.div>
    ))}
  </div>
);

export default InsightList;
