import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FileContext = createContext();
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const FileProvider = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState("");
  const [fileData, setFileData] = useState(null);

  // Fetch all files
  useEffect(() => {
    if (!token) return;
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/files`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (err) {
        console.error("Failed to fetch files", err);
      }
    };
    fetchFiles();
  }, [token]);

  // Fetch data for selected file
  useEffect(() => {
    if (!selectedFileId) {
      setFileData(null);
      return;
    }
    else if (selectedFileId === "local") {
      selectedFileId === "local";
      return;
    }
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/files/${selectedFileId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFileData(res.data);
      } catch (err) {
        console.error("Failed to fetch file data", err);
      }
    };
    fetchData();
  }, [selectedFileId, token]);

  const fetchFiles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/files`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFiles(res.data);
  } catch (err) {
    console.error("Failed to fetch files", err);
  }
};

useEffect(() => {
  if (token) fetchFiles();
}, [token]);

  return (
    <FileContext.Provider
      value={{ files, selectedFileId, setSelectedFileId, fileData, setFileData, fetchFiles, }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFilesContext = () => useContext(FileContext);
