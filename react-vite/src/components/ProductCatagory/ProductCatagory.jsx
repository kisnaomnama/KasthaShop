
import "./ProductCatagory.css"
import { NavLink } from "react-router-dom"


function ProductCatagory({ uniqueCategories}) {
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
