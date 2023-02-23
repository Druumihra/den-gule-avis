import { Product } from "../api/Product";
import CommentField from "../components/CommentField";
import Topbar from "../components/Topbar";
import { useLoaderData } from "react-router-dom";


function ProductView() {
    const product = useLoaderData() as Product;

    return (
        <>
            <Topbar />
            <main className="cropped">
                <h1>{product.title}</h1>
                <div className="product-view-grid">
                    <img className="product-view-image" src={product.image} />
                    <p>{product.description}</p>
                </div>
                <CommentField comments={product.comments} />
            </main>
        </>
    );
}

export default ProductView;
