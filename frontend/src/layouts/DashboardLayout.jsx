import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Dashboard/Sidebar";
import Topbar from "../components/Dashboard/Topbar";

function DashboardLayout() {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] flex transition-all duration-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Sidebar />
      <div className="flex-1 p-8">
        <Topbar />
        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[300px] outfit">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardLayout;
