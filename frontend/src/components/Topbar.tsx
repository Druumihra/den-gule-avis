import "./topbar.css";
import { Link } from "react-router-dom";

interface Props {
    username?: string;
}

function Topbar(props: Props) {
    return (
        <div className="Topbar">
            <img id="logo" src="/favicon.ico"></img>
            <Link className="link" to="/">
                Den Scuffed Avis
            </Link>
            {!props.username ? (
                <Link className="link" to="/login">
                    Sign in
                </Link>
            ) : (
                <h3 className="user-logged-in">
                    Logged in as {props.username}
                </h3>
            )}
        </div>
    );
}

export default Topbar;
