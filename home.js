import React, { useState, useEffect } from "react";
import PublicHeader from "./header";

const Myhome = () => {
    const [product, updateProduct] = useState([]);
    const getProduct = () => {
        fetch("http://localhost:1234/productlist")
            .then(response => response.json())
            .then(allproduct => {
                if (allproduct.length > 0) {
                    updateProduct(allproduct.reverse());
                }
            })
    }

    useEffect(() => {
        getProduct();
    }, [true]);

    const[msg, updateMessage] = useState("");
    const AddtoCart = (productinfo) =>{
        const postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productinfo)
        };
        var url = "http://localhost:1234/cart";
        fetch(url, postData)
        .then(response=> response.json())
        .then(serverResponse=>{
            updateMessage(serverResponse.name + " Added In Cart...");
        })
    }

    return (
        <>
            <PublicHeader />
            <section className="bg-light p-5">
                <div className="bg-white container">
                <p className="text-center text-danger">{msg}</p>
                </div>
                <div className="container">
                    <div className="row">
                        {
                            product.map((pdata, index) => {
                                return (
                                    <div className="col-lg-3 mb-5" key={index}>
                                        <div className="bg-white rounded p-3 shadow text-center">
                                            <h4 className="textname">{pdata.name}</h4>
                                            <img src={pdata.image} height="150" width="70%" />
                                            <p className="textdetails">{pdata.details}</p>
                                            <p className="textprice">Rs.{pdata.price}/-</p>
                                            <div className="text-center">
                                                <button className="btn btn-danger btn-sm"
                                                onClick={AddtoCart.bind(this, pdata)}>
                                                 Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Myhome;