import axios from "axios";
import { Fragment, useState, useEffect } from "react";
import ProductContext from "../contexts/Product";

// make sure the ProductProvider has props
// ProductProvider is just a component
export default function ProductProvider(props) {
  const [pageIsLoaded, setPageIsLoaded] = useState(true);
  const [products, setProducts] = useState([]);
  const baseUrl = "https://3001-xunne899-tgc18backendpr-5oflwjs1eph.ws-us62.gitpod.io/";

  const context = {
    getProducts: async () => {
      setPageIsLoaded(false);
      const res = await axios.post(baseUrl + "api/products", {
        "Content-Type": "application/json",
      });
      console.log("post api products=>", res);
      if (res.status == 200) {
        setProducts(res.data);
      }

      setPageIsLoaded(true);
      return products;
    },
    
  };

  // use ProductProvider as a higher order component
  return (
    <ProductContext.Provider
      value={{
        context,
        products,
        pageIsLoaded,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
