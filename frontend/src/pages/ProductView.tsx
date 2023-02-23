import CommentField from "../components/CommentField";
import Topbar from "../components/Topbar";

interface Product {
    title: string,
    image: string,
    description: string,
}

function ProductView() {
    const product: Product = {
        title: "lækker suger klar på sjov",
        image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.SXRY_iHx7osacNRG5OaoQwHaGj%26pid%3DApi&f=1&ipt=604696780da861d33ea4f4e97f0d698b4db02009d82703c3970c533a6c456b5a&ipo=images",
        description: "lorem ipsum dolor sit amet",
    };

    const comment = {
        user: "simon jakobsen from",
        text: "lorem ipsum dolor sit amet",
    };

    const comments = [comment, comment, comment];

    return (
        <>
            <Topbar />
            <main className="cropped">
                <h1>{product.title}</h1>
                <div className="product-view-grid">
                    <img className="product-view-image" src={product.image} />
                    <p>{product.description}</p>
                </div>
                <CommentField comments={comments} />
            </main>
        </>
    );
}

export default ProductView;
