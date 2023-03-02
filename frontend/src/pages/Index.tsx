import { useLoaderData } from "react-router-dom";
import { Product as ProductInterface } from "../api/Product";

import Product from "../components/Product";
import Topbar from "../components/Topbar";
import "./index.css";

function Index() {
    const { products } = useLoaderData() as { products: ProductInterface[] };
    const { isLoggedIn } = useLoaderData() as { isLoggedIn: boolean };

    return (
        <>
            <Topbar loggedIn={isLoggedIn} />
            <main className="cropped">
                {products.map((product) => (
                    <Product {...product} key={`product-${product.id}`} />
                ))}
            </main>
        </>
    );
}

export default Index;
