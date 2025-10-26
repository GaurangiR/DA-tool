import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetchCounts = (token) => {
  const [counts, setCounts] = useState({ users: 0, files: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, filesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/total-users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/admin/total-files`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setCounts({ users: usersRes.data.count, files: filesRes.data.count });
      } catch {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { counts, loading, error };
};

export default useFetchCounts;
