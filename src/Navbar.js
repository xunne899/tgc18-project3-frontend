import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/base.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CartContext from "./contexts/Cart";
import UserContext from "./contexts/User";

// import HomePage from "./HomePage";
export default function NavBar() {
  const { cart } = useContext(CartContext);
  const { userInfo } = useContext(UserContext);

  const renderCartBadge = () => {
    console.log("renderCartBadge=>", cart);
    if (cart.length > 0) {
      return <span className="badge badge-danger cartBadge">{cart.length}</span>;
    }
  };

  const renderLoginTabs = () => {
    if (Object.keys(userInfo).length === 0) {
      return (
        <li className="nav-item">
          <Link className="nav-link ms-lg-2 " to="/login">
            Login
          </Link>
        </li>
      );
    } else {
      return (
        <Fragment>
          <li className="nav-item">
            <Link className="nav-link ms-lg-2" to="/profile">
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link ms-lg-2 " to="/logout">
              Logout
            </Link>
          </li>
        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      {/* <div> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand ms-3" href="#">
            <img id="navLogo" src={require("./images/newSpiceLogo.png")} style={{ width: "135px", height: "60px" }} />
          </a>
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link ms-lg-3" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2" to="/contact">
                  Contact
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link ms-lg-2" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2 " to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2 " to="/logout">
                  Logout
                </Link>
              </li> */}
              {/* <li className="nav-item ">
                <Link className="nav-link ms-lg-2" to="/cart">
                <i className="bi-basket2 bi--lg"></i>
                </Link>
              </li> */}
              {renderLoginTabs()}
            </div>
            <div className="ms-auto d-flex justify-content-center me-lg-3">
              <Link className="ms-lg-2" to="/cart">
                <div className="cartWrap">
                  {renderCartBadge()}
                  <i className="bi-basket2 basketIcon"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* <HomePage/>  */}
      {/* </div> */}
    </Fragment>
  );
}
