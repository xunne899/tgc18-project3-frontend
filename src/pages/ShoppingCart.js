import React, { useContext } from "react";
import UserContext from "../contexts/User";
import CartContext from "../contexts/Cart";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { cart, onCheckOutCart } = useContext(CartContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const onCheckoutSubmit = () => {
    onCheckOutCart();
  };

  return !userInfo.accessToken ? (
    <React.Fragment>
      <h1 className="text-center mt-2">Your Cart</h1>
      <div className="container content-container my-4">
        <div className="p-4 rounded-3 shadow-lg border border-dark">
          <h5>Please login to access the cart</h5>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="container-fluid py-4 d-flex shopBox">
        <div className="container content-container d-flex justify-content-center align-items-center">
          <div className="h-100 w-100 rounded-3 shadow-lg border border-dark">
            <div className="h-100 p-4 ">
              <div className="row d-flex justify-content-center h-100">
                <div className="col-12">
                  <h3 className="mb-3">Shopping Cart</h3>
                  {cart.length === 0 ? (
                    <div className="card rounded-3 mb-4 align-self-center">
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="mb-3">No items in cart</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    cart.map((eachItem, i) => (
                      <React.Fragment key={`cartItem_${i}`}>
                        <CartItem cartItem={eachItem} />
                      </React.Fragment>
                    ))
                  )}
                  <div className="d-flex justify-content-end">
                    <div className="custom-btn-group">
                      <button className="btn btn-dark btn-outline-light" style={{ width: "110px" }} onClick={() => navigate("/shop")}>
                        Continue
                        <div>Shopping</div>
                      </button>
                      <button className="btn btn-dark btn-outline-light ms-lg-2" onClick={onCheckoutSubmit}>
                        Checkout
                        <div>
                          Total($): {cart?.reduce((totalPrice, eachItem) => totalPrice + eachItem.quantity * (eachItem.variant.cost / 100), 0).toFixed(2)}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}



