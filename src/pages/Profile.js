import axios from "axios";
// import { Fragment, useState, useEffect } from "react";

import { React, useEffect, useContext, useState, Fragment } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import UserContext from "../contexts/User";

export default function Profile() {
  const { context, userProfile, userInfo } = useContext(UserContext);

  useEffect(() => {
    context.getProfile();
    console.log("Profile page");
    // setProfile(context.getProfile);
  }, [userInfo.accessToken]);



  const renderProfile = () => {
    if (Object.keys(userInfo).length === 0) {
      return <h5>Please login to access your Profile</h5>;
    } else {
      return (
        <div>
          <h5>Name : {userProfile.name}</h5>
          <h5>User Name : {userProfile.username}</h5>
          <h5>Email : {userProfile.email}</h5>
          <h5>Contact Number: { userProfile.contact_number}</h5>
        </div>
      );
    }
  };


  return (
    <Fragment>
      <div id="ProfileMain">
        {/* <h1 className="text-center mt-2">Profile</h1> */}
        <div className="container content-container my-4">
          <div className="p-4 rounded-3 shadow-lg border border-dark" style={{ background:"rgba(255, 255, 255, 0.3)" }}>
            {renderProfile()}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
