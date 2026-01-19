import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./styles/globals.css";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import { LoadingProvider } from "./context/LoadingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <GlobalLoader />
          <App />
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>  
  </React.StrictMode>
);