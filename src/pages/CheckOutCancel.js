import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckOutCancel() {
  const [countDown, setCountDown] = useState(5);
  const routePage = useNavigate();
  useEffect(() => {
    console.log("Check out cancel page");
    setCountDown(5);
  }, []);

  useEffect(() => {
    if (countDown > 0) {
      startCountDown();
    }
  }, [countDown]);

  const startCountDown = () => {
    setTimeout(() => {
      if (countDown - 1 <= 0) {
        routePage("/shop");
      } else {
        console.log("Counting down");
        setCountDown(countDown - 1);
      }
    }, 1000);
  };

  return (
    <React.Fragment>
      <div classname=" mt-2">
      <h1 className="text-center mt-2">Transaction is cancelled.</h1>
      <div className="textmid">Redirecting you to Shopping Page in {countDown}</div>
      </div>
    </React.Fragment>
  );
}
