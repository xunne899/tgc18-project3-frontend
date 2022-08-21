import React, { Fragment } from "react";
import "./styles/base.css";

export default function HomePage(){
    return(
        <Fragment>
       
             <div id="MainHome"> 
         
            {/* <div className="row" > */}
            <div className="row mx-auto d-flex align-items-center" id="HomePageBox">
        <h3 className="text-center">Your One-Stop Spice Solution</h3>
        <p className="text-center">View our variety of spice selection below !</p>
        </div>
       </div> 
      {/* </div> */}
     
       
        </Fragment>
    )
}