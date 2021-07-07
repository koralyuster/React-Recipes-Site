import { API_URL, doApiMethod } from "./spiSer";

//check if regular user & have token:
export const checkIfUser = async() => {
  //if user doesnt have token in local storage:
  if(!localStorage["tok"]){
    return {err:"No token in localStorage"}
  }
  try{
    //check if token is valid (nodejs):
    let url = API_URL+"/users/authUser"
    let data = await doApiMethod(url, "GET");
    return data;
  }
  catch(err){
    console.log(err);
    return err;
  }
};