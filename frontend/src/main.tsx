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
import Register from "./pages/Register";
import { register } from "./api/register";
import { User } from "./api/User";
import CreateProductPage from "./pages/CreateProduct";
import createProduct from "./api/createProduct";
import { login } from "./api/login";

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
        action: async ({ request }) => {
            const formData = await request.formData();
            const user: User = {
                username: formData.get("username") as string,
                password: formData.get("password") as string,
            };
            return login(user);
        },
    },
    {
        path: "register",
        element: <Register />,
        action: async ({ request }) => {
            const formData = await request.formData();
            const user: User = {
                username: formData.get("username") as string,
                password: formData.get("password") as string,
            };
            return register(user);
        },
    },
    {
        path: "product/:id",
        element: <ProductView />,
        loader: async ({ params }) => {
            return oneProduct(`${params.id}`);
        },
        action: async ({ request, params }) => {
            const formData = await request.formData();
            const text = formData.get("text") as string;

            return addComment(`${params.id}`, text);
        },
    },
    {
        path: "create",
        element: <CreateProductPage />,
        action: async ({ request }) => {
            const body = Object.fromEntries(await request.formData());

            const { title, image, description } = body as {
                [k: string]: string;
            };

            return await createProduct({ title, image, description });
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
