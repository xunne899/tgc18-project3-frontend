import React from "react";

export default function Login() {
  return (
    <React.Fragment>
     <div className="row ms-5 me-5 d-flex justify-content-center loginBox" style={{marginTop:"80px"}} >
 <div className="login-box m-3 p-3 shadow-lg rounded-3 col-12 col-md-12 col-sm-12" > 
<div>
<h1>Staff Login</h1>
<p>Login to your account below!</p>
{/* <form method="POST"> */}
{/* {{{form}}} */}
   {/* <input type="hidden" value="{{csrfToken}}" name="_csrf"/> */}
<input type="submit" class="btn btn-dark mt-3" value="Login"/>
{/* </form> */}
</div>
</div>
</div>

    </React.Fragment>
  );
}
