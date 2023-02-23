import "./topbar.css";
import { Link, BrowserRouter } from "react-router-dom";
import Router from "./Router";

function Topbar() {
    return (
        <BrowserRouter>
            <div className="Topbar">
                <Link className="link" to="/">
                    Den Scuffed Avis
                </Link>
                <Link className="link" to="/login">
                    Sign in
                </Link>
            </div>
            <Router />
        </BrowserRouter>
    );
}

export default Topbar;
