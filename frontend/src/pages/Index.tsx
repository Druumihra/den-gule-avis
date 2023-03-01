import { useLoaderData } from "react-router-dom";
import { Product as ProductInterface } from "../api/Product";
import { UserFromTokenResponse as User } from "../api/userFromToken";

import Product from "../components/Product";
import Topbar from "../components/Topbar";
import "./index.css";

function Index() {
    const { products } = useLoaderData() as { products: ProductInterface[] };
    const { user } = useLoaderData() as { user: User };
    console.log(user);

    return (
        <>
            <Topbar username={user ? user.username : ""} />
            <main className="cropped">
                {products.map((product) => (
                    <Product {...product} key={`product-${product.id}`} />
                ))}
            </main>
        </>
    );
}

export default Index;
