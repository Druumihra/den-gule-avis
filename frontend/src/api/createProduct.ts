interface CreateProductRequest { title: string, image: string, description: string };

export default async function createProduct({ title, image, description }: CreateProductRequest): Promise<boolean> {
    const res = await fetch("http://localhost:8081/products", {
        method: "POST",
        body: JSON.stringify({ title, image, description }),
        headers: { "Content-Type": "application/json" },
    });

    return res.status === 201;
}
