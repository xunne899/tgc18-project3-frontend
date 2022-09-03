import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import CartContext from "../context/CartContext";
import ProductContext from "../contexts/Product";
import CartContext from "../contexts/Cart";
import UserContext from "../contexts/User";
import { SpinnerDotted } from "spinners-react";

export default function LoadingSpice(props) {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserContext);
  const [pageLoaded, SetPageLoaded] = useState(true);
  //   useEffect(() => {
  //     SetPageLoaded(!cartContext.pageIsLoaded || !userContext.pageIsLoaded);
  //     console.log("Cart pageIsLoaded: ", cartContext.pageIsLoaded);
  //     console.log("User pageIsLoaded: ", userContext.pageIsLoaded);
  //   }, [cartContext.pageIsLoaded, userContext.pageIsLoaded]);

  return (
    !pageLoaded && (
      <div className="loadingBg">
        <SpinnerDotted className="loadingSpinner" size="10%" enabled={!pageLoaded} color="rgb(255,255,255)" />
      </div>
    )
  );
}
