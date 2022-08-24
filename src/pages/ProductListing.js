import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../contexts/Product";

export default function ProductListing() {
  //const context = useContext(ProductContext);
  const { context, products, pageIsLoaded } = useContext(ProductContext);
  useEffect(() => {
    context.getProducts();
    console.log(context);
  }, []);

  return (
    <Fragment>
      <h1>Product Listings</h1>
      <ul>
        {products &&
          products.length > 0 &&
          products.map((p) => (
            <li>
              <img src={p.image_url} style={{ width: "100px" }} alt={""}/>
              <div><Link to={"/product/" + p.id}>{p.name}</Link></div>
              <div>{p.country.country}</div>
              <div>{p.description}</div>
           
            </li>
          ))}
      </ul>
    </Fragment>
  );
}
