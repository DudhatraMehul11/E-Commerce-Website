import { logDOM } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { buyNow, Reset, ResetState, shippingDetails } from "../../Actions";

function Checkout(props) {
  const [check, setCheck] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Data = JSON.parse(localStorage.getItem("user"));
  const [defaultData] = Data;

  const product = useSelector((state) => state.Addreducer);
  const buyproduct = useSelector((state) => state.Buynowreducer);

  const { totalAmount, cartData } = product;
  const { id, address, email, mobile, name, city } = data;

  useEffect(() => {
    setData(defaultData);
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prestate) => ({
      ...prestate,
      [name]: value,
    }));
  };

  const checkHandler = () => {
    setCheck((check) => !check);
  };

  const submitHandler = async () => {
    const res = await axios({
      baseURL: "http://localhost:3000/shippingDetails",
      method: "POST",
      data: { address, email, mobile, name, city },
    });

    if (buyproduct.length > 0) {
      const result = await axios({
        baseURL: "http://localhost:3000/Order",
        method: "POST",
        data: { cartData: buyproduct, userid: id },
      });

      dispatch(Reset());
    } else {
      const result = await axios({
        baseURL: "http://localhost:3000/Order",
        method: "POST",
        data: { cartData, totalAmount, userid: id },
      });
      dispatch(ResetState());
    }

    toast.success("Order Successfull");
    toast.info("Redirect To Order Details Page");
    setTimeout(() => navigate("/orderdetails"), 1500);
  };

  return (
    <div>
      <div
        className="row user_container shadow-sm m-2"
        style={{ padding: "20px" }}
      >
        <h3>Shipping Details</h3>
        <div className="col-sm-12 m-3">
          <input type="checkbox" onChange={checkHandler} />
          <label>Same As Default Details</label>
        </div>
        <div className="col-sm-12" style={{ marginBottom: "20px " }}>
          <input
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter Name"
            defaultValue={check === true ? defaultData.name : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-12 mb-3">
          <input
            name="email"
            type="text"
            className="form-control"
            placeholder="Enter Email"
            defaultValue={check === true ? defaultData.email : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-12 mb-3">
          <input
            name="mobile"
            type="text"
            className="form-control"
            placeholder="Mobile"
            defaultValue={check === true ? defaultData.mobile : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-12  mb-3">
          <input
            name="pincode"
            type="text"
            className="form-control"
            placeholder="PinCode"
            defaultValue={check === true ? defaultData.pincode : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-12 mb-3">
          <input
            name="city"
            type="text"
            className="form-control"
            placeholder="City"
            defaultValue={check === true ? defaultData.city : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-12 mb-3">
          <input
            name="state"
            type="text"
            className="form-control"
            placeholder="State"
            defaultValue={check === true ? defaultData.state : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-12">
          <textarea
            name="address"
            className="form-control"
            placeholder="Enter Full Address"
            defaultValue={check === true ? defaultData.address : ""}
            onChange={(e) => changeHandler(e)}
          />
        </div>
        <div className="col-sm-11 offset-sm-5">
          {/* <Link to="/" className="btn btn-warning m-3">
            Add More Product
          </Link> */}
          <button
            className="btn btn-primary m-3"
            onClick={() => submitHandler()}
          >
            {" "}
            Place Order
          </button>
        </div>
      </div>
      {buyproduct.length > 0 ? (
        <div className="row cart_container shadow-sm m-2">
          <h3 style={{ marginTop: "30px" }}>Cart Details</h3>
          <div className="table" style={{ marginTop: "50px" }}>
            <table class="table border table-striped">
              <thead>
                <tr>
                  <th scope="col">Product Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {buyproduct.map((item) => (
                  <tr>
                    <img src={item.file} alt="Img" width="50px" />
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="row cart_container shadow-sm m-2">
          <h3 style={{ marginTop: "30px" }}>Cart Details</h3>
          <div className="table" style={{ marginTop: "50px" }}>
            <table class="table border table-striped">
              <thead>
                <tr>
                  <th scope="col">Product image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {product.cartData.map((item) => (
                  <tr>
                    <td>
                      {" "}
                      <img src={item.file} alt="img" width="50px" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <span>
              {" "}
              <b>SubTotal :</b> {totalAmount}
            </span>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Checkout;
