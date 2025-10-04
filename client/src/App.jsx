import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/authSlice";
import ProtectedRoute from "./protection/ProtectedRoute";
import AdminRoute from "./protection/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./layouts/AdminLayout";
import Upload from "./components/Dashboard/Upload";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./components/Dashboard/DashboardHome";
import AdminHome from "./components/Admin/AdminHome";
import Analyze from "./components/Dashboard/Analyze";
import History from "./components/Dashboard/History";
import AIInsights from "./components/Dashboard/AIInsights";
import Settings from "./components/Dashboard/Settings";
import AdminManageUsers from "./components/Admin/AdminManageUsers";
import AdminManageFiles from "./components/Admin/AdminManageFiles";
import AdminSettings from "./components/Admin/AdminSettings";
import ChatWithFile from "./components/Dashboard/ChatWithFile";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (token && user) {
      dispatch(setCredentials({ token, user: JSON.parse(user) }));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) return null; // Or show a spinner
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Normal User Dashboard with Nested Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="upload" element={<Upload />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="history" element={<History />} />
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chatwithfile" element={<ChatWithFile />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminManageUsers />} />
          <Route path="files" element={<AdminManageFiles />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
