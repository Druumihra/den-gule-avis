interface CreateProductRequest { title: string, image: string, description: string };

export default async function createProduct({ title, image, description }: CreateProductRequest): Promise<boolean> {
    const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify({ title, image, description }),
    });

    return res.status === 204;
}
