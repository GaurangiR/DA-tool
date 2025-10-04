import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg"
  >
    <div>
      <p className="text-gray-500">{label}</p>
      <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
    </div>
    <Icon className={`text-4xl ${color}`} />
  </motion.div>
);

export default StatCard;
