import React from 'react'
import Carousel from "react-material-ui-carousel";
import "./home.css"
import Img2 from "../../assets/trip2.jpg"
import Img3 from "../../assets/trip3.jpg"
export default function Home() {
    const items=[Img2,Img3]
  return (
    <div >
        <div id="carousel">
         <Carousel >
            {items.map((item, i) => (
              <img
                key={i}
                style={{ width: "100%",height:"100%" }}
                src={item}
                className="main-image"
              />
            ))}
          </Carousel>
          </div>
    </div>
  )
}
