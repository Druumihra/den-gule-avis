import { authApiUrl } from "./url";
import { User } from "./User";

export async function register(user: User) {
    const errormsg = document.getElementById("register-error-msg")!;
    if (!user.username || !user.password) {
        errormsg.innerHTML = "Invalid username or password";
    }

    const res = await fetch(authApiUrl("register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const body = await res.json();
    if (body.message === "Success") {
        return;
    } else {
        errormsg.innerHTML = body.message;
    }
}
