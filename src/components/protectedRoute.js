import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { checkIfUser } from '../services/authSer';
import { getUserData } from '../services/userSer';

function ProtectedRoute(props){

  let history = useHistory();

  const checkTokenUser = async() => {
     let data = await checkIfUser();
     console.log(data);
     if(props.bizRoute){
       let user = getUserData();
       if(!user.biz){
         alert("You must singup");
         history.push("/");
       }
     }
     //if everything is ok:
     if(!data.status){
       alert("There is problem, login again please try again");
       //delete the token if we not valid:
       localStorage.removeItem("token");
       history.push("/login");
     }
  }

  return(
    <Route exact path={props.path}
      render={() => {
        checkTokenUser();
        return (<props.comp {...props}/>)
      }}/>
  )
}

export default ProtectedRoute