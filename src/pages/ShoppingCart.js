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

// import React, { useContext } from "react";
// import CartContext from "../context/CartContext";
// import UserContext from "../context/UserContext"
// import CartItem from "../components/CartItem"
// import "../assets/styles/form.css"

// export default function Cart() {
//     const { cart, checkout } = useContext(CartContext)
//     const { token } = useContext(UserContext)

//     const onCheckoutSubmit = () => {
//         checkout()
//     }

//     return (!token ? (
//         <div className="container content-container my-4">
//             <div className="p-4 rounded-3 shadow-lg border border-dark">
//                 <h5>Please login to access the cart</h5>
//             </div>
//         </div>
//     ) : (
//         <React.Fragment>
//             <div className="container-fluid py-4">
//                 <div className="container content-container">
//                     <div className="h-100 rounded-3 shadow-lg border border-dark" style={{ width: "90%" }}>
//                         <div className="h-100 p-4">
//                             <div className="row d-flex justify-content-center align-items-center h-100">
//                                 <div className="col-12">
//                                     <h3 className="mb-3">Shopping Cart</h3>
//                                     {cart.length === 0 ?
//                                         <div>No items in cart</div> :
//                                         cart?.map((c, i) =>
//                                             <React.Fragment key={i}>
//                                                 <CartItem c={c} />
//                                             </React.Fragment>
//                                         )}
//                                     <div className="d-flex justify-content-end me-3">
//                                         <h4>Total: {(cart?.reduce((sum, cartItem) => sum + (cartItem.quantity * (cartItem.variant.product.cost / 100)), 0)).toFixed(2)}</h4>
//                                     </div>
//                                     <div className="custom-btn-group me-3">
//                                         <button className="btn btn-dark btn-outline-light" onClick={onCheckoutSubmit}>Checkout</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     )
//     )
// }
