import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutSuccess() {
  const [countDown, setCountDown] = useState(5);
  const routePage = useNavigate();

  useEffect(() => {
    console.log("Check out success page");
    setCountDown(5);
    startCountDown();
  }, []);

  useEffect(() => {
    if (countDown > 0) {
      startCountDown();
    }
  }, [countDown]);

  const startCountDown = () => {
    setTimeout(() => {
      if (countDown - 1 <= 0) {
        routePage("/order");
      } else {
        setCountDown(countDown - 1);
      }
    }, 1000);
  };

  return (
    <React.Fragment>
    
      <h1 className="text-center mt-2">Transaction is successful.</h1>
      <div className="text-center">Redirecting you to order history in {countDown}</div>
    </React.Fragment>
  );
}
