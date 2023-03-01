import { Product } from "../api/Product";
import { UserFromTokenResponse as User } from "../api/userFromToken";
import CommentField from "../components/CommentField";
import Topbar from "../components/Topbar";
import { useLoaderData } from "react-router-dom";

function ProductView() {
    const { product } = useLoaderData() as { product: Product };
    const { user } = useLoaderData() as { user: User };
    console.log(user);

    return (
        <>
            <Topbar username={user.username} />
            <main className="cropped">
                <h1>{product.title}</h1>
                <div className="product-view-grid">
                    <img className="product-view-image" src={product.image} />
                    <p>{product.description}</p>
                </div>
                <CommentField comments={product.comments} id={product.id} />
            </main>
        </>
    );
}

export default ProductView;
