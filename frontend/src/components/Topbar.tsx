import "./topbar.css";
import { Link } from "react-router-dom";

interface Props {
    loggedIn?: boolean;
}

function Topbar(props: Props) {
    return (
        <div className="Topbar">
            <img id="logo" src="/favicon.ico"></img>
            <Link className="link" to="/">
                Den Scuffed Avis
            </Link>
            {!props.loggedIn ? (
                <Link className="link" to="/login">
                    Sign in
                </Link>
            ) : (
                <button id="log-out" className="link">
                    Log out
                </button>
            )}
        </div>
    );
}

export default Topbar;
