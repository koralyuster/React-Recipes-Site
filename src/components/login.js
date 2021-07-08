import React from 'react';
import {useForm} from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/spiSer';
import { updateUserData, getUserData } from '../services/userSer';
import loginPic from './images/login-page.jpeg';
import '../css_components/login.css';

function Login(props){

  let history = useHistory();

  let {register, handleSubmit, formState: { errors } } = useForm();

  const onSubForm = async(formData) => {
    console.log(formData);
    try{
      let url = API_URL+"/users/login";
      let data = await doApiMethod(url, "POST", formData);
      console.log(data);
      //we got tok and now we need to keep the tok in the local storage:
      localStorage.setItem("tok", data.token);
      //update the info about the user for we can take it out of the server and use it:
      await updateUserData();
      console.log(getUserData());
      toast.success("You logged in successfully");
      history.push("/");
    }
    catch(err){
      console.log(err);
      toast.error("User or password not match");
    }
  }

  let emailRef = register("email", {
    required: true,
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  })

  let passwordRef = register("password", {required: true, minLength:3});

  return(
    <div className="container">
    
<div className="row">
  <div className="col-md-4">

    <h2 className="mt-5 ms-3 hello" style={{fontFamily: 'Courgette'}}>Hello!</h2>
      <div className="ms-3">Don't have account? <Link to="/singup" style={{color:"#cc6600"}}>Create your account</Link></div>

    <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 p-3 rounded mt-3">

          <div>
            <input {...emailRef} type="email" placeholder="Email" className="form-control" style={{width:'19rem'}}></input>
            {errors.email && <span className="text-danger">Enter Valid Email</span>}
          </div>

          <div>
            <input {...passwordRef} type="password" placeholder="text" placeholder="Password" className="form-control input mt-3" style={{width:'19rem'}}></input>
            {errors.password && <span className="text-danger">Enter Min 3 Charts</span>}
          </div>

          <button className="btn btn-primary mt-3 ">Login</button>
          
        </form>

  </div>

  <div className="col-md-4 container-fluid mt-1">
      <img className="imgLogin" src={loginPic} alt="cooking"/>
  </div>

</div>
   
    </div> 
  )
}

export default Login