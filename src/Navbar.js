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
        // <div className=" ">
        <li className="nav-item me-lg-3 login mx-auto">
          <Link className="nav-link text-center" to="/login">
            Login
          </Link>
        </li>
        // </div>
      );
    } else {
      return (
        <Fragment>
          <div className="nav-item dropdown me-lg-3">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-person-circle personIcon"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
              <li>
                <a className="dropdown-item text-center" href="#">
                  <Link className="nav-link ms-lg-2" to="/profile">
                    Profile
                  </Link>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Link className=" nav-link " to="/cart">
                    {renderCartBadge()}
                    Cart Item
                  </Link>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Link className="nav-link ms-lg-2" to="/order">
                    Orders
                  </Link>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Link className="nav-link ms-lg-2" to="/logout">
                    Logout
                  </Link>
                </a>
              </li>
            </div>
          </div>

        </Fragment>
      );
    }
  };
  return (
    <Fragment>
      {/* <div> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
            <div className="navbar-nav ms-auto">
              <li className="nav-item ">
                <Link className="nav-link ms-lg-3" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link ms-lg-2 me-lg-5" to="/contact">
                  Contact
                </Link>
              </li>
              {renderLoginTabs()}
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
