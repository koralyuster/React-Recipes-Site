import '../css_components/home.css';
import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/spiSer';
import RecipesList from './recipesList';
import pic from './images/homepic.jpeg';
import Pagenation from './pagenation';

function Home(props){

  let [recipes_ar, setRecipesAr] = useState([]);

  useEffect(() => {
    //to pick query string of the number of the current page:
    const queries = new URLSearchParams(window.location.search);
    //-1 -> because we start from 0 like in array
    let page = queries.get("page") ? queries.get("page")-1 : 0;
    let url = API_URL+"/recipes?reverse=yes&page="+page;
    doApi(url);
  },[props.location]);

  const doApi = async(_url) => {
    let data = await doApiGet(_url);
    console.log(data);
    setRecipesAr(data);
  }

  return(
    <div>
      <div className="container-fluid d-flex justify-content-center align-items-center"> 
        <img className="img-fluid imgHome" src={pic} alt="Meal lunch"/>
        <figcaption>
          Recipes All Around The World
        </figcaption>
      </div>
      
      <br/>
      {/*recipesList Page */}
      <RecipesList ar={recipes_ar}></RecipesList>
      <Pagenation urlOfItemNum="/recipes/totalRecipes" linkTo="/?page="></Pagenation>
    </div> 
  )
}

export default Home