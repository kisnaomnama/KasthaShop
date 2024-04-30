import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductTile.css"
import { NavLink } from "react-router-dom"


function ProductTile({ product }) {
    return (
        <div className = 'Product-tile-div'>
            <div className="img-div">
                <img src={product.product_image} alt="product-image" />
            </div>
            <div className="product-info">
                <NavLink to={"/products/" + product.id} >
                    <p>{product.name}</p>
                    <p>$ {product.price}</p>
                </NavLink>
            </div>
        </div>
    );
}

export default ProductTile;
