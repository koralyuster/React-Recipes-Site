import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/spiSer';
import imgSignup from './images/signup-page.jpeg';
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

      <div className="row">
        <div className="col-md-4">
        <h2 className="mt-5 ms-3" style={{fontFamily: 'Courgette'}}>Create Account</h2>
              <div className="ms-3">Join the international world of recipes</div>

              <form onSubmit={handleSubmit(onSubForm)} className="col-lg-4 p-3 rounded mt-3">

              <div>
                <input {...nameRef} type="text" placeholder="Full name" className="form-control" style={{width:'19rem'}}></input>
                {errors.name && <span className="text-danger">Enter Min 2 Charts Name</span>}
              </div>

              <div>
                <input {...countryRef} type="text" placeholder="Country" className="form-control mt-3" style={{width:'19rem'}}></input>
                {errors.country && <span className="text-danger">Enter Min 2 Charts Country</span>}
              </div>

              <div>
                <input {...emailRef} type="email" placeholder="Email" className="form-control mt-3" style={{width:'19rem'}}></input>
                {errors.email && <span className="text-danger">Enter Valid Email</span>}
              </div>

              <div>
                <input {...passwordRef} type="password" placeholder="text" placeholder="Password" className="form-control mt-3" style={{width:'19rem'}}></input>
                {errors.password && <span className="text-danger">Enter Min 3 Charts</span>}
              </div>

                <button className="btn btn-primary mt-3" style={{width:'7rem'}}>SING UP</button>
            </form>
        </div>

        <div className="col-md-4 container-fluid mt-1">
          <img className="imgSignup" src={imgSignup} alt="table"/>
        </div>

      </div>

    </div> 
  )
}

export default Singup