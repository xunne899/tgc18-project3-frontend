import { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/User";

export default function Login() {
  const [userEmail, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [registerUserName, setRegUserName] = useState("");
  const [registerPassword, setRegPassword] = useState("");
  const [registerEmail, setRegEmail] = useState("");
  const [registerFullName, setRegFullName] = useState("");
  const [registerContact, setRegContact] = useState("");

  const [authMode, setAuthMode] = useState("signin");
  const { userInfo, pageIsLoaded, context } = useContext(UserContext);
  const routePage = useNavigate();
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  useEffect(() => {
    console.log("Login page");
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const res = await context.loginUser({ email: userEmail, password: userPassword });
    if (res.status == 200) {
      //login successful
      console.log(userInfo);
      routePage("/shop");
    } else {
      //"Login Error"
    }
    //alert(`Login: ${userEmail}`);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const res = await context.registerUser({
      username: registerUserName,
      contact_number: registerContact,
      email: registerEmail,
      password: registerPassword,
      name: registerFullName,
    });

    if (res.status == 201) {
      //login successful

      console.log("register =>", res);
      setRegUserName("");

      setRegPassword("");

      setRegEmail("");

      setRegFullName("");

      setRegContact("");

      setAuthMode("signin");
      //routePage("/login");
    } else {
      //"Register Error"
    }
    //alert(`Register: ${userEmail}`);
  };

  const updateLoginFormField = (i) => {
    if (i.target.name == "loginEmail") {
      setUserName(i.target.value);
    } else if (i.target.name == "loginPassword") {
      setUserPassword(i.target.value);
    }
  };

  // const [registerUserName, setRegUserName] = useState("");
  // const [registerPassword, setRegPassword] = useState("");
  // const [registerEmail, setRegEmail] = useState("");
  // const [registerFullName, setRegFullName] = useState("");
  // const [registerContact, setRegContact] = useState("");

  const updateSignupFormField = (i) => {
    if (i.target.name == "registerUserName") {
      setRegUserName(i.target.value);
    } else if (i.target.name == "registerPassword") {
      setRegPassword(i.target.value);
    } else if (i.target.name == "registerEmail") {
      setRegEmail(i.target.value);
    } else if (i.target.name == "registerFullName") {
      setRegFullName(i.target.value);
    } else if (i.target.name == "registerContact") {
      setRegContact(i.target.value);
    }
  };

  if (authMode === "signin") {
    return (
      <div id="LoginHome">
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  onChange={updateLoginFormField}
                  value={userEmail}
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  onChange={updateLoginFormField}
                  value={userPassword}
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3 mb-3">
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
              {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div id="LoginHome">
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleRegister}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign In
              </span>
            </div>
            <div className="form-group mt-3">
              <label>UserName</label>
              <input
                type="text"
                className="form-control mt-1"
                value={registerUserName}
                name="registerUserName"
                onChange={updateSignupFormField}
                placeholder="eg.James89"
              />
            </div>
            <div className="form-group mt-3">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                value={registerFullName}
                name="registerFullName"
                onChange={updateSignupFormField}
                placeholder="eg.Jane Doe"
              />
            </div>
            <div className="form-group mt-3">
              <label>Phone Number</label>
              <input
                type="tel"
                className="form-control"
                value={registerContact}
                name="registerContact"
                onChange={updateSignupFormField}
                placeholder="eg.97784568"
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                value={registerEmail}
                name="registerEmail"
                onChange={updateSignupFormField}
                placeholder="eg.test89@gmail.com"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={registerPassword}
                name="registerPassword"
                onChange={updateSignupFormField}
                placeholder="eg.******"
              />
            </div>
            <div className="d-grid gap-2 mt-3 mb-3">
              <button
                type="submit"
                // onClick={() => setAuthMode("signin")}
                className="btn btn-dark"
              >
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
          </div>
        </form>
      </div>
    </div>
  );
  // }

  // return (
  //   <Fragment>
  //     <div className="row ms-5 me-5 d-flex justify-content-center loginBox" style={{ marginTop: "80px" }}>
  //       <div className="login-box m-3 p-3 shadow-lg rounded-3 col-12 col-md-12 col-sm-12">
  //         <div className="container-fluid py-4" id="login-register-page">
  //           <div className="container content-container">
  //             <div className="row justify-content-center">
  //               <div className="col-12 col-md mx-3 p-3 mb-md-0 mb-3 shadow-lg rounded-3 border border-dark bg-light" style={{ width: "320px" }}>
  //                 <h1 className="text-center">Login</h1>
  //                 <p className="text-center">Login to your account below!</p>
  //                 <form onSubmit={handleLogin}>
  //                   <div className="form-group mt-3">
  //                     <label htmlFor="userEmail" className="text-muted">
  //                       Email
  //                       <input name="email" value={userEmail} type="text" id="userEmail" placeholder="user@example.com" />
  //                     </label>
  //                   </div>
  //                   <div className="form-group mt-3">
  //                     <label htmlFor="userPassword" className="text-muted">
  //                       Password
  //                       <input name="password" value={userPassword} type="password" id="userPassword" placeholder="********" />
  //                     </label>
  //                   </div>
  //                   <div className="d-grid gap-2 mb-2">
  //                     <button type="submit" className="btn btn-dark mt-3">
  //                       Login
  //                     </button>
  //                   </div>
  //                 </form>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </Fragment>
  // );
}
