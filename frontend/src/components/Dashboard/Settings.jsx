import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SettingsForm from "../usersettings/SettingsForm";
import { useTranslation } from "react-i18next";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const Settings = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const handleLangChange = () => {
      setCurrentLang(i18n.language);
      setFadeKey((prev) => prev + 1); // trigger re-animation
    };

    i18n.on("languageChanged", handleLangChange);
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2ff] to-[#cce7ff] flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={fadeKey}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pageVariants}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl"
        >
          <SettingsForm />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Settings;
