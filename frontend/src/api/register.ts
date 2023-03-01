import { authApiUrl } from "./url";
import { User } from "./User";
import { redirect } from "react-router-dom";

export async function register(user: User) {
    if (!user.username || !user.password) {
        return "Invalid username or password";
    }

    const res = await fetch(authApiUrl("register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const body = await res.json();
    if (body.message === "Success") {
        return redirect("/login");
    } else {
        return body.message;
    }
}
