import React from "react";
import CheckOutSuccess from "./CheckOutSuccess.js";
import CheckOutCancel from "./CheckOutCancel";
import { Routes, Route } from "react-router-dom";

export default function Checkout() {
  return (
    <Routes>
      <Route path="/success" element={<CheckOutSuccess />} />
      <Route path="/cancelled" element={<CheckOutCancel />} />
    </Routes>
  );
}
