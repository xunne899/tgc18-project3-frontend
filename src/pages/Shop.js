import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import ProductProvider from "../providers/Product";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contexts/Product";

export default function Shop() {
  const { context, products, pageIsLoaded } = useContext(ProductContext);

  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
    </ProductProvider>
  );
}
