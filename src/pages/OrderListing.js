import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../contexts/User";
import OrderItem from "../components/OrderItem";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function OrderListing() {
  // state and context
  const { userInfo } = useContext(UserContext);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const baseUrl = "https://project3-spice-sauce.herokuapp.com";
  // useEffect to get orders
  useEffect(() => {
    const getOrders = async () => {
      if (userInfo.accessToken) {
        const response = await toast.promise(
          axios.get(`${baseUrl}/api/orders`, {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }),
          {
            pending: "Fetching your orders",
            success: "Fetched orders",
            error: "Error fetching orders. Please try again later.",
          },
          {
            toastId: "fetchOrders",
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
        console.log("Orders Response=>", response);
        response.data.pendingOrder.sort((a, b) => {
          const date1 = new Date(a.order_date);
          const date2 = new Date(b.order_date);
          if (date1 < date2) {
            return 1;
          } else {
            return -1;
          }
        });
        response.data.completedOrder.sort((a, b) => {
          const date1 = new Date(a.order_date);
          const date2 = new Date(b.order_date);
          if (date1 < date2) {
            return 1;
          } else {
            return -1;
          }
        });
        setPendingOrders(response.data.pendingOrder);
        setCompletedOrders(response.data.completedOrder);
      }
    };
    getOrders();
  }, [userInfo.accessToken]);
  // return jsx
  return !userInfo.accessToken ? (
    <div className="container content-container my-4">
      <div className="p-4 rounded-3 shadow-lg border border-dark">
        <h5>Please login to access your orders</h5>
      </div>
    </div>
  ) : (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="container content-container flex-column">
          <div className="h-100 rounded-3 border border-dark shadow mb-5 auto-margin-leftright" style={{ width: "90%" }}>
            <div className="h-100 p-4">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-12">
                  <div className="row justify-content-between">
                    <h3 className="mb-3 col">Pending Order(s)</h3>
                    <div className="mb-0 col text-end">
                      Need help?
                      <span>
                        <Link to="/contact" style={{marginLeft:"5px"}} className="text-dark">
                          {"Contact us!"}
                        </Link>
                      </span>
                    </div>
                  </div>

                  {pendingOrders.length === 0 ? (
                    <div>No pending orders</div>
                  ) : (
                    <div className=" row overflow-auto">
                      <table class="table table-striped table-hover">
                        <thead class="table-dark">
                          <tr class=" col-12">
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Item(s)</th>
                            {/* <th>Email</th> */}
                            {/* <th>Shipping Address</th> */}
                            <th>Total Cost</th>
                            <th>Order Date</th>
                            {/* <th>Payment Intent</th> */}
                            <th>Status</th>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {pendingOrders.map((orderItem, i) => (
                            <React.Fragment key={i}>
                              <OrderItem orderItem={orderItem} />
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="h-100 rounded-3 border border-dark shadow auto-margin-leftright" style={{ width: "90%" }}>
            <div className="h-100 p-4">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-12">
                  <h3 className="mb-3">Completed Order(s)</h3>
                  {completedOrders.length === 0 ? (
                    <div>No completed orders</div>
                  ) : (
                    <div className=" row overflow-auto">
                      <table class="table table-striped table-hover">
                        <thead class="table-dark">
                          <tr class=" col-12">
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Item(s)</th>
                            {/* <th>Email</th>
                            <th>Shipping Address</th> */}
                            <th>Total Cost</th>
                            <th>Order Date</th>
                            {/* <th>Payment Intent</th> */}
                            <th>Status</th>
                            <th></th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>

                        <tbody>
                          {completedOrders.map((orderItem, i) => (
                            <React.Fragment key={i}>
                              <OrderItem orderItem={orderItem} />
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
