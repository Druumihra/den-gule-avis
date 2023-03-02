import { authApiUrl } from "./url";
import { User } from "./User";

export async function login(user: User) {
    if (!user.username || !user.password) {
        return "Invalid username or password";
    }
    const res = await fetch(authApiUrl("login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
    });
    const body = await res.json();
    if (body.message === "Success") {
        window.location.href = "/";
    } else {
        return body.message;
    }
}
