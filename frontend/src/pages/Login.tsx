import { Link, useFetcher } from "react-router-dom";
import Topbar from "../components/Topbar";
import "./auth.css";

function Login() {
    const fetcher = useFetcher();
    const Form = fetcher.Form;

    return (
        <>
            <Topbar />
            <div className="auth">
                <h1>Login</h1>
                <p className="error-msg">{fetcher.data}</p>
                <Form method="post" action={`/login`}>
                    <input name="username" type="text" placeholder="username" />
                    <br />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <br />
                    <button type="submit">Sign in</button>
                </Form>
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
