import { Product } from "./Product";

export default async function allProduct(): Promise<Product[] | null> {
    const response = await fetch("http://localhost:8081/products");
    if (response.status !== 200) {
        return null;
    }
    const products = await response.json() as Product[];
    return products;
}
