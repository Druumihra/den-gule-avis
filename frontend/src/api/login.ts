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
    });
    const body = await res.json();
    if (body.message === "Success") {
        return "Du er nu logget ind";
    } else {
        return body.message;
    }
}
