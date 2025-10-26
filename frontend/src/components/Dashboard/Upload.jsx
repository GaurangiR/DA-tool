import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import { useLocalFile } from "../../context/LocalFileContext";
import FileInput from "../userupload/FileInput";
import SelectedFileDisplay from "../userupload/SelectedFileDisplay";
import MessageDisplay from "../userupload/MessageDisplay";
import UploadButtons from "../userupload/UploadButtons";
import LoaderOverlay from "../userupload/LoaderOverlay";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Upload() {
  const { t, i18n } = useTranslation();

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setLocalFile } = useLocalFile();
  const [languageKey, setLanguageKey] = useState(0);

  useEffect(() => {
    setLanguageKey((prev) => prev + 1);
  }, [i18n.language]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleRemoveFile = () => {
    setFile(null);
    setMessage("");
    document.getElementById("upload-input").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage(t("upload.pleaseSelectFile"));

    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        const headers = Object.keys(jsonData[0] || {});
        const filePayload = {
          fileName: file.name,
          headers,
          data: jsonData,
        };

        setLocalFile(filePayload);
        setMessage(t("upload.fileLoadedLocally"));
      } catch (err) {
        console.error("Parsing error:", err);
        setMessage(t("upload.failedToParseFile"));
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => {
      setLoading(false);
      setMessage(t("upload.failedToReadFile"));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUploadToServer = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/files/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      alert(t("upload.uploadSuccess"));
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert(t("upload.uploadFailed"));
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={languageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="px-4 sm:px-6 md:px-8 py-10 min-h-screen bg-gradient-to-br from-[#dff1fd] to-[#b3dcf3] flex justify-center items-center"
      >
        <AnimatePresence>{loading && <LoaderOverlay />}</AnimatePresence>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="bg-white/70 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <motion.h2
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-xl sm:text-2xl font-bold text-center text-[#007ea7] mb-2 outfit"
          >
            {t("upload.title")}
          </motion.h2>

          <motion.p
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center text-xs sm:text-sm text-blue-900 mb-6"
          >
            {t("upload.supportedFormats")}
          </motion.p>

          <FileInput
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            onChange={handleFileChange}
          />

          {file && (
            <SelectedFileDisplay
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              fileName={file.name}
              onRemove={handleRemoveFile}
            />
          )}

          <motion.button
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            type="submit"
            className="w-full bg-[#00ACC1] text-white py-2 rounded-xl shadow-md hover:bg-[#0097a7] transition duration-200"
          >
            {t("upload.uploadButton")}
          </motion.button>

          <MessageDisplay
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            message={message}
          />

          {message.startsWith("✅") && (
            <UploadButtons
              custom={0.6}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              onAnalyze={() => navigate("/dashboard/analyze")}
              onUpload={handleUploadToServer}
            />
          )}
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}

export default Upload;
