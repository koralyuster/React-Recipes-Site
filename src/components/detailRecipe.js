import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet} from '../services/spiSer';
import '../css_components/detailRecipe.css';
import { getUserData, removeUserRecipeFav, updateUserRecipeAddFav } from '../services/userSer';

function DetailRecipe(props){

  let [ar, setAr] = useState([]);
  let [userData, setUserData] = useState();
  let [update, forceUpdate] = useState(1);
  
  useEffect(() => {
    doApi();
    setUserData(getUserData());
  }, []);

  const doApi = async() => {
    let url = API_URL+"/recipes/single/"+props.match.params.id;
    let data = await doApiGet(url);
    console.log(props.match.params.id);
    console.log(data);
    setAr([data]);
  }

   const showBtn = (item) =>{
    if(!userData.recipes.includes(item._id)){
      return(
        <button onClick={async() =>{
          await updateUserRecipeAddFav(item._id);
          forceUpdate(update + 1);
        }}
        className="btn btn-danger"><i className="fa fa-heart"></i></button>
      )
    }
    else{
      return (
        <button onClick={async() =>{
          await removeUserRecipeFav(item._id);
          forceUpdate(update + 1);
        }} 
        className="btn btn-dark"><i className="fa fa-heart"></i></button>
      )
    }
  }

  return(
    <div className="cover-container">
       {ar.map((item, i) => {
         let bg = item.recipeImage;
              return(
                <div key={item._id}>
                  <div className="imgRecipe" style={{backgroundImage: `url(${bg})`}}></div>
                  
                  <h1 className="mt-4" style={{fontFamily: 'Courgette'}}>{item.recipeName}</h1>

                  <h5>Time: {item.recipeTime}</h5>

                  <h5 className="mt-3">Ingredients:</h5> 
                    <p>{item.recipeIngredients}</p>

                  <h5 className="mt-3">How to make?</h5> 
                    <p>{item.recipeExplain}</p>

                  <h5 className="mb-4">  
                   {userData._id ? showBtn(item) : <small className="text-danger" style={{fontSize: "0.8rem"}}>*Log in for add recipe</small>} Did you like it? So add your favorite recipes!  
                  </h5>
  
                  
                </div>
              )
            })}
       <div className="d-flex justify-content-right">
         <Link to="/" className="btn btn-outline-dark shadow-sm mt-4">Back</Link>    
      </div>     
      

    </div> 
  )
}

export default DetailRecipe