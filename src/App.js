import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { BrowserRouter as Router, Routes,Route } from "react-router-dom";

import Navbar from "./Navbar";
import HomePage from "./HomePage";
// import AboutUs from './pages/AboutUs';
// import Home from './pages/Home';
// import SubmittedForm from './pages/SubmittedForm';
// import PostPage from './pages/PostPage';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar/>
       
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          {/* <Route path="/shop" element={<AboutUs/>}/>
  <Route path="/contact" element={<ContactUs/>}/>  
  <Route path="/form-submitted" element={<SubmittedForm/>}/>  
  <Route path="/posts" element={<PostPage/>}/>   */}
        </Routes>
        {/* </nav> */}
      </Router>
    </React.Fragment>
  );
}

export default App;
