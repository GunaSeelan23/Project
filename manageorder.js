import React, { useState, useEffect } from "react";
import AdminHeader from "./adminheader";

const ManageOrder = () => {
    const [order, updateOrder] = useState([]);
    const getOrder = () => {
        fetch("http://localhost:1234/orderlist")
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.length > 0) {
                    updateOrder(serverResponse.reverse());
                }
            })
    }

    useEffect(() => {
        getOrder();
    }, [1]);


    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h3 className="text-info"> Recent Orders : {order.length} </h3>
                    </div>
                </div>
                {
                    order.map((orderData, index) => {
                        return (
                            <div className="row mb-4 p-3 shadow rounded" key={index}>
                                <div className="col-lg-4">
                                    <p> {orderData.customername} </p>
                                    <p> {orderData.mobile} </p>
                                    <p> {orderData.email} </p>
                                    <p> {orderData.address} </p>
                                </div>
                                <div className="col-lg-8 text-center">
                                    <p className="text-center text-danger"> Ordered Items - {orderData.myorder.length}  </p>
                                    <table className="table table-striped table-bordered table-hover rounded">
                                        <thead>
                                            <tr>
                                                <th>Pid</th>
                                                <th>Item Name</th>
                                                <th>Details</th>
                                                <th>Price</th>
                                                <th>Photo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orderData.myorder.map((product, index2) => {
                                                    return (
                                                        <tr key={index2}>
                                                            <td> {product.id} </td>
                                                            <td> {product.name} </td>
                                                            <td> {product.details} </td>
                                                            <td> {product.price} </td>
                                                            <td>
                                                                <img src={product.image} height="50" width="70" />
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ManageOrder;