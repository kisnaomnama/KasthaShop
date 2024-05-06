
import "./ProductCatagory.css"
import { useState } from "react";
// import { NavLink } from "react-router-dom"


function ProductCatagory({ uniqueCategories }) {
    const [message, setMessage] = useState("");

    // const handle =(e) => {
    //     e.preventDefault()
    //     setMessage("Feature Coming Soon");
    //     // i want the message to show up feature comming soon
    // }
    return (
        <div className='category-div'>

            <h3>About Us</h3>
            <p>
                Kastha Shop is your one-stop online
                handicrafts store in Nepal for buying high-quality,
                carefully selected, and ethically sourced Nepali handicrafts.
            </p>
            {/* <ul >
                {uniqueCategories.map(category => (
                    <li key={category} onClick ={ handle }>
                        {category}
                        <NavLink to={`/category/${category}`}>{category}</NavLink>
                    </li>
                ))}
            </ul>
            {message && <p>{message}</p>} */}
        </div>
    );
}

export default ProductCatagory;
