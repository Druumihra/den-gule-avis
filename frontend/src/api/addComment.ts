import { apiUrl } from "./url";

export default async function addComment(postId: string, text: string): Promise<boolean> {
    const response = await fetch(apiUrl(`products/${postId}/comments`), {
        method: "POST",
        body: text,
    })

    return response.status === 201;
}
