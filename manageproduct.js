import React, { useState, useEffect } from "react";
import AdminHeader from "./adminheader";
import axios from 'axios';
const ManageProduct = () => {

    const [product, updateProduct] = useState([]);
    const getProduct = () => {
        fetch("http://localhost:1234/productlist")
            .then(response => response.json())
            .then(serverResponse => {
                if (serverResponse.length > 0) {
                    updateProduct(serverResponse);
                }
            })

    }
    const [msg, updateMessage] = useState("");
    const Deleteproduct = (id, name) => {

        //alert(id);

        var url = "http://localhost:1234/productlist/" + id;
        axios.delete(url)
            .then(serverResponse => {

                updateMessage = name + "Product Deleted Successfully";
                getProduct();//reload the user list
                window.location.href = "http://localhost:1234/productlist/";
                window.localStorage.reload();

            })
    }


    useEffect(() => {
        getProduct();
       },[1])

    let[pname, pickName] = useState("");
    let[pprice, pickPrice] = useState("");
    let[pphoto, pickphoto] = useState("");
    let[pdetails, pickDetails] = useState("");
    
    let[errorlist, updateError] = useState("");
    const save = () =>{

        let allerror = {};
        var formStatus = true;
        if(pname==""){
            allerror['nameError'] = "Invalid Product Name !";
            formStatus = false;
        }else{
            allerror['nameError'] = "";
        }

        //validation for price
        if(pprice == "" || pprice <1){
            allerror['priceError'] = "Invalid Product Price !";
            formStatus = false;
        }else{
            allerror['priceError'] = "";
        }

            //validation for photo
            if(pphoto == ""){
                allerror['photoError'] = "Invalid Product photo !";
                formStatus = false;
            }else{
                allerror['photoError'] = "";
            }

            //validation for Details
            if(pdetails == ""){

                allerror['detailsError'] = "Invalid Product Details !";
                formStatus = false;
            }else{
                allerror['detailsError'] = "";
            }

        updateError(allerror);
        if(formStatus==true){
            //alert("Success: Data is processing to server");
            updateMessage("Please Wait Processing to Server...");
            var url= "http://localhost:1234/productlist";
            var data = {"name":pname,"price":pprice,"photo":pphoto,"details":pdetails};
            var postData = {
                method:"POST",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify(data)
            };
            fetch(url,postData)
            .then(response => response.json())
            .then(serverResponse =>{

                    updateMessage(pname+"Uploaded Successfully");
                    getProduct(); //to reload the data list
                    pickName("");
                    pickPrice("");
                    pickphoto("");
                    pickDetails("");
            })
        }
    }
    return (
        <>
            <AdminHeader />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3 text-center">
                        <h3 className='text-center text-info'>Add Product</h3>
                        <div className='mb-3'>
                            <label>Product Name</label>
                            <input type='text' className='form-control' onChange={obj=>pickName(obj.target.value)} value={pname} />
                            <i className ='text-danger'>{errorlist.nameError}</i>
                        </div>
                        <div className='mb-3'>
                            <label>Product Price</label>
                            <input type='number' className='form-control' onChange={obj=>pickPrice(obj.target.value)} value={pprice} />
                            <i className="text-danger">{errorlist.priceError}</i>
                        </div>
                        <div className='mb-3'>
                            <label>Product image</label>
                            <input type='text' className='form-control'onChange={obj=>pickphoto(obj.target.value)} value={pphoto} />
                            <i className="text-danger">{errorlist.imageError}</i>
                        </div>
                        <div className='mb-3'>
                            <label>More Details</label>
                            <textarea className='form-control' onChange={obj=>pickDetails(obj.target.value)} value={pdetails}></textarea>
                            <i className="text-danger">{errorlist.detailsError}</i>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={save}>Upload Product</button>
                        </div>
                    </div>
                    <div className="col-lg-9 text-center">
                        <p className=" text-center text-danger">{msg}</p>
                        <h3 className="text-info">Available Products: {product.length}</h3>
                        <table className=" table table-striped table-bordered table-hover mt-3 rounded">
                            <thead>
                                <tr>
                                    <th>Pid</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Details</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    product.map((pdata, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{pdata.id}</td>
                                                <td>{pdata.name}</td>
                                                <td>{pdata.price}</td>
                                                <td>{pdata.details}</td>
                                                <td><img src={pdata.image} height="50" width="70" /></td>
                                                <td>
                                                    <button className="btn btn-danger text-white" onClick={Deleteproduct.bind(this, pdata.id)}>
                                                        <i className="fa fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageProduct;