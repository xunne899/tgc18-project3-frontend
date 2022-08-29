import { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductContext from "../contexts/Product";
import CartContext from "../contexts/Cart";

export default function ProductDetails(props) {
  // eg: /products/:productId
  // useParams() will an object with all the parameters and their values
  // just like `req.params` in express

  const { id } = useParams();

  const [productInfo, setProductInfo] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
  }); // store the product we are displaying

  const [variantIndex, setVariantIndex] = useState(0);
  const [variantQuantity, setVariantQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0.0);

  const { context } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const updateVariantChoice = (evt) => {
    setVariantIndex(evt.target.value);
    console.log("vairant index=>", evt.target.value);
    setProductVariant(productInfo.variants[evt.target.value]);
  };

  async function getProductDetail() {
    const productInfo = await context.getProductByID(parseInt(id));
    console.log("productInfo=>", productInfo);
    setProduct(productInfo.product);
    setProductInfo(productInfo);
    
    if (productInfo.variants && productInfo.variants.length > 0) {
      setProductVariant(productInfo.variants[0]);
      console.log("Product Variant==>", productVariant);
      setTotalCost(productInfo.variants[0].cost / 100);
    }
  }
  useEffect(() => {
    getProductDetail();
  }, []);

  const updateProductItemFormField = (i) => {
    if (i.target.name == "itemQuantity") {
      setVariantQuantity(i.target.value);
      setTotalCost((i.target.value * productVariant.cost) / 100);
    }
  };

  const AddVariantToCart = () => {
    console.log(productVariant.id);
    addToCart(productVariant.id, variantQuantity);
  };
  // const { context, products, pageIsLoaded } = useContext(ProductContext);

  // useEffect(() => {
  //   context.getProducts();
  //   console.log(context);
  // }, []);

  // useEffect(() => {
  //   console.log("product Id=>", productId);
  //   const product = context.getProductById(parseInt(productId));
  //   setProduct(product);
  // }, [productId]);
  // const variantRender = () => {
  //   if (Object.keys(productVariant).length > 0) {
  //     return (
  //       <div>
  //         {/* <div> Spiciness: {productVariant.spiciness.spiciness}</div> */}
  //         {/* <div> Size: {productVariant.size.size}</div> */}
  //         {/* <div> Price: ${(productVariant.cost / 100).toFixed(2)}</div> */}
  //         {/* <div> Stock: {productVariant.stock}</div> */}
  //         <></>
  //       </div>
  //     );
  //   }
  // };

  return (
    <Fragment>
      {/* 
      <label>Type</label> */}
      <div className="container my-5">
        <div className="row">
          {/* <div className="" > */}
          <img className="col-6 col-lg-6 rounded-3" src={product.image_url} style={{ width: "600px" }} />
          {/* </div> */}

          <div className="row d-flex justify-content-center col-6 col-lg-6  rounded-2 p-1 mt-sm-2" style={{ width: "600px", marginLeft: "12px" }}>
            <h3 className="text-left mt-1">{product.name}</h3>
            <div>
              {" "}
              <strong> ${(productVariant.cost / 100).toFixed(2)}</strong>
            </div>
            {/* <ul> */}
            <div>Type: {product.type && product.type.type}</div>
            <div>Country: {product.country && product.country.country}</div>
            <div>
              Ingredients:<span> {product.ingredients && product.ingredients.map((p, i) => <span key={`ingredient_${i}`}>{p.ingredient}</span>)}</span>
            </div>
            <div key="cuisines">
              Cuisine: {product.cuisine_styles && product.cuisine_styles.map((p, i) => <span key={`cuisine_${i}`}>{p.cuisine_style} </span>)}
            </div>
            <div className="mt-1 mb-1">{product.description}</div>
            {/* </ul> */}

            <div className="row mt-3 mb-3">
              <div className="d-flex justify-content-left col-3 col-lg-3 me-4 ms-0">
                <div>Size</div>
                <select
                  className="form-select ms-2 mb-2"
                  id="variant_select"
                  style={{ fontSize: "13px", height: "32px", width: "900px" }}
                  onChange={updateVariantChoice}
                  value={variantIndex}
                  name="variant_select_id"
                >
                  {productInfo &&
                    productInfo.variants &&
                    productInfo.variants.map((t, i) => (
                      <option key={`variant_${i}`} value={i}>
                        <div> {t.size.size}</div>
                      </option>
                    ))}
                </select>
              </div>
              {/* {variantRender()} */}

              <div className="d-flex justify-content-right col-3 col-lg-3 " style={{ marginLeft: "70px" }}>
                <div>Quantity</div>
                <input
                  min="1"
                  type="number"
                  name="itemQuantity"
                  onChange={updateProductItemFormField}
                  style={{ fontSize: "13px", height: "32px", width: "300px" }}
                  value={variantQuantity}
                ></input>
              </div>
            </div>
            <div className="row">
              <button onClick={() => navigate(-1)}>Back to shop</button>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button className=" d-flex justify-content-center me-sm-4 col-12 col-lg-12" onClick={AddVariantToCart}>
                Add To Cart
              </button>
            </div>
            <div className="text-center mt-3">Total Cost: ${totalCost.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
