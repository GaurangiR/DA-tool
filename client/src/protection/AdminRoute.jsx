import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) return null; // Wait until session rehydrates
  return user.role === "admin" ? children : <Navigate to="/dashboard" replace />;
}

export default AdminRoute;
