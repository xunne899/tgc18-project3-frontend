

// import React from "react";
 import React, { useState } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function ContactUs() {
    
  const [submitted, setSubmitted] = useState(false);
  const routePage = useNavigate();
  
  const onContactUsSubmit = () => {
    setTimeout(() => {
              setSubmitted(true);
            }, 100);
            toast('Successfully Submitted', {
                position: "bottom-right",
                autoClose: 2000,
               
                });
    routePage("/")
  }
  
    return (
        <React.Fragment>
           <div id="ContactHome">
            <div className="container-fluid py-4" id="contact-us-page">
                <div className="container" >
                    <div className="d-flex justify-content-center align-content-center">
                        <form className="text-center  rounded-3 p-4 shadow-lg bg-light" style={{ width: '340px'}} action="#!">
                            <h3 className=" mb-4"> Need Help ?</h3>
                            <p>Please complete the form below. We will get back to you as soon as possible</p>
                            <hr/>
                            {/* <div className="form-control mb-3"> */}
                                <input type="text"  className="form-control mb-3" placeholder="Name" />
                                {/* <label className="text-muted">Name</label> */}
                            {/* </div> */}
                            {/* <div className="form-control mb-3"> */}
                                <input type="email"  className="form-control mb-3" placeholder="E-mail" />
                                {/* <label className="text-muted">Email</label> */}
                            {/* </div> */}
                            {/* <div className='form-floating mb-3'> */}
                                <select className="form-select text-left mb-3" placeholder="---Select One---">
                                <option  value="0">---Select-One---</option>
                                   <option value="1">Product Matters</option>
                                    <option value="2">Order Matters</option>
                                    <option value="3">Feedback</option>
                                   </select>
                                {/* <label className="text-center" style={{ height: "10px" }} >Type of Enquiry</label> */}
                            {/* </div> */}
                            {/* <div className="form-floating mb-3"> */}
                                <textarea className="form-control mb-3" placeholder="Leave us a comment here"  style={{ height: "100px" }}></textarea>
                                {/* <label className="text-muted">Comments</label> */}
                            {/* </div> */}
                            <div className="row mx-0 d-flex">
                                <button className="btn btn-dark btn-outline-light"
                                    type="submit"
                                    onClick={(evt) => {
                                        evt.preventDefault()
                                       
                                        onContactUsSubmit()
                                    }}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}
