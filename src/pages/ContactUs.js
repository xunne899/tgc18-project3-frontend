// import React, { useState } from "react";



// export default function ContactUs() {

//   // const ContactForm = () => {
//     const [submitted, setSubmitted] = useState(false);

//     const handleSubmit = () => {
//       setTimeout(() => {
//         setSubmitted(true);
//       }, 100);
//     // };

//     const FORM_ENDPOINT = ""; // TODO - fill on the later step

//   if (submitted) {
//     return (
//       <React.Fragment>
//       <h1 className="text-center mt-2">Contact Us</h1>
//         <div className="text-2xl">Thank you!</div>
//         <div className="text-md">We'll be in touch soon.</div>
//       </React.Fragment>
//     );
//   }


//   return (
//     <React.Fragment>
//       <h1 className="text-center mt-2">Contact Us</h1>
//       <form
//       action={FORM_ENDPOINT}
//       onSubmit={handleSubmit}
//       method="POST"
//       target="_blank"
//     >
//       <div className="mb-3 pt-0">
//         <input
//           type="text"
//           placeholder="Your name"
//           name="name"
//           className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
//           required
//         />
//       </div>
//       <div className="mb-3 pt-0">
//         <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
//           required
//         />
//       </div>
//       <div className="mb-3 pt-0">
//         <textarea
//           placeholder="Your message"
//           name="message"
//           className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
//           required
//         />
//       </div>
//       <div className="mb-3 pt-0">
//         <button
//           className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//           type="submit"
//         >
//           Send a message
//         </button>
//       </div>
//     </form>
//     </React.Fragment>
//   );
// }

// }



// import React from "react";
 import React, { useState } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ContactUs() {
    
  const [submitted, setSubmitted] = useState(false);
  const routePage = useNavigate();
  
  const onContactUsSubmit = () => {
    setTimeout(() => {
              setSubmitted(true);
            }, 100);
    routePage("/")
  }
  
    return (
        <React.Fragment>
           <div id="ContactHome">
            <div className="container-fluid py-4" id="contact-us-page">
                <div className="container " >
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
                                <select className="form-select text-center mb-3" placeholder="---Select One---">
                                <option value="0">---Select One---</option>
                                   <option value="1">Product Enquiry</option>
                                    <option value="2">Order enquiry</option>
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
