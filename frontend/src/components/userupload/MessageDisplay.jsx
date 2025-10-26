import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

function MessageDisplay({ messageKey }) {
  const { t } = useTranslation();

  if (!messageKey) return null;

  const isSuccess = messageKey.startsWith("upload.fileLoadedLocally") || messageKey.startsWith("upload.uploadSuccess");
  const message = t(messageKey);

  return (
    <motion.p
      custom={0.1}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className={`mt-6 text-center text-sm font-medium ${
        isSuccess ? "text-green-600" : "text-red-600"
      }`}
    >
      {message}
    </motion.p>
  );
}

export default MessageDisplay;
