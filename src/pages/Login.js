import { Fragment, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../contexts/User";

export default function Login() {
  

  //login
  const [userEmail, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //register
  const [registerUserName, setRegUserName] = useState("");
  const [registerPassword, setRegPassword] = useState("");
  const [registerConfirmPassword, setRegConfirmPassword] = useState("");
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



  // form validation
  const [invalidName, setinvalidName] = useState(false);
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [invalidContact, setinvalidContact] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);
  const [invalidConfirmPassword, setinvalidConfirmPassword] = useState(false);
  const [invalidUserName, setinvalidUserName] = useState(false);
  

  const handleLogin = async (event) => {
    event.preventDefault();

    let errorCount = 0;
    setinvalidEmail(false);
    setinvalidPassword(false);

    if (userEmail === "" || !userEmail.includes("@") || !userEmail.includes(".")) {
      setinvalidEmail(true);
      errorCount += 1;
    }

    if (userPassword === "" || userPassword.length < 0 || userPassword.length > 20) {
      setinvalidPassword(true);
      errorCount += 1;
    }

    if (errorCount === 0) {
      let res = await context.loginUser({
        email: userEmail, password: userPassword })

      if (res.status === 200) {
        //login successful
        setEmail("");

        setUserPassword("");
        routePage("/shop");
      }
    }

  };




  const handleRegister = async (event) => {
    event.preventDefault();



    let errorCount = 0;
    setinvalidName(false);
    setinvalidUserName(false);
    setinvalidEmail(false);
    setinvalidPassword(false);
    setinvalidConfirmPassword(false);
    setinvalidContact(false);
    if (registerFullName === "") {
      setinvalidName(true);
      errorCount += 1;
    }
    if (registerUserName === "") {
      setinvalidUserName(true);
      errorCount += 1;
    }

    if (registerEmail === "" || !registerEmail.includes("@") || !registerEmail.includes(".")) {
      setinvalidEmail(true);
      errorCount += 1;
    }

    if (registerPassword === "" || registerPassword.length < 0 || registerPassword.length > 20) {
      setinvalidPassword(true);
      errorCount += 1;
    }

    if (registerConfirmPassword === "" || registerConfirmPassword.length < 0 || registerConfirmPassword.length > 20) {
      setinvalidConfirmPassword(true);
      errorCount += 1;
    }

    if (registerContact === "" || registerContact.length > 20) {
      setinvalidContact(true);
      errorCount += 1;
    }

    if (errorCount > 0) {
      toast.error("Register information is incorrect!", {
        position: "bottom-right",
        autoClose: 3500,
        toastId: "IncorrectConfirmPasswordError",
      });
      return;
    }
    if (errorCount == 0 && registerConfirmPassword != registerPassword) {
      toast.error("Incorrect Confirmation Password!", {
        position: "bottom-right",
        autoClose: 3500,
        toastId: "IncorrectConfirmPasswordError",
      });
      return;
    }

    //"Register Error"

    if (errorCount === 0) {
      let res = await context.registerUser({
        username: registerUserName,
        contact_number: registerContact,
        email: registerEmail,
        password: registerPassword,
        name: registerFullName,
      });

      if (res.status === 201) {
        //login successful

        console.log("register =>", res);
        setRegUserName("");

        setRegPassword("");

        setRegConfirmPassword("");

        setRegEmail("");

        setRegFullName("");

        setRegContact("");

        setAuthMode("signin");
 
      }
    }

  };

  const updateLoginFormField = (i) => {
    if (i.target.name == "loginEmail") {
      setEmail(i.target.value);
    } else if (i.target.name == "loginPassword") {
      setUserPassword(i.target.value);
    }
  };


  const updateSignupFormField = (i) => {
    if (i.target.name == "registerUserName") {
      setRegUserName(i.target.value);
    } else if (i.target.name == "registerPassword") {
      setRegPassword(i.target.value);
    } else if (i.target.name == "registerConfirmPassword") {
      setRegConfirmPassword(i.target.value);
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
        <div className="Auth-form-container d-flex align-items-center">
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Log In</h3>
              <div className="text-center" >
                Not registered yet?{" "}
                <span className="link-primary"  onClick={changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label >Email address</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  onChange={updateLoginFormField}
                  value={userEmail}
                  className="form-control mt-1"
                  placeholder="Enter email"
                />
              {invalidEmail === true ? <div style={{ color: "red" }}>Please enter a valid email.</div> : null}
              </div>
              <div className="form-group mt-3">
                <label >Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  onChange={updateLoginFormField}
                  value={userPassword}
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
                {invalidPassword === true ? <div style={{ color: "red" }}>Please enter a valid Password.</div> : null}
              </div>

              <div className="d-grid gap-2 mt-3 mb-3">
                <button type="submit" style={{marginTop:"20px"}} className="btn btn-dark">
                  Submit
                </button>
              </div>
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
            <h3 className="Auth-form-title">Register</h3>
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
              {invalidUserName === true ? <div style={{ color: "red" }}>Please enter a valid username.</div> : ""}
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
              {invalidName === true ? <div style={{ color: "red" }}>Please enter a valid name.</div> : null}
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
              {invalidContact === true ? <div style={{ color: "red" }}>Please enter a valid contact.</div> : null}
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
              {invalidEmail === true ? <div style={{ color: "red" }}>Please enter a valid email.</div> : null}
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
              {invalidPassword === true ? <div style={{ color: "red" }}>Please enter a valid password.</div> : null}
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                type="password"
                name="registerConfirmPassword"
                onChange={updateSignupFormField}
                value={registerConfirmPassword}
                className="form-control mt-1"
                placeholder="eg.******"
              />
              {invalidConfirmPassword === true ? <div style={{ color: "red" }}>Please enter a valid confirm password.</div> : null}
            </div>
            <div className="d-grid gap-2 mt-3 mb-3">
              <button
                type="submit"
                className="btn btn-dark"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

 
}
