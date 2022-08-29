import React from "react";
import { useEffect, useContext } from "react";
import UserContext from "../contexts/User";

export default function Logout() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    userContext.context.logoutUser();
    console.log("Logout page");
  }, []);
  return (
    <React.Fragment>
      <h1 className="text-center mt-3">See you again!</h1>
    </React.Fragment>
  );
}
