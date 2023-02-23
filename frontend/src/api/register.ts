import { User } from "./User";

export async function registerUser(user: User) {
    const errormsg = document.getElementById("register-error-msg")!;
    if (!user.username || !user.password) {
        errormsg.innerHTML = "Invalid username or password";
    }

    const res = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const body = await res.json();
    if (body.message === "success") {
        return;
    } else {
        errormsg.innerHTML = body.message;
    }
}
