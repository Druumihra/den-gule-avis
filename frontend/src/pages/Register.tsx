import { useFetcher, Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import "./auth.css";

function Register() {
    const fetcher = useFetcher();
    const Form = fetcher.Form;

    return (
        <>
            <Topbar />
            <div className="auth">
                <h1>Register</h1>
                <p className="error-msg">{fetcher.data}</p>
                <Form method="post" action={`/register`}>
                    <input name="username" type="text" placeholder="username" />
                    <br />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <br />
                    <button type="submit">Sign up</button>
                </Form>
                <p>
                    Already have an account?{" "}
                    <span className="account-msg">
                        <Link to="/login">Sign in</Link>
                    </span>{" "}
                    here
                </p>
            </div>
        </>
    );
}

export default Register;
