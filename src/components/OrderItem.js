import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import moment from "moment";

export default function OrderItem(props) {
  const { orderItem } = props;
  const [orderDateDisplay, SetOrderDateDisplay] = useState();
  useEffect(() => {
    let displayDate = new Date(orderItem.order_date);
    displayDate = moment(displayDate).format("DD MMM yyyy, HH:mma");
    SetOrderDateDisplay(displayDate);
  }, []);

  return (
    <React.Fragment>
      {/* <div className=" row overflow-auto"> 
      <table className="table table-striped table-hover">

      <thead className="table-dark">
            <tr className=" col-12">
            <th></th>
                <th>Order ID</th>
                <th>Email</th>
                <th>Shipping Address</th>
                <th>Total Cost</th>
                <th>Order Date</th>
                <th>Status</th>
                <th></th>
                <th></th>
                <th></th>


            </tr>
        </thead>

        <tbody> */}
      <tr className="col-12">
        <td>{orderItem.id}</td>
        {/* <td>{orderItem.customer.email}</td> */}
        {/* <td>{orderItem.shipping_address_line1}</td> */}
        <td>
          <img style={{ width: "100px" }} src={orderItem.orderItems[0].variant.image_url} />
        </td>
        <td>
          <div>{orderItem.orderItems.length}</div>
        </td>
        <td>${(orderItem.total_cost / 100).toFixed(2)}</td>
        <td>{orderDateDisplay}</td>
        <td>{orderItem.orderStatus.order_status}</td>
        <td>
          {/* <Link to={`./${orderItem.id}`}>
            <Button variant="dark" id="productButton">
              More Details
            </Button>
          </Link> */}
          <div className="d-flex justify-content-end">
            <a href={`/order/${orderItem.id}`} className="btn btn-dark btn-sm me-3">
              More Details
            </a>
            <a href={orderItem.receipt_url} target="_blank" className="btn btn-dark btn-sm">
              Receipt
            </a>
          </div>
        </td>
        <td></td>
        <td></td>
      </tr>

      {/* </tbody>
    </table>
    </div> */}
    </React.Fragment>
  );
}
