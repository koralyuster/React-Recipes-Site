import React from 'react';
import '../css_components/footer.css';

function Footer(props){
  return(
    <div className="footer top-shadow mt-3 text-center">
      <p className="py-3 mb-0 textFooter">
        Recipe App KoralYuster © {new Date().getFullYear()} 
      </p>
    </div> 
  )
}

export default Footer