import React, { Fragment, useState, useEffect } from "react";
import "../styles/base.css";
import axios from "axios";

export default function HomePage() {
  useEffect(() => {
    console.log("First render");
    loadShopProducts()
  }, []);

  function loadShopProducts(){

  }

  return (
    <Fragment>
      <div id="MainHome">
        {/* <div className="row" > */}
        <div className="row mx-3" id="HomePageBox">
          <h3 className="text-center mt-4">Your One-Stop Spice Solution</h3>
          <p className="text-center">View our variety of spice selection below !</p>
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
}
