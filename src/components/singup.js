import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/spiSer';
import imgSignup from './images/bg.jpeg';
import '../css_components/signup.css';

function Singup(props){

  let {register, handleSubmit, formState: { errors } } = useForm();
  let history = useHistory();

  const onSubForm = async(formData) => {
    //check:
    //console.log(formData);
    try{
      let url = API_URL+"/users";
      let data = await doApiMethod(url, "POST", formData);
      if(data._id){
        toast.success("You sign up successfully");
        //after user sign up, its will send him to the login page:
        history.push("/login");
      }
      else{
        toast.error("Problem occurred, please try again later");
      }
    }
    catch(err){
      //if axios the err come with response prop and data prop
      console.log(err.response.data)
      if(err.response.data.code){
        toast.error("User already exists");
      }
      else{
        toast.error("Problem occurred, please try again later, its catch")
      }
    }
  }
  
  let nameRef = register("name", {required: true, minLength:2});

  let countryRef = register("country", {required: true, minLength:2});

  let emailRef = register("email", {
    required: true,
    pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  });

  let passwordRef = register("password", {required: true, minLength:3});

  return(
    <div className="container">

      <div className="backgroundSignup mt-1" style={{backgroundImage:`url(${imgSignup})`}}>

      <div className="row d-flex justify-content-center">
       
        <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 p-3 rounded mt-1 formSignup">

            <h2 className="mt-5 ms-3" style={{fontFamily: 'Courgette', letterSpacing: '0.3rem'}}>Create Account</h2>
            <div className="ms-3 mb-4">Join the international world of recipes</div>

              <div>
                <input {...nameRef} type="text" placeholder="Full name" className="form-control" style={{width:'19rem'}}></input>
                {errors.name && <small className="text-danger">Enter Min 2 Charts Name</small>}
              </div>

              <div>
                <input {...countryRef} type="text" placeholder="Country" className="form-control mt-3" style={{width:'19rem'}}></input>
                {errors.country && <small              className="text-danger">Enter Min 2 Charts Name</small>}
              </div>

              <div>
                <input {...emailRef} type="email" placeholder="Email" className="form-control mt-3" style={{width:'19rem'}}></input>
                {errors.email && <small className="text-danger">Enter Valid Email</small>}
              </div>

              <div>
                <input {...passwordRef} type="password" placeholder="text" placeholder="Password" className="form-control mt-3" style={{width:'19rem'}}></input>
                {errors.password && <small className="text-danger">Enter Min 3 Charts</small>}
              </div>

                <button className="btn btn-outline-danger mt-3" style={{width:'7rem'}}>SING UP  <i className="fas fa-chevron-right"></i></button>
            </form>
      </div>
      </div>
    </div> 
  )
}

export default Singup