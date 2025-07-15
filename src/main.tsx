import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import "@fontsource-variable/inter";
import Settings from "./routes/Settings";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HeroUIProvider>
      <ToastProvider />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              index
              element={<Home />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </React.StrictMode>
);
