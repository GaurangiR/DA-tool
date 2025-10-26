import { motion } from "framer-motion";
import { FaFileExcel, FaChartBar, FaRobot, FaHistory } from "react-icons/fa";

const features = [
  { icon: <FaFileExcel size={30} />, text: "Upload Excel files" },
  { icon: <FaChartBar size={30} />, text: "Generate 2D/3D charts" },
  { icon: <FaRobot size={30} />, text: "AI-powered insights" },
  { icon: <FaHistory size={30} />, text: "See upload history" },
];

function Features() {
  const repeatedFeatures = [...features, ...features];

  return (
    <div className="py-12 px-6 md:px-20 overflow-hidden">
      {/* Slide in title */}
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-[#2E3C43] inter"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Features
      </motion.h2>

      {/* Slide in feature list */}
      <motion.div
        className="relative w-full overflow-hidden inter"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex w-max space-x-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        >
          {repeatedFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md"
            >
              <div className="text-[#00ACC1] mb-4">{feature.icon}</div>
              <p className="text-lg font-medium text-[#546E7A]">{feature.text}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Features;
