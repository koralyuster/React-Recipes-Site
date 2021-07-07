import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserData, updateUserData } from '../services/userSer';

function Navbar(props){

  let [user, setUser] = useState(null);
  let history = useHistory();

  useEffect(() => {
    setUser(getUserData());
  }, [props.location]);

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
    <div className="container nav_top">
      <div className="row align-items-center">
        <div className="logo col-lg-3 d-flex justify-content-between align-items-center">
          <h2 className="text-dark" style={{fontFamily: 'Courgette'}}>yammiZ</h2>
          <nav className="d-flex justify-content-end align-items-center">
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