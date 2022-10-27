import React,{useState, useEffect} from "react";
import AdminHeader from "./adminheader";

const Dashboard = () => {

    const [product,updateProduct] = useState([]);
    const [order,updateOrder] = useState([]);

    const getProduct = () =>{
        fetch("http://localhost:1234/productlist")
        .then(response=>response.json())
        .then(serverResponse=>{
            if(serverResponse.length >0){
                updateProduct(serverResponse);
            }
        })
    }

    const getOrder = () =>{
        fetch("http://localhost:1234/orderlist")
        .then(response=>response.json())
        .then(serverResponse=>{
            if(serverResponse.length >0){
                updateOrder(serverResponse);
            }
        })
    }

    useEffect(()=>{
        getProduct();
        getOrder();
    },[1])

   

    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
               <div className='row'>
                <div className='col-lg-12 text-center'>
                <h3 className='text-success'>Admin Dashboard</h3>
                </div>
               </div>
               <div className='row mt-5 bg-light'>
                <div className='col-lg-6 text-center'>
                    <i className="fa fa-suitcase fa-3x text-info"></i>
                    <h4>Available Products <br/> {product.length}</h4>
                </div>
                <div className='col-lg-6 text-center'>
                    <i className="fa fa-shopping-bag fa-3x text-warning"></i>
                    <h4>Total Orders <br/> {order.length}</h4>
                    <p></p>
                </div>
               </div>
            </div>
        </>
    )
}


export default Dashboard;