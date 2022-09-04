import { Fragment, useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductContext from "../contexts/Product";
import CartContext from "../contexts/Cart";

export default function ProductDetails(props) {

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
  
  return (
    <Fragment>
      <div className="container d-flex align-items-center justify-content-center  my-5">
        <div className="row centerContainer">
          <img className="col rounded-3 DetailImg" src={product.image_url} style={{ width: "100%", maxWidth:"600px" }} />
          <div className="row d-flex justify-content-center col rounded-2 m-1" style={{ width: "100%", maxWidth:"600px" }} >
            <h3 className="text-left mt-1">{product.name}</h3>
            <div>
              {" "}
              <strong> ${(productVariant.cost / 100).toFixed(2)}</strong>
            </div>
            <div>Type: {product.type && product.type.type}</div>
            <div>Country: {product.country && product.country.country}</div>
            <div>
              Ingredients:<span> {product.ingredients && product.ingredients.map((p, i) => <span key={`ingredient_${i}`}>{p.ingredient}</span>)}</span>
            </div>
            <div>
              Cuisine: {product.cuisine_styles && product.cuisine_styles.map((p, i) => <span key={`cuisine_${i}`}>{p.cuisine_style} </span>)}
            </div>
            <div>Shelf Life(Year): {product.shelf_life && product.shelf_life}</div>
            <div>Halal: {product.halal && product.halal}</div>
            <div>Vegan: {product.vegan && product.vegan}</div>
            <div>Packaging: {product.packaging && product.packaging.packaging}</div>
            <div className="mt-1 mb-1">{product.description && product.description}</div>
            <div className="mt-3 mb-3">
              <div className="row">
                <div className="col">
                  <div>Size</div>
                  <select
                    className="rounded-2 border-2 text-center"
                    id="variant_select"
                    style={{ fontSize: "13px", height: "32px", width: "100%" }}
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
                <div className="col">
                  <div>Quantity</div>
                  <input
                    className="rounded-2 border-1 text-center"
                    min="1"
                    type="number"
                    name="itemQuantity"
                    onChange={updateProductItemFormField}
                    style={{ fontSize: "13px", height: "32px", width: "100%" }}
                    value={variantQuantity}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row">
              <button
              className=" d-flex justify-content-center align-items-center mt-2 me-sm-4 me-md-4 col-12 col-lg-12 btn btn-dark"
              onClick={() => navigate(-1)}>Back To Shop</button>
              <button
                className=" d-flex justify-content-center align-items-center mt-1 me-sm-4 me-md-4 col-12 col-lg-12 btn btn-dark"
                onClick={AddVariantToCart}>
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
