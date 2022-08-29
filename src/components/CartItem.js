import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// import CartContext from "../context/CartContext";
import ProductContext from "../contexts/Product";
import CartContext from "../contexts/Cart";
// import { updateCartQuantitySchema } from "../assets/schema";
// import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";

export default function CartItem() {
  const { cart, setCart, getCart, updateCartItem, deleteCartItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState();

  const { id } = useParams();

  const { context } = useContext(ProductContext);

  const [productInfo, setProductInfo] = useState({});
  const [productVariant, setProductVariant] = useState({});
  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState(0.0);

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState({
    product_name: "",
  }); 
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


  // handle delete button
  const onDelete = async (variantId) => {
    await deleteCartItem(variantId);
    setCart(cart.filter((s) => s.variant_id !== variantId));
  };
  // useEffect to set initial quantity
  useEffect(() => {
    setQuantity(quantity);
  }, [cart]);

  // handle quantity update and form
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } 
  // = useForm({
  //   resolver: yupResolver(updateCartQuantitySchema),
  // });
  const updateQuantity = (evt) => {
    setQuantity(evt.target.value);
  };
  const onUpdateQuantity = async () => {
    await updateCartItem(variant_id, quantity);
    await getCart();
  };

  // return jsx
  return (
    <div className="card rounded-3 mb-4 align-self-center">
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img src={productInfo.variants.image_url} className="img-fluid rounded-3" alt={variants.product.name} />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mb-2 mb-md-0">
            <p className="lead fw-normal mb-2">
              <Link className="text-dark" to={"/products/" + productInfo.variants.products.id}>
                {productInfo.variants.product.name}
              </Link>
            </p>
            <span className="text-muted">Size: </span>
            {productInfo.variants.size.size}
            <br />
            {/* <span className="text-muted">Color: </span>
            {variant.color.color_name}
            <br /> */}
            <span className="text-muted">Cost: </span>SGD {(productInfo.variants.cost / 100).toFixed(2)}
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 mb-2 mb-md-0">
            <form onSubmit={handleSubmit(onUpdateQuantity)} className=" d-flex">
              <input
                className={`form-control form-control-sm ${errors.quantity ? "is-invalid" : ""} me-2`}
                type="text"
                name="quantity"
                value={quantity}
                {...register("quantity", { onChange: updateQuantity })}
                style={{ maxWidth: "50px" }}
              />
              <button className="btn btn-dark btn-outline-light px-2">Update</button>
              <div className="invalid-feedback">{errors.quantity?.message}</div>
            </form>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mb-2 mb-md-0">
            <h5 className="mb-0">SGD {((variants.cost * quantity) / 100).toFixed(2)}</h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <a role="button" className="text-dark" onClick={() => onDelete(variant_id)}>
              <i className="bi bi-trash" style={{ fontSize: "1.5rem" }}></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
