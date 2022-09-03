import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../contexts/User";
// import OrderItem from "../components/OrderItem";
import { toast } from "react-toastify";
import moment from "moment";

export default function OrdersDetails() {
  const { userInfo } = useContext(UserContext);
  const [orderDetail, setOrderDetail] = useState();
  const [orderItems, setOrderItems] = useState();
  const [orderDateDisplay, SetOrderDateDisplay] = useState();
  const { id } = useParams();
  const baseUrl = "https://project3-spice-sauce.herokuapp.com";
  const navigate = useNavigate();
  useEffect(() => {
    console.log("OrdersDetail=>", userInfo.accessToken);
    const getOrderDetail = async () => {
      if (userInfo.accessToken) {
        const response = await toast.promise(
          axios.get(`${baseUrl}/api/orders/${id}`, {
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

        console.log("Order detail Response=>", response);
        if (response.status == 200) {
          setOrderDetail(response.data.order);
          setOrderItems(response.data.orderItems);
          let displayDate = new Date(response.data.order.order_date);
          displayDate = moment(displayDate).format("DD MMM yyyy, HH:mma");
          SetOrderDateDisplay(displayDate);
        } else {
          navigate("/order");
        }
      }
    };
    getOrderDetail();
  }, [userInfo.accessToken]);
  return (
    <Fragment>
      <div className="container-fluid py-4 d-flex" style={{ backgroundSize: "cover" }}>
        <div className="container content-container d-flex justify-content-center" style={{ marginTop: "5vh" }}>
          <div className="h-100 rounded-3 shadow-lg border border-dark" style={{ width: "90%", marginBottom: "90px" }}>
            <div className="h-100 p-4 ">
              {orderDetail && (
                <div className="row d-flex justify-content-center h-100">
                  {/* <div className="col-12"></div> */}
                  {/* {orderDetail && <OrderItem orderItem={orderDetail} />} */}

                  <div className="d-flex justify-content-between my-auto">
                    <h3>Order Details</h3>

                    <a
                      className="btn btn-dark btn-sm d-flex justify-content-center"
                      href={orderDetail.receipt_url}
                      target="_blank"
                      style={{ width: "70px", height: "30px" }}
                    >
                      Receipt
                    </a>
                  </div>
                  <div className="d-flex justify-content-between my-auto">
                    <h5>Delivery Address</h5>
                    <div>
                      {orderDetail.shipping_address_line1 + ", "}
                      {orderDetail.shipping_address_line2 != "" && orderDetail.shipping_address_line2 + ", "}
                      {orderDetail.shipping_address_country + ", "}
                      {orderDetail.shipping_address_postal}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-auto">
                    <h5>Shipping Method</h5>
                    <div>{orderDetail.shipping_option} </div>
                  </div>
                  <div className="d-flex justify-content-between my-auto">
                    <h5>Order Status</h5>

                    <div>{orderDetail.orderStatus.order_status}</div>
                  </div>
                  <div className="d-flex justify-content-between my-auto">
                    <h5>Payment Method</h5>
                    <div>{orderDetail.payment_type.toUpperCase()}</div>
                  </div>
                  <div className="d-flex justify-content-between my-auto">
                    <h5>Order ID: {orderDetail.id}</h5>
                    <div>{orderDateDisplay}</div>
                  </div>
                  {orderItems &&
                    orderItems.map((orderItem, i) => (
                      <Fragment key={`orderItem_${i}`}>
                        <div className="row overflow-auto border border-1 rounded-3 mt-2 p-3">
                          {/* <div className="col-lg-2 col-sm-12 ">
                          
                        </div> */}
                          <div className="col-lg-2 col-sm-12">
                            <img src={orderItem.variant.image_url} width="100" class="img-fluid" />
                          </div>
                          <div className="col-lg-4 col-sm-12 ">
                            <div>Name:{orderItem.variant.product.name}</div>
                            <div>Spiciness:{orderItem.variant.spiciness.spiciness}</div>
                            <div>Size:{orderItem.variant.size.size}</div>
                            <div>Cost:${(orderItem.variant.cost / 100).toFixed(2)}</div>
                          </div>
                          <div className="col-lg-2 col-sm-12 ">
                            <div>Quantity:{orderItem.quantity}</div>
                          </div>

                          <div className="col-lg-2 ms-auto text-right col-sm-12 ">{<div>${((orderItem.variant.cost * orderItem.quantity) / 100).toFixed(2)}</div>}</div>
                        </div>
                      </Fragment>
                    ))}
                    <div className="d-flex justify-content-between mt-2">
                    <a className="btn btn-dark btn-sm  d-flex align-items-center" style={{width:"85px"}} onClick={()=>navigate(-1)}>Back</a>
                  {<h4 >Total ${(orderDetail.total_cost / 100).toFixed(2)}</h4>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
