import React from "react";
import { Navigate } from "react-router-dom";

function AddProduct(props) {
    const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1>Add Product</h1>
    </div>
  );
}

export default AddProduct;
