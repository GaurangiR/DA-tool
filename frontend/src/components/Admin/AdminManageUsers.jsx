import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchFilterBar from "../adminmanageusers/SearchFilterBar";
import UsersTable from "../adminmanageusers/UsersTable";
import PaginationControls from "../adminmanageusers/PaginationControls";
import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import { useConfirm } from "../../context/ConfirmContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formState, setFormState] = useState({});
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const filesPerPage = 5;
  const { confirm } = useConfirm();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setUsers(res.data);
    } catch (err) {
      if (err.response?.status === 403) navigate("/");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEdit = (u) => {
    setEditingId(u._id);
    setFormState({ name: u.name, email: u.email, role: u.role, password: "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormState({});
  };

  const saveEdit = async (id) => {
    try {
      const body = { ...formState };
      if (!body.password) delete body.password;
      const res = await axios.put(`${BASE_URL}/api/admin/users/${id}`, body, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setUsers((us) =>
        us.map((u) => (u._id === id ? { ...u, ...res.data } : u))
      );
      cancelEdit();
    } catch {
      alert("Failed to save changes");
    }
  };

  const deleteUser = async (id) => {
    const shouldDelete = await confirm("Delete this user?");
    if (!shouldDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      setUsers((us) => us.filter((u) => u._id !== id));
    } catch {
      alert("Failed to delete");
    }
  };

  const handleChange = (e) =>
    setFormState({ ...formState, [e.target.name]: e.target.value });

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / filesPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * filesPerPage,
    page * filesPerPage
  );

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("");
    setPage(1);
  };

  return (
    <motion.div
      custom={0}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="p-6"
    >
      <motion.h1
        custom={0.2}
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-2xl font-semibold mb-4"
      >
        Manage Users
      </motion.h1>
      <SearchFilterBar
        {...{ search, setSearch, roleFilter, setRoleFilter, resetFilters }}
      />
      <UsersTable
        users={paginatedUsers}
        editingId={editingId}
        formState={formState}
        handleChange={handleChange}
        startEdit={startEdit}
        cancelEdit={cancelEdit}
        saveEdit={saveEdit}
        deleteUser={deleteUser}
      />
      <PaginationControls {...{ page, setPage, totalPages }} />
    </motion.div>
  );
}
