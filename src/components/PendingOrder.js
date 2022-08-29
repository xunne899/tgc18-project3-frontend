import React from 'react'
import { Link } from 'react-router-dom'

export default function PendingOrderItem(props) {
    return (
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card-body p-4">
                    <div className="card shadow-0 border mb-3">
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className='col-md-2 mb-2 mb-md-0'>
                                    <span className='text-muted'>Order ID: </span><br />
                                    {props.po.order_id}
                                </div>
                                <div className='col-md-3 mb-2 mb-md-0'>
                                    <span className='text-muted'>Shipping Address: </span><br />
                                    {props.po.address.address_line_1}<br />
                                    {props.po.address.address_line_2 ? <span className="d-block">{props.po.address.address_line_2}</span> : null}
                                    {props.po.address.country} {props.po.address.postal_code}<br />
                                    {props.po.address.state ? <span className="d-block">{props.po.address.state}</span> : null}
                                    {props.po.address.city ? <span className="d-block">{props.po.address.city}</span> : null}
                                </div>
                                <div className='col-md-3 mb-2 mb-md-0'>
                                    <span className='text-muted'>Payment Ref.: </span><br />
                                    {props.po.payment_ref}
                                </div>
                                <div className='col-md-2 mb-2 mb-md-0'>
                                    <span className='text-muted'>Order Date:</span><br />
                                    {props.po.order_date.slice(0, 10)}
                                </div>
                                <div className='col-md-2 '>
                                    <span className='text-muted'>Total Cost:</span><br />
                                    {(props.po.total_cost / 100).toFixed(2)}
                                </div>
                            </div>
                            <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                            {props.po.orderItems.map((oi, i) => (
                                <React.Fragment key={i}>
                                    <div className="row my-2 justify-content-between align-items-center">
                                        <div className="col-md-2">
                                            <img src={oi.variant.product_image_url}
                                                className="img-fluid" alt="" />
                                        </div>
                                        <div className="col-md-3 mb-2 mb-md-0">
                                            <p className="mb-0">
                                                <Link className="text-dark" to={'/products/' + oi.variant.product_id}>{oi.variant.product.product_name}</Link>
                                            </p>
                                        </div>
                                        <div className="col-md-3 mb-2 mb-md-0">
                                            <span className="text-muted">Size: </span>{oi.variant.size.size_name}<br />
                                            <span className="text-muted">Color: </span>{oi.variant.color.color_name}<br />
                                            <span className="text-muted">Cost: </span>SGD {(oi.variant.product.cost / 100).toFixed(2)}
                                        </div>
                                        <div className="col-md-2 mb-2 mb-md-0">
                                            <p className="mb-0"><span className='text-muted'>Qty: </span>{oi.quantity}</p>
                                        </div>
                                        <div className="col-md-2">
                                            <p className="mb-0"><span className='text-muted'>Subtotal: </span> {(oi.variant.product.cost * oi.quantity / 100).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                            <hr className="mb-4" style={{ backgroundColor: "#e0e0e0", opacity: "1" }} />
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-md-11">
                                    <div className="progress" style={{ height: "0.5rem", borderRadius: "1rem" }}>
                                        <div className="progress-bar bg-dark" role="progressbar"
                                            style={{ borderRadius: "1rem", width: (props.po.status.status_name === "Paid" ? `5%` : `50%`) }} aria-valuenow="50"
                                            aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div className="d-flex justify-content-between mb-1">
                                        <p className="mt-1 mb-0 small">Preparing order</p>
                                        <p className="mt-1 mb-0 small">Out for delivery</p>
                                        <p className="mt-1 mb-0 small">Delivered</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}