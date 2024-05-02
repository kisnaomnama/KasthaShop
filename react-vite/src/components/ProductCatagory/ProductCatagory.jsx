
import "./ProductCatagory.css"
import { useState} from "react";
// import { NavLink } from "react-router-dom"


function ProductCatagory({ uniqueCategories}) {
    const [message, setMessage] = useState("");

    const handle =(e) => {
        e.preventDefault()
        setMessage("Feature Coming Soon");
        // i want the message to show up feature comming soon
    }
    return (
        <div className = 'category-div'>
               <ul >
                {uniqueCategories.map(category => (
                    <li key={category} onClick ={ handle }>
                        {category}
                        {/* <NavLink to={`/category/${category}`}>{category}</NavLink> */}
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ProductCatagory;
