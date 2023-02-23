import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Index from "./pages/Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductView from "./pages/ProductView";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import oneProduct from "./api/oneProduct";
import addComment from "./api/addComment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "/productView/:id",
        element: <ProductView />,
        loader: async ({ params }) => {
            return oneProduct(`${params.id}`);
        },
        action: async ({ request, params }) => {
            return addComment(`${params.id}`, await request.json());
        },
    },
    {
        path: "*",
        element: <NoPage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
