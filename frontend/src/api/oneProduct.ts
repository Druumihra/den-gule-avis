import { Product } from "./Product";
import { apiUrl } from "./url";

export default async function oneProduct(id: string): Promise<Product> {
    const response = await fetch(apiUrl(`product/${id}`));
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
