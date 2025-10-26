import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const EmailInput = ({ email, setEmail, onSend }) => {
  const { t } = useTranslation();

  return (
    <motion.div className="mt-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center animate-fade-in-up">
      <motion.input
        type="email"
        placeholder={t("aiInsights.emailInput.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded w-full sm:w-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.button
        onClick={onSend}
        className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 transition"
      >
        {t("aiInsights.emailbuttons.sendEmail")}
      </motion.button>
    </motion.div>
  );
};

export default EmailInput;
