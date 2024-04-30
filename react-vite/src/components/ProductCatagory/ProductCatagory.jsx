import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductCatagory.css"
import { Link, NavLink } from "react-router-dom"


function ProductCatagory({ uniqueCategories}) {
    console.log(uniqueCategories)
    return (
        <div className = 'category-div'>
               <ul >
                {uniqueCategories.map(category => (
                    <li key={category}>
                        <NavLink to={`/category/${category}`}>{category}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductCatagory;
