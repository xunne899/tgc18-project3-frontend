import React, { Fragment, useState, useEffect } from "react";
import "../styles/base.css";
import axios from "axios";
import { Carousel} from 'react-bootstrap';
import { Link } from "react-router-dom";



export default function HomePage() {
  useEffect(() => {
    console.log("First render");
    loadShopProducts()
  }, []);

  function loadShopProducts(){
  }
  return (
    <Fragment>
 
<Carousel variant="dark" fade controls={false} >

      <Carousel.Item >
        <div id="MainHome">
        <img
          className="d-block w-100 h-100 imageCover"
          src={require("../../src/images/spice_image.jpg")}
          alt=""
          // id="MainHome"
        />
         <div className="row mx-4" id="HomePageBox">
          <div>
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <span><p className="text-center mt-1">View our variety of spices selection below !</p></span>
          
          <div className="text-center mt-3" >
            <Link to={"/shop"} className="btn btn-dark mt-2 text-center">Shop Here !</Link>
            </div>
          </div>
          </div>
        </div>
       
      </Carousel.Item>
      <Carousel.Item >
      <div id="MainHome">
        <img
          className="d-block w-100 h-100 imageCover"
          src={require("../../src/images/asian_round.jpg")}
          alt=" "
        />
         <div className="row mx-4 " id="HomePageBox">
         <div >
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <span><p className="text-center mt-1">View our variety of spices selection below !</p></span>
          <div className="text-center mt-3">
            <Link to={"/shop"} className="btn btn-dark  mt-2 text-center">Shop Here !</Link>
            </div>
          </div>
          
        </div>
        </div>

      </Carousel.Item>
      <Carousel.Item >
      <div id="MainHome">
        <img
          className="d-block w-100  h-100 imageCover"
          src={require("../../src/images/food_around.jpg")}
          alt=" "
        />
         <div className="row mx-4" id="HomePageBox">
         <div>
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <span><p className="text-center mt-1">View our variety of spices selection below !</p></span>
          <div className="text-center mt-3">
            <Link to={"/shop"} className="btn btn-dark mt-2 text-center">Shop Here !</Link>
            </div>
          </div>
        </div>
        </div>
      </Carousel.Item>
    </Carousel>
    </Fragment>
  );
}
