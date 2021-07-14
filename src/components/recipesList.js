import '../css_components/recipesList.css';
import React, { useEffect, useState } from 'react';
import { getUserData, removeUserRecipeFav, updateUserRecipeAddFav } from '../services/userSer';
import { Link } from 'react-router-dom';


function RecipesList(props){

  let [userData, setUserData] = useState();
  let [update, forceUpdate] = useState(1);

  useEffect(() => {
    //Check info about the user and it help to understand for example about what the user did add to favorite and about what not:
    setUserData(getUserData());
  }, []);

  const showBtn = (item) =>{
    if(!userData.recipes.includes(item._id)){
      return(
        <button onClick={async() =>{
          await updateUserRecipeAddFav(item._id);
          forceUpdate(update + 1);
        }}
        className="btn btn-dark"><i className="fa fa-heart"></i></button>
      )
    }
    else{
      return (
        <button onClick={async() =>{
          await removeUserRecipeFav(item._id);
          forceUpdate(update + 1);
        }} 
        className="btn btn-danger"><i className="fa fa-heart"></i></button>
      )
    }
  }


  return(
    <div className="row">
      {props.ar.map((item) => {
        let bg = item.recipeImage;
        return(
          <div key={item._id} className="col-lg-4 p-4">
            <div className="p-2">
              <article className="p-3" style={{height: "28rem"}}>

                <div className="img_recipe shadow-sm" style={{backgroundImage: `url(${bg})`}}>
                  <div className="like-btn mt-2 text-end">
                  {userData._id ? showBtn(item) : <small className="text-white bg-dark" style={{borderRadius: '4px', padding: '4px'}}>Log in to add recipes</small>}
                  </div>
                </div>

                <hr/>

                <button className="btn mt-2 btnDetails"><Link to={"/detailRecipe/"+item._id}>
                  {item.recipeName} 
                  </Link> <i className="fas fa-chevron-right" style={{color: 'orange'}}></i></button>
   
                <h5 className="mt-3">Time: {item.recipeTime}</h5>

                <p>#{item.recipeType}</p>

                <div className="d-flex justify-content-between">
                  
                </div>
              
                 <hr/>

             </article>
            </div>
          </div>
        )
      })}
    </div> 
  )
}

export default RecipesList