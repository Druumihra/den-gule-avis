import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import "./auth.css";

function Login() {
    return (
        <>
            <Topbar />
            <div className="auth">
                <h1>Login</h1>
                <input type="text" placeholder="username" />
                <br />
                <input type="password" placeholder="password" />
                <br />
                <button type="submit">Sign in</button>
                <p>
                    Don't have an account?{" "}
                    <span className="account-msg">
                        <Link to="/register">Sign up</Link>
                    </span>{" "}
                    here
                </p>
            </div>
        </>
    );
}

export default Login;
