import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsThunk } from "../../redux/product";
import { NavLink } from "react-router-dom";
import ProductTile from "../ProductTile";
import "./ManageProducts.css"


function ManageProducts() {

    const dispatch = useDispatch();
    const productObj = useSelector(state => state.products)

    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(loadProductsThunk())
    }, [dispatch])

    if (!productObj) return <span>Loading....</span>

    const products = Object.values(productObj)

    const usersProduct = products.filter(product => product.seller.id === userId);
    const noProductsForUser = usersProduct.length === 0;

    return (
        <div className="products-wrapper-div">
            <div className="header-div">
                <h1>Manage your products</h1>
                {noProductsForUser && <p>Start your online shop by adding products</p>}
                <div className='add-product-div'>
                    <NavLink to='/products/new' className = "add-product-link">Add Product</NavLink>
                </div>
            </div>

            <div className="body-div">
                <div className="product-grid">
                    {usersProduct.map((product) =>
                        <ProductTile key={product.id} product={product} manageProduct = {true} className ="grid-item"/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageProducts;
