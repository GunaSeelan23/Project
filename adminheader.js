import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () =>{
return(
<nav className="navbar navbar-expand-sm navbar-dark sticky-top p-3">
  <div className="container-fluid">
    <a className="navbar-brand text-primary"> <i className='fa fa-shopping-bag fa-sm'></i> Admin   </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/"> 
            <i className='fa fa-home'></i> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/manageproduct"> 
            <i className='fa fa-suitcase'></i> Manage Product
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/manageorder"> 
            <i className='fa fa-home'></i> Manage Order
          </Link>
        </li>
        <button className='logout text-danger' onClick={logout}>
        <i className='fa fa-power-off text-danger'> Logout </i>  
        </button>
      </ul>
    </div>
  </div>
  </nav>
    )
}

export default AdminHeader;

const logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/";
    //window.location.href="http://localhost:5500/#/";
    window.location.reload();
}