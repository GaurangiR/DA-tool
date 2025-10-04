// /src/layouts/AdminLayout.jsx

import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { motion } from "framer-motion";
import Sidebar from "../components/Admin/Sidebar";
import Topbar from "../components/Admin/Topbar";

function AdminLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] flex transition-all duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Sidebar />

      <div className="flex-1 p-8">
        <Topbar user={user} handleLogout={handleLogout} />

        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[300px] outfit">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
}

export default AdminLayout;
