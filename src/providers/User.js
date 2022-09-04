import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import UserContext from "../contexts/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UserProvider(props) {
  const [pageIsLoaded, setPageIsLoaded] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [showSessionPopUp, setShowSessionPopUp] = useState(false);
  const baseUrl = "https://project3-spice-sauce.herokuapp.com";
  const navigate = useNavigate();
  const [remindSession, setRemindSession] = useState();
  const [timeOutSession, setTimeOutSession] = useState();

  useEffect(() => {
    /*  close browser, open  webpage within 60min */
    /* close browser, open my webpage after 60min */
    /* where refresh api fails, user session will be cleared and prompt to login again */
    let storedUserInfo = localStorage.getItem("UserInfo");
    if (storedUserInfo) {
      // refresh session when first time loading page after closing. sesion should be active for 1 hour.
      setUserInfo(JSON.parse(storedUserInfo));
      refreshUserToken(false);
    }
  }, []);

  const refreshUserToken = async (showToast) => {
    let storedUserInfo = JSON.parse(localStorage.getItem("UserInfo"));
    setUserInfo({
      accessToken: storedUserInfo.accessToken,
      refreshToken: storedUserInfo.refreshToken,
    });
    console.log("refreshUserToken==>", storedUserInfo);
    try {
      const refreshResponse = await axios.post(`${baseUrl}/api/customers/refresh`, {
        refreshToken: storedUserInfo.refreshToken,
      });
      setUserInfo({
        accessToken: refreshResponse.data.accessToken,
        refreshToken: storedUserInfo.refreshToken,
      });
      localStorage.setItem(
        "UserInfo",
        JSON.stringify({
          accessToken: refreshResponse.data.accessToken,
          refreshToken: storedUserInfo.refreshToken,
        })
      );
      if (showToast) {
        toast("Session has been refreshed. Enjoy shopping!", {
          position: "bottom-right",
          autoClose: 3500,
        });
      }
      promptSessionTimingOut();
    } catch (err) {
      toast.error("Previous session has expired, please re-login.", {
        toastId: "getUserError",
        position: "bottom-right",
      });
      localStorage.clear();
      setUserInfo({});
      navigate("/home");
    }
  };

  const promptSessionTimingOut = () => {
    setRemindSession(
      setTimeout(() => {
        setShowSessionPopUp(true);
        console.log("begin session time out");
        beginSessionTimeOut();
      }, 1000 * 60 * 59) // 1000 * 60 * 59 | 1000 * 10
    );
  };

  const beginSessionTimeOut = () => {
    setTimeOutSession(
      setTimeout(() => {
        console.log("end session time out");
        setShowSessionPopUp(false);
        context.logoutUser();
      }, 1000 * 60) // 1000 * 60 | 1000 * 10
    );
  };

  const refreshSession = async () => {
    clearTimeout(timeOutSession);
    clearTimeout(remindSession);
    refreshUserToken(true);
    setShowSessionPopUp(false);
    // refresh session
  };

  const context = {
    getProfile: async () => {
      setPageIsLoaded(false);
      const res = await axios({
        method: "get",
        url: baseUrl + "/api/customers/profile",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      });
      console.log("get api profile=>", res);
      if (res.status == 200) {
        setUserProfile(res.data.profile);
      }
      setPageIsLoaded(true);
    },

    loginUser: async (loginBody) => {
      try {
        setPageIsLoaded(false);
        console.log(loginBody);
        const res = await axios({
          method: "post",
          url: baseUrl + "/api/customers/login",
          headers: {
            "Content-Type": "application/json",
          },
          data: loginBody,
        });


        console.log("post api login=>", res);
        if (res.status == 200) {
          setUserInfo(res.data);
          localStorage.setItem("UserInfo", JSON.stringify(res.data));
          toast("Logged in successfully.", {
            position: "bottom-right",
            autoClose: 3000,
          });
          // reminder after 59min
          promptSessionTimingOut();
        }
        setPageIsLoaded(true);

        return res;
      } catch (err) {

        toast.error("Invalid email or password. Please try again.", {
          toastId: "getUserError",
          position: "bottom-right",
        });
        setUserInfo({});

      }
    },

    registerUser: async (registerBody) => {
      setPageIsLoaded(false);
      console.log(registerBody);
      const res = await axios({
        method: "post",
        url: baseUrl + "/api/customers/register",
        header: {
          "Content-Type": "application/json",
        },
        data: registerBody,
      });


      console.log("post api register=>", res);
      if (res.status == 201) {
        toast("Registered successfully.", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }

      setPageIsLoaded(true);
      return res;
    },
    logoutUser: async () => {
      let localUserInfo = localStorage.getItem("UserInfo");
      console.log("loggin out 1==>", userInfo);
      console.log("loggin out 2==>", localUserInfo);
      if (localUserInfo) {
        let userInfoObj = JSON.parse(localUserInfo);
        let userInfoData = { accessToken: userInfoObj.accessToken, refreshToken: userInfoObj.refreshToken };
        setShowSessionPopUp(false);
        localStorage.clear();
        setUserInfo({});
        const res = await axios({
          method: "post",
          url: baseUrl + "/api/customers/logout",
          header: {
            "Content-Type": "application/json",
          },
          data: userInfoData,
        });

        toast("Logged out successfully.", {
          position: "bottom-right",
          autoClose: 3000,
        });

        navigate("/home");
      }
    },
  };
  return (
    <UserContext.Provider
      value={{
        userInfo,
        userProfile,
        pageIsLoaded,
        context,
        showSessionPopUp,
        refreshSession,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
