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
        <NavLink to="/"><span><img className={'Kastha-logo'} src={KasthaImage} alt="Home Image" />KasthaShop</span></NavLink>
      </div>

      <div className='mid-search-div'>
        <input type="text" />
      </div>

      <div className='right-profile-div'>
        {sessionUser && <NavLink to='product/new'
          className={add-product}>Add Product</NavLink>}
          <ProfileButton user = {sessionUser}/>
      </div>
    </div>
  );
}

export default Navigation;
