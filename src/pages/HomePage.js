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
          <div className="text-center">
            <Link to={"/shop"} className="btn btn-dark mt-3 text-center">Shop Here !</Link>
            </div>
          </div>
        </div>
        </div>
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item >
      <div id="MainHome">
        <img
          className="d-block w-100 h-100 imageCover"
          src={require("../../src/images/fresh-spices.jpg")}
          alt=" "
          // id="MainHome"
        />
         <div className="row mx-4" id="HomePageBox">
         <div>
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <span><p className="text-center mt-1">View our variety of spices selection below !</p></span>
          <div className="text-center">
            <Link to={"/shop"} className="btn btn-dark mt-3 text-center">Shop Here !</Link>
            </div>
          </div>
          
        </div>
        </div>

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item >
      <div id="MainHome">
        <img
          className="d-block w-100  h-100 imageCover"
          src={require("../../src/images/spices_view.jpg")}
          alt=" "
          // id="MainHome"
        />
         <div className="row mx-4" id="HomePageBox">
         <div>
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <span><p className="text-center mt-1">View our variety of spices selection below !</p></span>
          <div className="text-center">
            <Link to={"/shop"} className="btn btn-dark mt-3 text-center">Shop Here !</Link>
            </div>
          </div>
        </div>
        </div>
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
   
    </Carousel>

      {/* <div id="MainHome">

   
        <div className="row mx-4" id="HomePageBox">
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <span><p className="text-center">View our variety of spice selection below !</p></span>
        </div>





      </div> */}

    
    </Fragment>
  );
}
