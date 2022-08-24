import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./styles/base.css";
// import HomePage from "./HomePage";
export default function NavBar() {
  return (
    <Fragment>
      {/* <div> */}
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand ms-1" href="#">
            <img id="navLogo" src={require("./images/newSpiceLogo.png")} style={{ width: "180px", height: "80px" }} />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link ms-lg-3" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link ms-lg-2" to="/about">
                  About
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link ms-lg-2" to="/shop">
                  Shop
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link ms-lg-2" to="/cart">
                  Cart
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link ms-lg-2" to="/contact">
                  Contact
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link ms-lg-2" to="/profile">
                  Profile
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link ms-lg-2 " to="/login">
                  Login
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link ms-lg-2 " to="/logout">
                  Logout
                </Link>
              </li>
            </div>
          </div>
        </div>
      </nav>
      {/* <HomePage/>  */}
      {/* </div> */}
    </Fragment>
  );
}
