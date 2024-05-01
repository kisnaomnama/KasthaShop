
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
// ProductCategory.js
// import React from "react";
// import "./ProductCategory.css";
// import { NavLink } from "react-router-dom";

// function ProductCategory({ uniqueCategories, setSelectedCategory }) {
//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category); // Call setSelectedCategory with the clicked category
//   };

//   return (
//     <div className="category-div">
//       <ul>
//         {uniqueCategories.map((category) => (
//           <li key={category}>
//             <NavLink to={`/category/${category}`} onClick={() => handleCategoryClick(category)}>
//               {category}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ProductCategory;
