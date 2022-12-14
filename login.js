import React, {useState} from "react";
import PublicHeader from "./header";

const Login=()=>{
    const[username,pickUsername] = useState("");
    const[password,pickPassword] = useState("");
    const[msg, updateMessage] = useState("");

    const goLogin = () =>{
        if(username =="" || password =="")
        {
            updateMessage("Enter Login Details !");
        }else{
            updateMessage("Please Wait Validating...");

            fetch("http://localhost:1234/account")
            .then(response=>response.json())
            .then(userinfo=>{
               if(userinfo[0].email == username  && userinfo[0].password==password)
               {
                 updateMessage("Success : Please Wait Redirecting...");
                 localStorage.setItem("adminid", userinfo[0].id);
                 localStorage.setItem("adminname", userinfo[0].name);
                window.location.href="http://localhost:3000/#/";
                 //window.location.href="http://localhost:5500/#/";
                 window.location.reload(); // to reload the current page
               }else{
                 updateMessage("Fail : Invalid or Not Exists !");
               }
            })
        }
    }
    return(
        <>
        <PublicHeader/>
        <div className="container">
            <div className="row ">
                <div className="col-lg-4 offset-lg-4 text-center bg-warning shadow rounded mt-5">
                    <h4 className="text-center mt-4">Login</h4>
                    <p className="text-center text-danger"> {msg} </p>

                    <label>Email-id</label>
                    <input type="text" className="form-control mb-3"
                    onChange={obj=>pickUsername(obj.target.value)}/>

                    <label>Password</label>
                    <input type="password" className="form-control mb-3"
                    onChange={obj=>pickPassword(obj.target.value)}/>

                    <div className="text-center">
                        <button className="btn btn-primary mb-3"
                        onClick={goLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}
export default Login;