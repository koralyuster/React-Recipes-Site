import React from 'react';
import {useForm} from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/spiSer';
import { updateUserData, getUserData } from '../services/userSer';
import '../css_components/login.css';
import backgroundImage from './images/background.jpeg';

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

    <div className="background mt-1" style={{backgroundImage:`url(${backgroundImage})`}}>
    
    <div className="row d-flex justify-content-center">

   
    <form onSubmit={handleSubmit(onSubForm)} className="col-lg-6 p-3 rounded mt-3 form">

      <h2 className="mt-5 ms-3 " style={{fontFamily: 'Courgette', letterSpacing: '0.3rem'}}>Login</h2>
      <div className="ms-3 mb-3">Don't have an account? <Link to="/singup" style={{color:"orange"}}>Create your account</Link></div>

          <div>
            <input {...emailRef} type="email" placeholder="Email" className="form-control" style={{width:'19rem'}}></input>
            {errors.email && <small className="text-danger">Enter Valid Email</small>}
          </div>

          <div>
            <input {...passwordRef} type="password" placeholder="text" placeholder="Password" className="form-control input mt-3" style={{width:'19rem'}}></input>
            {errors.password && <small className="text-danger">Enter Min 3 Charts</small>}
          </div>

          <button className="mt-3 btn btnLogin">Continue  <i className="fas fa-chevron-right"></i></button>
          
        </form>

    </div>
    </div>
  </div> 
  )
}

export default Login