import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/spiSer';
import RecipesList from './recipesList';
import Favpic from './images/favorite-page-pic.jpeg';

function FavRecipes(props){

  let [recipes_ar, setRecipesAr] = useState([]);

  useEffect(() => {
    let url = API_URL+"/users/userRecipes";
    doApi(url);
  }, []);

  const doApi = async(_url) => {
    try{
      let data = await doApiMethod(_url, "GET");
      console.log(data);
      setRecipesAr(data);
    }
    catch(err){
      console.log(err.response);
    }
  }

  return(
    <div>
      <div className="cover-container d-flex justify-content-center align-items-center"> 
        <img className="img-fluid imgAbout" src={Favpic} alt="kitchen"/>
        <figcaption>
          Your Favorite Recipes 
        </figcaption>
      </div>
      <RecipesList ar={recipes_ar}></RecipesList>
    </div> 
  )
}

export default FavRecipes