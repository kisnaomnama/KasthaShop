import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css"
import { NavLink } from "react-router-dom"


function ProductDetail() {
    const dispatch = useDispatch();
    return (
        <div>
            This is the Product Deatail Page
        </div>
    );
}

export default ProductDetail;
