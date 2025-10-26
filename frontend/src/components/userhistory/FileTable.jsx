import React from "react";
import FileRow from "./FileRow";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useTranslation } from "react-i18next";

const FileTable = ({ files, onView, onDownload, onDelete }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      custom={0.1}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="overflow-x-auto"
    >
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden animate-fade-in-up">
        <thead>
          <tr className="bg-blue-100 text-blue-800 text-left">
            <th className="p-4">{t("history.table.filename", "📄 Filename")}</th>
            <th className="p-4">{t("history.table.uploadDate", "🗓 Upload Date")}</th>
            <th className="p-4">
              {t("history.table.viewDownload", "🔍 View / ⬇️ Download")}
            </th>
            <th className="p-4">{t("history.table.delete", "❌ Delete")}</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file, index) => (
              <FileRow
                key={file._id}
                file={file}
                index={index}
                onView={() => onView(file._id)}
                onDownload={() => onDownload(file._id, file.fileName)}
                onDelete={() => onDelete(file._id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                {t("table.noFiles", "No files uploaded yet.")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
};

export default FileTable;
