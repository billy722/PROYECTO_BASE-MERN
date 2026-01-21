import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";


import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import { LoadingProvider } from "./context/LoadingContext";
import { AlertProvider } from "./context/AlertContext";
import GlobalAlert from "./components/GlobalAlert/GlobalAlert";
import Modal from "./components/Modal/Modal";
import { ModalProvider } from "./context/ModalContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <ModalProvider>
        <AlertProvider>
          <LoadingProvider>
            <BrowserRouter>
              <ThemeProvider>
                <AuthProvider>
                  <Modal />
                  <GlobalAlert />
                  <GlobalLoader />
                  <App />
                </AuthProvider>
              </ThemeProvider>
            </BrowserRouter>
          </LoadingProvider>  
        </AlertProvider> 
      </ModalProvider>
  </React.StrictMode>
);