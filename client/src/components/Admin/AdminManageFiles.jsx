import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useConfirm } from "../../context/ConfirmContext";

import SearchFilters from "../adminmanagefiles/SearchFilters";
import FileTable from "../adminmanagefiles/FileTable";
import FileModal from "../adminmanagefiles/FileModal";
import Pagination from "../adminmanagefiles/Pagination";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminManageFiles() {
  const [files, setFiles] = useState([]);
  const [modalFile, setModalFile] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const filesPerPage = 5;
  const { confirm } = useConfirm();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/admin/files`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then(({ data }) => setFiles(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load files");
      });
  }, []);

  const viewFile = async (id) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/admin/files/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setModalFile(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load file");
    }
  };

  const deleteFile = async (id) => {
    const shouldDelete = await confirm("Delete this file?");
    if (!shouldDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/admin/files/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setFiles((f) => f.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      // Optionally use a custom alert here too
      alert("Delete failed");
    }
  };

  const downloadFile = async (id, fileName) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/files/download/${id}`, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  const filtered = files.filter((f) => {
    const matchSearch =
      f.fileName.toLowerCase().includes(search.toLowerCase()) ||
      f.user?.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? f.user?.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  const paginated = filtered.slice(
    (page - 1) * filesPerPage,
    page * filesPerPage
  );

  return (
    <div className="p-6">
      <motion.h1
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-2xl font-semibold mb-4"
      >
        Manage Files
      </motion.h1>
      <SearchFilters
        search={search}
        setSearch={setSearch}
        resetFilters={() => {
          setSearch("");
          setRoleFilter("");
          setPage(1);
        }}
      />
      <div className="shadow-lg rounded-lg overflow-hidden">
        <FileTable
          files={paginated}
          viewFile={viewFile}
          deleteFile={deleteFile}
          downloadFile={downloadFile}
        />
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={Math.ceil(filtered.length / filesPerPage)}
      />
      <AnimatePresence>
        <FileModal modalFile={modalFile} onClose={() => setModalFile(null)} />
      </AnimatePresence>
    </div>
  );
}
