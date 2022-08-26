import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductProvider from "../providers/Product";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
// import { useParams } from "react-router-dom";
import { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contexts/Product";

export default function Shop() {
  




  
  const { context, products, pageIsLoaded } = useContext(ProductContext);
  
  // useEffect(() => {
  //   context.getProducts();
  //   console.log(context);
  // }, []);

  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<ProductListing/>} />
        <Route path= {`/product/:product_id`} element={<ProductDetails/>} />
      </Routes>
    </ProductProvider>
  );
}
