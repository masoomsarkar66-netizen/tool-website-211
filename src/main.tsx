
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function loadGoogleAnalytics() {
  if (document.getElementById("google-analytics")) return;

  const script = document.createElement("script");
  script.id = "google-analytics";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-Z5ZBWHY1DW";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }

  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", "G-Z5ZBWHY1DW");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

window.addEventListener("load", () => {
  window.setTimeout(loadGoogleAnalytics, 3000);
});

