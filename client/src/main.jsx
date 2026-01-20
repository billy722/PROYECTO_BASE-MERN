import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styles/globals.css";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import { LoadingProvider } from "./context/LoadingContext";
import { AlertProvider } from "./context/AlertContext";
import Alert from "./components/Alert/Alert";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <LoadingProvider>
        <BrowserRouter>
          <AuthProvider>
            <Alert />
            <GlobalLoader />
            <App />
          </AuthProvider>
        </BrowserRouter>
      </LoadingProvider>  
    </AlertProvider> 
  </React.StrictMode>
);