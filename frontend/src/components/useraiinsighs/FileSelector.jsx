import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

const FileSelector = ({
  files,
  localFile,
  selectedFileId,
  setSelectedFileId,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      custom={0}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="mb-4 animate-fade-in-up"
    >
      <label className="block text-blue-800 mb-2">{t("aiInsights.fileSelector.label")}</label>
      <select
        className="w-full p-2 rounded border border-blue-300 bg-white"
        value={selectedFileId}
        onChange={(e) => setSelectedFileId(e.target.value)}
      >
        <option value="">{t("aiInsights.fileSelector.chooseOption")}</option>
        {localFile?.fileName && (
          <option value="local">{t("aiInsights.fileSelector.local")} {localFile.fileName}</option>
        )}
        {files.map((f) => (
          <option key={f._id} value={f._id}>
            {f.fileName}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default FileSelector;
