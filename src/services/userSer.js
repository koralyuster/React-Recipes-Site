import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "./spiSer";

//This file includes all the information about the exsits user, and 
//this file can send any component information about the user.

let user = {};

export const updateUserData = async() => {
  if(localStorage["tok"]){
    //If there is token so we can get info about the user, then
    //if the token not exists or invalid, we send the user to the login page
    let url = API_URL+"/users/userInfo";
    try{
      let data = await doApiMethod(url, "GET");
      if(data._id){
        user = data;
      } else{
        user = {};
        localStorage.removeItem("tok");
      }
      return user;
    }
    catch(err){
      localStorage.removeItem("tok");
      user = {};
      return user;
    }
  } else{
    //if token not exists
    user = {};
    return user;
  }
};

export const getUserData = () => {
  return user;
}

//function that update the array of the recipes of the user, 
//that the user add this recipes to favforites:
export const updateUserRecipeAddFav = async(_id) => {
  //adding the new recipe fav to the array. its like push.
  let temp_ar = [...user.recipes, _id];
  //To not allow there is double recipe in the array:
  //Set-> create an object that take care there not be double:
  temp_ar = new Set([...temp_ar]);
  //adding to new array (temp_ar);
  user.recipes.splice(0, user.recipes.length, ...temp_ar);
  
  let url = API_URL+"/users/recipes"
  try{
    let data = await doApiMethod(url, "PATCH", {recipes: user.recipes});
    //if successs will get from the services n = 1:
    if(data.n == 1){
      toast.success("Recipe favorite is update");
    }
    return data;
  }
  catch(err){
    console.log(err);
    toast.error("Problem occurred, please try again later");
    throw err;
  }
}

//function that delete recipe from the favorite:
export const removeUserRecipeFav = async(_id) => {
  //will send back the temp array only the recipes the user want to delete
  let temp_ar = user.recipes.filter(item => item != _id);
  user.recipes.splice(0, user.recipes.length, ...temp_ar);

  let url = API_URL+"/users/recipes"
  try{
    let data = await doApiMethod(url, "PATCH", {recipes: user.recipes});
    if(data.n == 1){
      toast.success("recipe removed");
    }
    return data;
  }
  catch(err){
    console.log(err);
    toast.error("Problem occurred, please try again later");
    throw err;
  }
}
