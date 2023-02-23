import { Product } from "./Product";

export default async function oneProduct(id: string): Promise<Product> {
    const response = await fetch(`http://localhost:8081/product/${id}`);
    if (response.status !== 200) {
        return {
            id,
            title: "En fejl opstod.",
            image: "",
            description: "",
            comments: [],
        }
    }
    const product = await response.json() as Product;

    return product;
}
