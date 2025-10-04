import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FileRow = ({ file, index, onView, onDownload, onDelete }) => {
  const { t } = useTranslation();

  return (
    <motion.tr
      className="border-t hover:bg-blue-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <td className="p-4">{file.fileName}</td>
      <td className="p-4">{new Date(file.createdAt).toLocaleString()}</td>
      <td className="p-4">
        <button className="text-blue-600 hover:underline mr-4" onClick={onView}>
          {t("history.buttons.view")}
        </button>
        <button className="text-green-600 hover:underline" onClick={onDownload}>
          {t("history.buttons.download")}
        </button>
      </td>
      <td className="p-4">
        <button className="text-red-600 hover:underline" onClick={onDelete}>
          {t("history.buttons.delete")}
        </button>
      </td>
    </motion.tr>
  );
};

export default FileRow;
