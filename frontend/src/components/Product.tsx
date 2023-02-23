import { Link } from "react-router-dom";

interface Props {
    id: string,
    title: string,
    image: string,
    description: string,
}

function Product(props: Props) {
    return (
        <div id={`product-${props.id}`} className="Product">
            {props.image !== "" && <img src={props.image} />}
            <div>
                <h2>{props.title}</h2>
                <p>
                    {props.description}
                </p>
                <Link to={`product/${props.id}`} className="button">
                    Se mere
                </Link >
            </div>
        </div>
    );
}

export default Product;
