import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { NavLink, useParams } from "react-router-dom"
import { productFetchByIdThunk } from "../../redux/product";


function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const parsedProductId = parseInt(productId);

    useEffect(() => {
        dispatch(productFetchByIdThunk(parsedProductId));

    }, [dispatch]);

    const product = useSelector(state => state.products[parsedProductId]);

    if (!product) {
        return <div className="product-loading">Product not found or still loading...</div>;
    }
    return (
        <div className="product-details">
            <h2>{product.name}</h2>
            <div className="detail-body-div">
                <div className="left-image-div">
                    {product.product_image && <img src={product.product_image} alt={product.title} />}
                </div>
                <div className='right-info-div'>

                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>

                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
