import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { FileProvider } from "./context/FileContext";
import { LocalFileProvider } from "./context/LocalFileContext.jsx";
import { ConfirmProvider } from "./context/ConfirmContext";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <FileProvider>
        <LocalFileProvider>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </LocalFileProvider>
      </FileProvider>
    </Provider>
  </StrictMode>
);
