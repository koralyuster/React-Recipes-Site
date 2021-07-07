import React from 'react';

function Footer(props){
  return(
    <div>
      <p className="border-top pt-3 text-center mt-4">
        Recipe App KoralYuster © {new Date().getFullYear()} 
      </p>
    </div> 
  )
}

export default Footer