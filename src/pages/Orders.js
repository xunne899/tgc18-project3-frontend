import React from "react";
import { Routes, Route } from "react-router-dom";
import OrderDetails from "./OrderDetails";
import OrderListing from "./OrderListing";
export default function Orders() {
  return (
    <Routes>
      <Route path="/" element={<OrderListing />} />
      <Route path="/:id" element={<OrderDetails />} />
    </Routes>
  );
}
