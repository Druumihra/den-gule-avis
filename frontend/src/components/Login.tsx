import "./login.css";

function Login() {
    return (
        <div className="Login">
            <h1>Login</h1>
            <input type="text" placeholder="username" />
            <br />
            <input type="password" placeholder="password" />
            <br />
            <input type="button" value="Sign in" />
        </div>
    );
}

export default Login;
