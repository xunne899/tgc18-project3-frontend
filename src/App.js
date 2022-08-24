import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
import UserProvider from "./providers/User";

function App() {
  return (
    <React.Fragment>
      <Router>
        <UserProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          {/* </nav> */}
        </UserProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
