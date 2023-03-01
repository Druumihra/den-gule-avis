import { apiUrl } from "./url";

export default async function addComment(postId: string, text: string): Promise<boolean> {
    const response = await fetch(apiUrl(`products/${postId}/comments`), {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            text,
            token: document.cookie.match("token=([^;]+)")![1],
        }),
    })

    return response.status === 201;
}
