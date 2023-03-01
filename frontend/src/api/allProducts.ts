import { Product } from "./Product";
import { apiUrl } from "./url";

export default async function allProduct(): Promise<Product[] | null> {
    const response = await fetch(apiUrl("products"));
    if (response.status !== 200) {
        return null;
    }
    const products = (await response.json()) as Product[];
    return products;
}
