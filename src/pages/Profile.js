import axios from "axios";
import { React, useEffect, useContext, useState, Fragment } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import UserContext from "../contexts/User";
import moment from "moment";
export default function Profile() {
  const { context, userProfile, userInfo } = useContext(UserContext);

  useEffect(() => {
    context.getProfile();
    console.log("Profile page");

  }, [userInfo.accessToken]);

  const convertDate = (dateStr) => {
    const createdDate = new Date(dateStr);
    return moment(createdDate).format("DD MMM yyyy");
  };

  const renderProfile = () => {
    if (Object.keys(userInfo).length === 0) {
      return <h5>Please login to access your Profile</h5>;
    } else {
      return (
        <div className="row col">
          <div className="p-4 rounded-3 shadow-lg border border-dark profile" style={{ background: "rgba(255, 255, 255, 0.2)" }}>
            <h3>Profile</h3>
            <h6>
              <i className="bi bi-person-hearts me-2"></i>
              {userProfile.name}
            </h6>
            <h6>
              <i className="bi bi-envelope me-2"></i>
              {userProfile.email}
            </h6>
            <h6>
              <i className="bi bi-telephone-fill me-2"></i>
              {userProfile.contact_number}
            </h6>
            <h6>Joined us @ {convertDate(userProfile.created_date)}</h6>
          </div>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <div id="ProfileMain">
        <div id="profileView">
          <div className="profileInfo">
            <div className="d-flex">
              <div className="auto-margin-leftright profileWrapper">
                <img className="profileImg" src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
                <div className="rounded-3 p-4 shadow-lg bg-light profileBox" style={{ width: "50vw", background: "rgba(255, 255, 255, 0.1)" }} action="#!">
                 
                  {renderProfile()}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
