import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className='navigation'>
      <div className='left-home-page-div'>
        <NavLink to="/">KasthaShop</NavLink>
      </div>
      <div className='mid-search-div'>
        <input type="text" />
      </div>

      <div className='right-profile-div'>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
