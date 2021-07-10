import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiMethod } from '../services/spiSer';
import netbo from '../components/images/netbook.png';
import { toast } from 'react-toastify';

function MyRecipes(props){

  let [ar, setAr] = useState([]);
  
  useEffect(() => {
    doApi();
  }, [props.location]);

  const doApi = async() => {
    let url = API_URL+"/recipes/userRecipesAdded?perPage=999";
    let data = await doApiMethod(url, "GET");
    console.log(data);
    data.reverse();
    setAr(data);
  }

  //TODO: delete recipe:
  const delRecipe = async(_id) => {
    if(window.confirm("Are you sure you want to delete the recipe?")){
      let url = API_URL+"/recipes/"+_id;
      let data = await doApiMethod(url, "DELETE");
      if(data.n == 1){
        doApi();
        toast.success("Recipe deleted successfully");
      }
    }
  }

  return(
    <div className="container-fluid">

      <div className="container-fluid d-flex justify-content-center align-items-center"> 
        <img className="img-fluid imgHome" src={netbo} alt="notebook"/>
        <figcaption>
          Your Cookbook
        </figcaption>
      </div>

      <div className="d-flex justify-content-end mt-3 mb-4">
        <Link className="btn btn-dark mt-3" to="/addRecipe"><i className="fa fa-plus"></i> Add new Recipe</Link>
      </div>

      <div className="table-responsive ms-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Time</th>
              <th>Meal</th>
              <th>Ingredients</th>
              <th>Explain</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Show</th>
            </tr>
          </thead>

          <tbody>
            {ar.map((item, i) => {
              return(
                <tr key={item._id}>
                  <td>{i+1}</td>
                  <td>{item.recipeName}</td>
                  <td>{item.recipeTime}</td>
                  <td>{item.recipeType}</td>
                  <td>{item.recipeIngredients}</td>
                  <td className="block">{item.recipeExplain}</td>
                  {/* edit button & trash button: */}
                  <td>
                  <Link to={"/editRecipe/"+item._id}>
                    <button className="btn btn-dark"><i className="fa fa-edit"></i></button>
                  </Link>
                  </td>
                  <td>
                  <button onClick={() => delRecipe(item._id)}
                  className="btn ms-2"
                  style={{background: "pink"}}>
                    <i className="fa fa-trash"></i>
                  </button>
                  </td>
                  
                  <td>
                    <Link to={"/detailRecipe/"+item._id} style={{color:'black', textDecoration:"none"}}>
                      <button className="btn btn-dark"><i className="fa fa-eye"></i></button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div> 
  )
}

export default MyRecipes