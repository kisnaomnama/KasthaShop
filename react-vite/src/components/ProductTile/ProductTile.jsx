import "./ProductTile.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSearchPlus } from "react-icons/fa";

function ProductTile({ product, manageProduct }) {
  // const navigate = useNavigate()
  const productId = product.id

  const handleDelete = (e) =>{
    e.preventDefault()

  }

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
      {manageProduct && <div className ="update-delete-div">
        <hr />      
        <NavLink to={`/products/${productId}/edits`} className="update-link-text">
            Edit
          </NavLink>
        <button onClick={handleDelete}>Delete</button>
      </div>}
    </div>
  );
}

export default ProductTile;
