import { motion } from "framer-motion";
import Loader from "../Loader";

function LoaderOverlay() {
  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loader />
    </motion.div>
  );
}

export default LoaderOverlay;
