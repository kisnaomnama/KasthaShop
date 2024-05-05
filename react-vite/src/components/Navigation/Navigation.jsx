import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux"
import KasthaImage from '../../../dist/faviconlr.png'
// import { FaSearch, FaShoppingCart } from "react-icons/fa";

import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div className='navigation navigation-wrapper'>
      <div className='kastha-logo-div'>
        <NavLink to="/">
          <img className={'Kastha-logo'} src={KasthaImage} alt="Home Image" />
          KasthaShop
        </NavLink>
      </div>

      {/* <div className='icon search-icon'>
        <input type="text" />
        <FaSearch />
      </div> */}

      {/* <div className='add-product'>
        {sessionUser && <NavLink to='/products/new'>Add Product</NavLink>}
      </div> */}

      {/* <div className="icon cart-icon">
        <FaShoppingCart />
      </div> */}
      <div>
      <p>Welcome to our handcraft shop. Dear <span id ="login-first-name"> {sessionUser?.first_name}</span>!</p>
      </div>
      <div className='icon profile-icon'>
        <ProfileButton user={sessionUser} className ="profile-button"/>
      </div>

    </div>
  );
}

export default Navigation;
