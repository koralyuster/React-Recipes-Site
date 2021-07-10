import '../css_components/navbar.css';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';

function Navbar(props){

  let [showMobileNav,setShowMobileNav] = useState(false);
  let [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    setUser(getUserData());
  }, [props.location]);

  //hide the menu in mobile that we click on link:
   const hideNavMobile = () => {
    setShowMobileNav(false);
  }

  const logout = () => {
    //check
    //alert("logout");
    localStorage.removeItem("tok");
    //upsate there is no info about the user after user click logout:
    updateUserData();
    history.push("/login");
    toast.error("You logged out from the system");
    console.log(logout);
  }

  return(
    <div>
      <div className="row align-items-center">
        <div className="col-lg-3 d-flex justify-content-start align-items-center">
           <div className="burger" onClick={() => {
            setShowMobileNav(!showMobileNav);
          }}>
             <i className="fa fa-bars fs-2" aria-hidden="true"></i>
          </div>
          <Link to="/">
            <h2 className="text-dark logoName">yammiZ</h2>
          </Link>
          
          <nav onClick={hideNavMobile} className={"col-lg-9 text-start"} style={{ display: showMobileNav && "block" }} >
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {!localStorage["tok"] ? 
              <React.Fragment>
                <Link to="/login">Login</Link>
                <Link to="/singup">Singup</Link>
              </React.Fragment>
              :
              <React.Fragment>
                <Link to="/favorite">Favorites</Link>
                <Link to="/myRecipes">Recipes</Link>

              <Link onClick={logout} to="#" className="text-danger">Logout</Link>
              </React.Fragment>
            }
            </nav>
        </div>
      </div>
    </div> 
  )
}

export default Navbar