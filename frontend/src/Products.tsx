import "./products.css";

import img from "./assets/placeholder.jpeg";

function Products() {
    return (
        <div className="Products">
            <button id="product-1" className="product">
                <img src={img} alt="lækker suger klar på sjov" />
                <div>
                    <h2>Lækker suger klar på sjov</h2>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Velit beatae aperiam, ipsa minima placeat iusto
                        odit architecto provident facilis impedit possimus porro
                        expedita, fuga ullam optio maiores itaque ratione nihil.
                    </p>
                </div>
            </button>
        </div>
    );
}

export default Products;
