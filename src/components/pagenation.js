import '../css_components/pagenation.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet, PER_PAGE } from '../services/spiSer';

function Pagenation(props){

  let [countPage, setCountPage] = useState(0);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async() => {
    let url = API_URL+props.urlOfItemNum;
    //return the number of the recipes
    let data = await doApiGet(url);
    console.log(data.count);
    //return the number of the page that will need
    setCountPage(Math.ceil(data.count / PER_PAGE));
  }

  return(
    <div>
      {/* map loop without real array */}
      {[...Array(countPage)].map((item, i) => {
        return(
          <Link key={i} to={props.linkTo+(i+1)} className="btn btn-light ms-4 shadow-sm mt-4 hover">{i + 1}</Link>
        )
      })}
    </div> 
  )
}

export default Pagenation