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

  const [checkoutResponse, setCheckoutResponse] = useState({});
  const [pageIsLoaded, setPageIsLoaded] = useState(true);
  const baseUrl = "https://project3-spice-sauce.herokuapp.com";
  // useEffect to get cart items on componenet did mount
  useEffect(() => {
    getCart();
  }, [userInfo.accessToken]);

  useEffect(() => {
    const stripeCheckout = async () => {
      const stripePromise = loadStripe(checkoutResponse.publishableKey);
      const stripe = await toast.promise(
        stripePromise,
        {
          pending: "Checking out cart",
          success: "Redirecting to Stripe",
          error: "Error checking out cart. Please try again later.",
        },
        { position: toast.POSITION.BOTTOM_RIGHT }
      );
      stripe.redirectToCheckout({ sessionId: checkoutResponse.sessionId });
    };
    if (Object.keys(checkoutResponse).length !== 0) {
      console.log("Backend Checkout Response=>", checkoutResponse);
      stripeCheckout();
    }
  }, [checkoutResponse]);

  //context functions
  const getCart = async () => {
    setPageIsLoaded(true);
    if (userInfo.accessToken) {
      try {
        const response = await axios.get(`${baseUrl}/api/carts`, {
          headers: {
            Authorization: `Bearer ${userInfo.accessToken}`,
          },
        });

        if (response.data && response.data.cartItems) {
          if (response.data.cartItems.length > 1) {
            response.data.cartItems.sort((a, b) => {
              const id1 = a.variant.id;
              const id2 = b.variant.id;
              if (id1 > id2) {
                return 1;
              } else {
                return -1;
              }
            });
          }
          console.log("cart sorted=>", response.data.cartItems);
          setCart(response.data.cartItems);
        } else {
          setCart([]);
        }
        setPageIsLoaded(false);
      } catch {
        toast.error("Unable to connect to server. Please try again later.", {
          position: "bottom-right",
          autoClose: 3500,
          toastId: "getCartError",
        });
        setPageIsLoaded(false);
      }
    } else {
      setCart([]);
    }
    setPageIsLoaded(false);
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
          },
          { position: toast.POSITION.BOTTOM_RIGHT }
        );
        await getCart();

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
            `${baseUrl}/api/carts/${variantId}/update`,
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
          },
          { position: toast.POSITION.BOTTOM_RIGHT }
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
          },
          { position: toast.POSITION.BOTTOM_RIGHT }
        );
      } catch {
        toast.error("Unable to connect to server. Please try again later.", {
          toastId: "deleteCartError",
          position: "bottom-right",
        });
      }
    }
  };

  const onCheckOutCart = async () => {
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
          position: "bottom-right",
        });
      }
    } else if (userInfo && userInfo.accessToken && cart.length === 0) {
      toast.error("Add something into your cart before checkout", {
        toastId: "noItemError",
        position: "bottom-right",
      });
    } else {
      toast.error("Please login to checkout", {
        toastId: "checkoutError",
        position: "bottom-right",
      });
      navigate("/login");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        checkoutResponse,
        pageIsLoaded,
        setPageIsLoaded,
        getCart,
        addToCart,
        updateCartItem,
        deleteCartItem,
        onCheckOutCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
