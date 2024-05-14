import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsThunk } from "../../redux/product";
import ProductGrids from "./ProductGrids";
import "./HomePage.css";

function HomePage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const allProducts = useSelector((state) => state.products.products);
    const [selectedCategory, setSelectedCategory] = useState(); 


    useEffect(() => {
        dispatch(fetchAllProductsThunk()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        setSelectedCategory(allProducts)
    }, [allProducts])

    const categoriesArray = allProducts?.map((product) => product.category);
    const uniqueCategories = Array.from(new Set(categoriesArray));
    uniqueCategories.push("All")

    const handleClick = (category) => {
        if (category === "All") {
            setSelectedCategory(allProducts)
        }
        else {
            const newProducts = allProducts.filter(
                (product) => product.category === category)
            setSelectedCategory(newProducts);
        }
    };

    if (!isLoaded) return <span>Loading....</span>;
    return (
        <div className="home-div-wrapper">
            <div className="category-icons-links">
                {uniqueCategories?.map((category, catIndex) => (
                    <button
                        key={catIndex}
                        onClick={() => handleClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="homepage-div">
                <ProductGrids products={selectedCategory} />
            </div>
        </div>
    );
}

export default HomePage;
