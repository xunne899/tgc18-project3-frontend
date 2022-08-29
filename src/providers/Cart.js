import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "../contexts/User";
import axios from "axios";
import CartContext from "../contexts/Cart";

import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

export default function CartProvider(props) {
  // import user context and useNavigate
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  // state
  const [cart, setCart] = useState([]);
  // const [selection, setSelection] = useState({ variant_id: "", quantity: "" })
  // const [tempVariant, setTempVariant] = useState({})
  const [checkoutResponse, setCheckoutResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const baseUrl = "https://project3-spice-sauce.herokuapp.com";
  // useEffect to get cart items on componenet did mount
  useEffect(() => {
    getCart();
  }, [userInfo.accessToken]);

  useEffect(() => {
    const stripeCheckout = async () => {
      const stripePromise = loadStripe(checkoutResponse.publishableKey);
      const stripe = await toast.promise(stripePromise, {
        pending: "Checking out cart",
        success: "Redirecting to Stripe",
        error: "Error checking out cart. Please try again later.",
      });
      stripe.redirectToCheckout({ sessionId: checkoutResponse.sessionId });
    };
    if (Object.keys(checkoutResponse).length !== 0) {
      stripeCheckout();
    }
  }, [checkoutResponse]);

  //context functions
  const getCart = async () => {
    setIsLoading(true);
    if (userInfo.accessToken) {
      try {
        const response = await axios.get(`${baseUrl}/api/carts`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        });
        console.log("getCart=>", response);
        setCart(response.data && response.data.cartItems ? response.data.cartItems : []);
        setIsLoading(false);
      } catch {
        toast.error("Unable to connect to server. Please try again later.", {
          position: "bottom-right",
          autoClose: 3500,
          toastId: "getCartError",
        });
        setIsLoading(false);
      }
    } else {
      setCart([]);
    }
    setIsLoading(false);
  };

  const addToCart = async (variantId, quantity) => {
    if (userInfo.accessToken) {
      try {
        await toast.promise(
          axios.post(
            `${baseUrl}/api/carts/${variantId}/add`,
            { quantity: `${quantity}` },
            {
              headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
              },
            }
          ),
          {
            pending: "Adding to cart",
            success: "Successfully added to cart.",
            position: "bottom-right",
          }
        );
        await getCart();
        // setTempVariant({
        //     ...tempVariant,
        //     stock: tempVariant.stock - selection.quantity
        // })
      } catch (err) {
        if (err.response.status === 403) {
          toast.error("Quantity exceeds stock available", {
            toastId: "addToCartError",
            position: "bottom-right",
          });
        } else {
          toast.error("Unable to connect to server. Please try again later.", {
            toastId: "addToCartError",
            position: "bottom-right",
          });
        }
      }
    } else if (!userInfo || !userInfo.accessToken) {
      toast.error("Please login to add to cart", {
        toastId: "addToCartError",
        position: "bottom-right",
      });
    }
  };

  const updateCartItem = async (variantId, newQuantity) => {
    if (userInfo.accessToken) {
      try {
        await toast.promise(
          axios.put(
            `${baseUrl}/api/carts/${variantId}/quantity/update`,
            { newQuantity: newQuantity },
            {
              headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
              },
            }
          ),
          {
            pending: "Updating cart item quantity",
            success: "Successfully updated cart item quantity.",
            position: "bottom-right",
          }
        );
      } catch (err) {
        if (err.response.status === 403) {
          toast.error("Quantity exceeds stock available", {
            toastId: "updateCartError",
            position: "bottom-right",
          });
        } else {
          toast.error("Unable to connect to server. Please try again later.", {
            toastId: "updateCartError",
            position: "bottom-right",
          });
        }
      }
    }
  };

  const deleteCartItem = async (variantId) => {
    if (userInfo.accessToken) {
      try {
        await toast.promise(
          axios.delete(`${baseUrl}/api/carts/${variantId}/delete`, {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }),
          {
            pending: "Deleting cart item",
            success: "Successfully deleted cart item.",
            position: "bottom-right",
          }
        );
      } catch {
        toast.error("Unable to connect to server. Please try again later.", {
          toastId: "deleteCartError",
          position: "bottom-right",
        });
      }
    }
  };

  const checkout = async () => {
    if (userInfo.accessToken && cart.length !== 0) {
      try {
        const response = await axios.get(`${baseUrl}/api/checkout`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        });
        setCheckoutResponse(response.data);
      } catch (err) {
        toast.error("Unable to checkout now. Please refresh and try again.", {
          toastId: "checkoutError",
        });
      }
    } else if (userInfo && userInfo.accessToken && cart.length === 0) {
      toast.error("Add something into your cart before checkout", {
        toastId: "noItemError",
      });
    } else {
      toast.error("Please login to checkout", {
        toastId: "checkoutError",
      });
      navigate("/users/login-register");
    }
  };
  // return cart provider
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        checkoutResponse,
        isLoading,
        setIsLoading,
        getCart,
        addToCart,
        updateCartItem,
        deleteCartItem,
        checkout,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
