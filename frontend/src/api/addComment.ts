export default async function addComment(postId: string, text: string): Promise<boolean> {
    const response = await fetch(`http://localhost:8081/products/${postId}/comments`, {
        method: "POST",
        body: text,
    })

    return response.status === 201;
}
