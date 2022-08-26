import { React, useEffect, useContext, Fragment } from "react";
import UserContext from "../contexts/User";

export default function Profile() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.context.getProfile();
    console.log("Login page");
  }, []);
  return (
    <Fragment>
      <h1 className="text-center mt-2">Profile</h1>
    </Fragment>
  );
}
