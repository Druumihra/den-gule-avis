import "./topbar.css";
import { Link, BrowserRouter } from "react-router-dom";

function Topbar() {
    return (
        <div className="Topbar">
            <img id="logo" src="/favicon.ico"></img>
            <Link className="link" to="/">
                Den Scuffed Avis
            </Link>
            <Link className="link" to="/login">
                Sign in
            </Link>
        </div>
    );
}

export default Topbar;
