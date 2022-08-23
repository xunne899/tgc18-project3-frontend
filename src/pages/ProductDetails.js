import { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contexts/Product";

export default function ProductDetails(props) {
  // eg: /products/:productId
  // useParams() will an object with all the parameters and their values
  // just like `req.params` in express
  const { productId } = useParams();
  const [product, setProduct] = useState({
    product_name: "",
  }); // store the product we are displaying
  const context = useContext(ProductContext);
  useEffect(() => {
    const product = context.getProductById(parseInt(productId));
    setProduct(product);
  }, [productId]);

  return (
    <Fragment>
      <h1>{product.product_name}</h1>
      <ul>
        <li>ID: {product.id}</li>
        <li>Cost: {product.cost}</li>
      </ul>
    </Fragment>
  );
}
