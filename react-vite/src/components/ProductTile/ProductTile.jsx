import "./ProductTile.css";
import { NavLink } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";

function ProductTile({ key, product }) {
  return (
    <div className="Product-tile-div">
      <div className="img-div">
        <div className="image-container">
          <img src={product.product_image} alt={product.name} />
          <div className="zoom-icon">
            <FaSearchPlus />
          </div>
        </div>
        <hr />
      </div>
      <div className="product-info">
        <NavLink to={"/products/" + product.id}>
          <p className="product-name">{product.name}</p>
        </NavLink>
        <p className="product-price">$ {product.price}</p>
      </div>
    </div>
  );
}

export default ProductTile;
