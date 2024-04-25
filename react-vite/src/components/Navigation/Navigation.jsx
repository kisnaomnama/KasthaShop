import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux"
import KasthaImage from '../../../dist/favicon-big.png'

import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  return (
    <div className='navigation navigation-wrapper'>
      <div className='left-home-page-div'>
        <NavLink to="/"><img className={'Kastha-logo'} src={KasthaImage} alt="Home Image" />KasthaShop</NavLink>
      </div>

      <div className='mid-search-div'>
        <input type="text" />
      </div>
      <div className ='add-product'>
      {sessionUser && <NavLink to='products/new'>Add Product</NavLink>}
      </div>
      <div className='right-profile-div'>
          <ProfileButton user = {sessionUser}/>
      </div>
    </div>
  );
}

export default Navigation;
