import { Form, Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import "./auth.css";

function Register() {
    return (
        <>
            <Topbar />
            <div className="auth">
                <h1>Register</h1>
                <p className="error-msg" id="register-error-msg"></p>
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
