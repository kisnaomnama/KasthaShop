import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductsThunk } from "../../redux/product";
import ProductTile from "../ProductTile";
import ProductCatagory from "../ProductCatagory";
import "./HomePage.css"
import { NavLink } from "react-router-dom"


function HomePage() {
    const dispatch = useDispatch();
    const productObj = useSelector(state => state.products)

    useEffect(() => {
        dispatch(loadProductsThunk())
    }, [dispatch])

    // if (products.length > 1) return <span>Loading....</span>
    if (!productObj) return <span>Loading....</span>

    const products = Object.values(productObj)

    // Extracting categories from products
    const categoriesArray = products.map(product => product.category);

    // Removing duplicate categories (optional)
    const uniqueCategories = Array.from(new Set(categoriesArray));
    
    // console.log("===========>", products)
    return (
        <div className="homepage-div">
            <div className="left-div">
            <h1>Catagories</h1>
                <ProductCatagory uniqueCategories = { uniqueCategories } />
            </div>
            <div className="right-div">
                <h1>Products</h1>
                <div className="product-grid">
                    {products.map((product) =>
                        <ProductTile product={product} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
