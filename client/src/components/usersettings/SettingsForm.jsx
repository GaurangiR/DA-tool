import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import SettingsInput from "./SettingsInput";
import SettingsMessage from "./SettingsMessage";
import { fadeInUp } from "../animations/fadeInUp";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SettingsForm = () => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    const handleLanguageChange = () => {
      setFadeKey((prev) => prev + 1);
    };
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setFormData((prev) => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/api/auth/update`, formData, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setMessage(t("settings.updateSuccess"));
    } catch (err) {
      setMessage(
        err.response?.data?.message || t("settings.updateFail", "Update failed.")
      );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fadeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h2
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-2xl font-semibold mb-4 text-blue-700 text-center"
        >
          {t("settings.updateProfile")}
        </motion.h2>

        <SettingsMessage
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          message={message}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <SettingsInput
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("settings.namePlaceholder")}
          />
          <SettingsInput
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("settings.emailPlaceholder")}
            readOnly
          />
          <SettingsInput
            custom={0.6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={t("settings.passwordPlaceholder")}
          />
          <motion.button
            custom={0.8}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t("settings.updateButton")}
          </motion.button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsForm;
