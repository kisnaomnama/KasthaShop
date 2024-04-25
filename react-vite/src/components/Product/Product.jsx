import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Product.css"
import { NavLink } from "react-router-dom"


function Product() {
    const dispatch = useDispatch();
    return (
        <div>
            This is the Product Page
        </div>
    );
}

export default Product;
