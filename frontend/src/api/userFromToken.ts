import { authApiUrl } from "./url";

export interface UserFromTokenResponse {
    username: string;
    id: number;
}

export async function userInfo(): Promise<UserFromTokenResponse | null> {
    const tokenArr = document.cookie.match(/token=([^;]+)/)!;
    if (!tokenArr) return null;
    const token = tokenArr[1];
    const res = await fetch(authApiUrl(`tokenToUser/${token}`));
    if (res.status !== 200) return null;

    const body = await res.json();
    return body.user;
}
