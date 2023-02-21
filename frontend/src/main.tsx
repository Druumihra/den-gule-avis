import React from "react";
import ReactDOM from "react-dom/client";
import Products from "./Products";
import "./index.css";
import Topbar from "./Topbar";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Topbar />
        <Products />
    </React.StrictMode>,
);
