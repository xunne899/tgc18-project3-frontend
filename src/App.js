import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/base.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import ShoppingCart from "./pages/ShoppingCart";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Shop from "./pages/Shop";
import CheckOut from "./pages/CheckOut";
import Orders from "./pages/Orders";

import UserProvider from "./providers/User";
import CartProvider from "./providers/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionPopup from "./components/SessionPopUp";
import Footer from "./components/Footer";

function App() {
  return (
    <React.Fragment>
      <div id="page-container">
        <Router>
          <UserProvider>
            <CartProvider>
              <Navbar />
              <div id="content-wrap" style={{ minHeight: "70vh" }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/shop/*" element={<Shop />} />
                  <Route path="/cart" element={<ShoppingCart />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/checkout/*" element={<CheckOut />} />
                  <Route path="/order/*" element={<Orders />} />
                </Routes>
              </div>
              {/* </nav> */}
              <ToastContainer />
              <SessionPopup />
            </CartProvider>
          </UserProvider>
        </Router>
        <Footer id="bottomFooter" />
      </div>
    </React.Fragment>
  );
}

export default App;
