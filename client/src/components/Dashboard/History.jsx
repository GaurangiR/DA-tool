import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FileTable from '../userhistory/FileTable';
import FileModal from '../userhistory/FileModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const History = () => {
  const { t, i18n } = useTranslation();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFileContent, setSelectedFileContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/files/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (error) {
        console.error('Error fetching files', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [token]);

  useEffect(() => {
    setVisible(false);
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 300); // Adjust duration as needed
    return () => clearTimeout(timeout);
  }, [i18n.language]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/files/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles((prev) => prev.filter((file) => file._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/files/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedFileContent(res.data);
      setShowModal(true);
    } catch (err) {
      console.error('View failed', err);
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/files/${id}/download`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  if (loading) return <p className="text-center">{t('loading')}</p>;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={i18n.language}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-8 bg-[#f0f8ff] min-h-screen"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-blue-800 mb-6"
          >
            📁 {t('history.uploadedFiles')}
          </motion.h2>

          <FileTable
            files={files}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />

          {showModal && (
            <FileModal
              content={selectedFileContent}
              onClose={() => setShowModal(false)}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default History;
