import React from 'react'
import Carousel from "react-material-ui-carousel";
import "./home.css"
import Img2 from "../../assets/trip2.jpg"
import Img3 from "../../assets/trip3.jpg"
export default function Home() {
  return (
    <div >
      
         <Carousel >
          
              <img
               style={{ width: "100%",height:"100%" }}
                src={Img2}
                className="main-image"
              />
              <img
               style={{ width: "100%",height:"100%" }}
                src={Img3}
                className="main-image"
              />
            
          </Carousel>
        <div id="landing"> 
          <h1 > Welcome to SplitPay</h1>
        </div>

         
    </div>
  )
}
