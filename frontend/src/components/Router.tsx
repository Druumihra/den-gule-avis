import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import NoPage from "./NoPage";
import Products from "./Products";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
}
export default Router;
