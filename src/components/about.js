import '../css_components/about.css';
import React from 'react';
import pic from './images/aboutpic.jpeg';
import picSport from './images/sport-emoji.png';
import picFlower from './images/flower-emoji.png';
import picMusic from './images/music-emoji.png';
import picSleep from './images/sleep-emoji.png';



function About(props){
  return(
    <div className="container-fluid">
       <div className="cover-container d-flex justify-content-center align-items-center"> 
        <img className="img-fluid imgAbout" src={pic} alt="yammiz team"/>
        <figcaption>
          The people of yammiZ
        </figcaption>
      </div>
      <h2 className="mt-3 ms-3">About Us</h2>
      <hr/>
      <p className="mt-3 ms-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit molestiae aliquid repudiandae architecto perferendis unde nostrum illo quas vitae, ea nisi. Porro iusto voluptatum aspernatur earum tempora enim aliquid, totam quod, cum quo dolorum iure saepe eius dolore tenetur nulla. Ducimus, delectus dignissimos libero corrupti, autem fugiat excepturi recusandae eius illo nam adipisci maxime. Iure beatae odio, facilis quas esse, placeat quia repellendus tempora consequuntur ratione voluptatum eveniet, similique consectetur ad amet aliquam harum in obcaecati repudiandae alias facere iusto? Atque itaque adipisci impedit accusamus tenetur perspiciatis.</p>

      <div className="container emojis">

        <div className="col-lg-6 p-3 mx-auto mt-5">
          <div className="d-flex justify-content-between align-items-center">

            <div className="text-center">
              <img className="emoji" src={picSport} alt="sport emoji"/>
              <h5 className="name">Amit Barak</h5>
              <h6 className="hobby">Love Sport</h6>
            </div>
            

            <div className="text-center">
              <img className="emoji" src={picFlower} alt="flower emoji"/>
              <h5 className="name">Liat Levi</h5>
              <h6 className="hobby">Love Nature</h6>
            </div>

          </div>
        </div>


         <div className="col-lg-6 p-3 mx-auto mt-5">
          <div className="d-flex justify-content-between align-items-center">

            <div className="text-center">
              <img className="emoji" src={picMusic} alt="sport emoji"/>
              <h5 className="name">Adir Choen</h5>
              <h6 className="hobby">Love Music</h6>
            </div>
            

            <div className="text-center">
              <img className="emoji" src={picSleep} alt="sport emoji"/>
              <h5 className="name">Rotem Mor</h5>
              <h6 className="hobby">Love Sleep</h6>
            </div>
          </div>
        </div>
        
      </div>
    </div> 
  )
}

export default About