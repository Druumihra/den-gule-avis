import Topbar from "../components/Topbar";
import "./login.css";

function Login() {
    return (
        <>
            <Topbar />
            <div className="Login">
                <h1>Login</h1>
                <input type="text" placeholder="username" />
                <br />
                <input type="password" placeholder="password" />
                <br />
                <input type="button" value="Sign in" />
            </div>
        </>
    );
}

export default Login;
