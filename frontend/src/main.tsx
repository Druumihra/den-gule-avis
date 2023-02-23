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
import allProducts from "./api/allProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
        loader: async () => {
            return allProducts();
        },
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "/product/:id",
        element: <ProductView />,
        loader: async ({ params }) => {
            return oneProduct(`${params.id}`);
        },
        action: async ({ request, params }) => {
            const formData = await request.formData();
            const text = formData.get("text") as string;

            addComment(`${params.id}`, text);

            return null;
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
