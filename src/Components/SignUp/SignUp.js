import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp(props) {
  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    pass: "",
    mobile: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setUserdata((prestate) => ({
      ...prestate,
      [name]: value,
    }));
  };

  const setUserData = async () => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!userdata.name) {
      toast.warn("Please Enter Name");
    } else if (!userdata.email) {
      toast.warn("Please Enter Email");
    } else if (!pattern.test(userdata.email)) {
      toast.warn("Please Enter Valid Email");
    } else if (!userdata.pass) {
      toast.warn("Please Enter Password");
    }
    else if(!password.test(userdata.pass)){
      toast.warn("Please Valid Password");
    } else {
      const res = await axios({
        baseURL: "http://localhost:3000/Users2",
        method: "POST",
        data: userdata,
      });
      toast.success("Registration Success")
      setTimeout(() => {
          navigate('/login')
      },1000)
    }
  };

  return (
    <>
      <h3>SignUp</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="row"
          style={{
            borderRadius: "2%",
            margin: "10px",
          }}
        >
          <div className="col-lg-6 mb-3">
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              name="email"
              type="text"
              className="form-control "
              placeholder="Enter Email"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              name="pass"
              type="password"
              className="form-control "
              placeholder="Enter Password"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              name="mobile"
              type="text"
              className="form-control "
              placeholder="Enter Mobile"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              name="pincode"
              type="text"
              className="form-control "
              placeholder="Enter PinCode"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              name="city"
              type="text"
              className="form-control "
              placeholder="Enter City"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-6 mb-3">
            <input
              name="state"
              type="text"
              className="form-control "
              placeholder="Enter State"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-12 mb-3">
            <input
              name="address"
              type="text"
              className="form-control "
              placeholder="Enter Address"
              onChange={onChangeHandler}
            />
          </div>
          <div className="col-lg-12 mb-3">
            <button className="btn btn-primary" onClick={() => setUserData()}>
              {" "}
              Submit
            </button>
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
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
    </>
  );
}

export default SignUp;
