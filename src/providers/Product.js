import axios from "axios";
import { Fragment, useState, useEffect, useContext } from "react";
import ProductContext from "../contexts/Product";
import UserContext from "../contexts/User";
// make sure the ProductProvider has props
// ProductProvider is just a component
export default function ProductProvider(props) {
  const [types, setTypes] = useState([]);
  const [countries, setCountries] = useState([]);
  const [packaging, setPackagings] = useState([]);
  const [cuisine_styles, setCuisineStyles] = useState([]);

  const [oneProduct, setOneProduct] = useState({ product: "", variants: [] });
  const [searchFields, setSearchFields] = useState({});

  const [pageIsLoaded, setPageIsLoaded] = useState(true);
  const [products, setProducts] = useState([]);
  const userContext = useContext(UserContext);

  //userContext.userInfo.accessToken
  const baseUrl = "https://project3-spice-sauce.herokuapp.com/";

  const context = {
    getProducts: async () => {
      setPageIsLoaded(false);
      console.log("get Product userInfo==>", userContext.userInfo);
      const res = await axios.get(baseUrl + "api/products", {
        "Content-Type": "application/json",
      });
      console.log("get api products=>", res);
      if (res.status === 200) {
        setProducts(res.data);
      }

      setPageIsLoaded(true);
      return products;
    },
    searchProducts: async (searchInfo) => {
      setPageIsLoaded(false);
      console.log("get Product userInfo==>", userContext.userInfo);
      const res = await axios({
        method: "post",
        url: baseUrl + "api/products",
        header: {
          "Content-Type": "application/json",
        },
        data: searchInfo,
      });

      console.log("post api search products=>", res);
      if (res.status === 200) {
        setProducts(res.data);
      }

      setPageIsLoaded(true);
      return products;
    },

    getSearchFields: async () => {
      console.log("getSearchFields");
      setPageIsLoaded(false);
      // console.log("get Product userInfo==>", userContext.userInfo);
      let res = await axios.get(baseUrl + "api/products/types", {
        "Content-Type": "application/json",
      });

      if (res.status === 200) {
        setTypes(res.data);
      }

      console.log("post api types=>", res);

      res = await axios.get(baseUrl + "api/products/countries", {
        "Content-Type": "application/json",
      });

      if (res.status === 200) {
        setCountries(res.data);
      }
      console.log("post api countries=>", res);

      res = await axios.get(baseUrl + "api/products/packagings", {
        "Content-Type": "application/json",
      });

      if (res.status === 200) {
        setPackagings(res.data);
      }
      console.log("post api packaging=>", res);

      res = await axios.get(baseUrl + "api/products/cuisine_styles", {
        "Content-Type": "application/json",
      });

      if (res.status === 200) {
        setCuisineStyles(res.data);
      }
      //console.log("post api cuisine=>", res);
      // if (res.status === 200) {
      //   setProducts(res.data);
      // }

      setPageIsLoaded(true);
      return products;
    },

    getProductByID: async (productId) => {
      setPageIsLoaded(false);
      console.log("get Product userInfo==>", userContext.userInfo);
      const res = await axios.get(baseUrl + `api/products/${productId}/variant`, {
        "Content-Type": "application/json",
      });
      console.log("post api products=>", res);
      if (res.status === 200) {
        setOneProduct(res.data);
      }

      setPageIsLoaded(true);
      return res.data;
    },
  };
  //   useEffect(() => {
  //     getProducts()
  //     getSearchSelection()
  // }, [])
  // use ProductProvider as a higher order component
  return (
    <ProductContext.Provider
      value={{
        context,
        products,
        oneProduct,
        setOneProduct,
        searchFields,
        setSearchFields,
        types,
        countries,
        packaging,
        cuisine_styles,
        pageIsLoaded,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
