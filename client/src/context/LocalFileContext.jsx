import { createContext, useState, useContext, useEffect } from "react";
import CryptoJS from "crypto-js";

const LocalFileContext = createContext();
const SECRET = "sheetSenseSecretKey";

export const LocalFileProvider = ({ children }) => {
  const [localFile, setLocalFile] = useState(null);

  useEffect(() => {
  const encrypted = sessionStorage.getItem("localFile");
  if (encrypted) {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setLocalFile(decrypted);
  }
}, []);

useEffect(() => {
  if (localFile) {
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(localFile),
      SECRET
    ).toString();
    sessionStorage.setItem("localFile", encrypted);
  } else {
    sessionStorage.removeItem("localFile");
  }
}, [localFile]);
  return (
    <LocalFileContext.Provider value={{ localFile, setLocalFile }}>
      {children}
    </LocalFileContext.Provider>
  );
};

export const useLocalFile = () => useContext(LocalFileContext);
