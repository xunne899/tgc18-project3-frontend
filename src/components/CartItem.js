import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProductContext from "../contexts/Product";
import CartContext from "../contexts/Cart";


import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartItem(props) {
  const { cart, setCart, getCart, updateCartItem, deleteCartItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState();

  const { cartItem } = props;
 

  useEffect(() => {
    console.log(" props.cartItem=>", cartItem);
    setQuantity(cartItem.quantity);
  }, []);

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cart]);

  // handle delete button
  const onDelete = async () => {
    await deleteCartItem(cartItem.variant.id);
    await getCart();
  };
  
  const updateQuantity = (evt) => {
    setQuantity(evt.target.value);
  };
  const onUpdateQuantity = async (event) => {
    event.preventDefault();
    console.log("Updating quantity=>", quantity);
    document.activeElement.blur();
    await updateCartItem(cartItem.variant.id, quantity);
    await getCart();

  };

  // return jsx
  return (
    <div className="card rounded-3 mb-4 align-self-center">
      <div className="card-body p-4">
        <div className="row d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img src={cartItem.variant.image_url} className="img-fluid rounded-3" alt={cartItem.variant.product.name} />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3 mb-2 mb-md-0">
            <p className="lead fw-normal mb-2">
              <Link className="text-dark" to={"/shop/" + cartItem.variant.product.id}>
                {cartItem.variant.product.name}
              </Link>
            </p>
            <span className="text-muted">Size: </span>
            {cartItem.variant.size.size}
            <br />
            <span className="text-muted">Cost: </span>S$ {(cartItem.variant.cost / 100).toFixed(2)}
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 mb-2 mb-md-0">
            <form onSubmit={onUpdateQuantity} className=" d-flex">
              <input className={`form-control form-control-sm me-2`} type="number" name="quantity" value={quantity} onChange={updateQuantity} />
              <button className="btn btn-dark btn-outline-light px-2">Update</button>
            </form>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1 mb-2 mb-md-0">
            <h5 className="mb-0">SGD {((cartItem.variant.cost * quantity) / 100).toFixed(2)}</h5>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <a role="button" className="text-dark" onClick={() => onDelete(cartItem.variant.id)}>
              <i className="bi bi-trash" style={{ fontSize: "1.5rem" }}></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
