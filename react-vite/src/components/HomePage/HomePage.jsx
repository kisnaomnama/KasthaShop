import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css"
import { NavLink } from "react-router-dom"


function HomePage() {
    const dispatch = useDispatch();
    return (
        <div>
            This is the home page
        </div>
    );
}

export default HomePage;
