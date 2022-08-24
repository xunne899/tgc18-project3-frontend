import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import UserContext from "../contexts/User";

export default function UserProvider(props) {
  const [pageIsLoaded, setPageIsLoaded] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const baseUrl = "https://3001-xunne899-tgc18backendpr-5oflwjs1eph.ws-us62.gitpod.io/";
  const context = {
    getProfile: async () => {
      setPageIsLoaded(false);
      const res = await axios({
        method: "get",
        url: baseUrl + "api/customers/profile",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      });
      console.log("get api profile=>", res);
      if (res.status == 200) {
        //setUserInfo(res.data);
      }
      setPageIsLoaded(true);
    },
    loginUser: async (loginBody) => {
      setPageIsLoaded(false);
      console.log(loginBody);
      const res = await axios({
        method: "post",
        url: baseUrl + "api/customers/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginBody,
      });

      //const res = await axios.post(baseUrl + "api/customers/login", loginBody);
      console.log("post api login=>", res);
      if (res.status == 200) {
        setUserInfo(res.data);
      }
      setPageIsLoaded(true);
      return res;
    },
    registerUser: async (registerBody) => {
      setPageIsLoaded(false);
      console.log(registerBody);
      const res = await axios({
        method: "post",
        url: baseUrl + "api/customers/register",
        header: {
          "Content-Type": "application/json",
        },
        data: registerBody,
      });

      //const res = await axios.post(baseUrl + "api/customers/login", loginBody);
      console.log("post api register=>", res);
      if (res.status == 200) {
        setUserInfo(res.data);
      }

      setPageIsLoaded(true);
      return res;
    },
  };
  return (
    <UserContext.Provider
      value={{
        userInfo,
        pageIsLoaded,
        context,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
