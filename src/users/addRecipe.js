import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/spiSer';

function AddRecipe(props){

  let { register, handleSubmit, formState: { errors } } = useForm();
  let history = useHistory();

  let nameRef = register("recipeName", {required: true,
  minLength:2 });
  let timeRef = register("recipeTime", {required: true,
  minLength:2 });
  let typeRef = register("recipeType", {required: true,
  minLength:2 });
  let imageRef = register("recipeImage", {required: false});
  let ingredientsRef = register("recipeIngredients", {required: true,
  minLength:2 });
  let explainRef = register("recipeExplain", {required: true,
  minLength:2 });

  const onSubForm = async(dataForm) => {
    console.log(dataForm);
    try{
      let url = API_URL+"/recipes";
      let data = await doApiMethod(url, "POST", dataForm);
      console.log(data);
      if(data._id){
        toast.success("Recipe been added");
        history.push("/myRecipes");
      }
    }
    catch(err){
      console.log(err);
      toast.error("Recipe not added, there is problem");
    }
  }


  return(
    <div>
      <h1 className="mt-5 mb-3" style={{fontFamily: 'Courgette'}}>Add new recipe</h1>

      <form onSubmit={handleSubmit(onSubForm)}>

        <div className="row">

          <div className="col-lg-6">
            <label>* Recipe Name</label>
            <input {...nameRef} type="text" className="form-control mt-2"/>
            {errors.recipeName && <small className="text-danger">* You must fill recipe name</small>}
          </div>

          <div className="col-lg-6">
            <label>* Cook Time</label>
            <input {...timeRef} type="text" className="form-control mt-2"/>
            {errors.recipeTime && <small className="text-danger">* You must fill cook time</small>}
          </div>

          <div className="col-lg-6">
            <label>* Meal Type</label>
            <input {...typeRef} type="text" className="form-control mt-2"/>
            {errors.recipeType && <small className="text-danger">* You must fill meal type</small>}
          </div>

          <div className="col-lg-6">
            <label>Recipe Image</label>
            <input {...imageRef} type="text" className="form-control mt-2"/>
            {errors.recipeImage && <small className="text-danger">* You must enter valid url</small>}
          </div>

          <div className="col-lg-6">
            <label>* Ingredients</label>
            <input {...ingredientsRef} type="text" className="form-control mt-2" style={{padding: "32px 20px"}}/>
            {errors.recipeIngredients && <small className="text-danger">* You must fill igredients</small>}
          </div>

          <div className="col-lg-6">
            <label>* Explain</label>
            <input {...explainRef} type="text" className="form-control mt-2" style={{padding: "32px 20px"}}/>
            {errors.recipeExplain && <small className="text-danger">* You must fill explain</small>}
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/myRecipes" className="btn btn-dark mt-4 me-2">Back</Link>
            <button className="btn btn-success mt-4">Add new recipe</button>
          </div>

        </div>
      </form>
    </div> 
  )
}

export default AddRecipe