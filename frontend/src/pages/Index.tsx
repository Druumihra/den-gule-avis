import { useLoaderData } from "react-router-dom";
import { Product as ProductInterface } from "../api/Product";
import Product from "../components/Product";
import Topbar from "../components/Topbar";
import "./index.css";

function Index() {
    const products = useLoaderData() as ProductInterface[];
    return (
        <>
            <Topbar />
            <main className="cropped">
                {products.map((product) =>
                    <Product {...product} />
                )}
            </main>
        </>
    );
}

export default Index;
