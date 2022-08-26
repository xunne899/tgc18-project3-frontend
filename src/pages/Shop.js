import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductProvider from "../providers/Product";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";

export default function Shop() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<ProductListing/>} />
        <Route path="/product/:product_id" element={<ProductDetails/>} />
      </Routes>
    </ProductProvider>
  );
}
