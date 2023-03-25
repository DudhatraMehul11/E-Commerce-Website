import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const result = await axios({
      baseURL: "http://localhost:3000/Users2",
      method: "GET",
    });
    setUser(result.data);
  };

  const navigate = useNavigate();

  const loginHandler = () => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!email) {
      toast.warn("Please Enter Email");
    } else if (!pattern.test(email)) {
      toast.warn("Please Enter Valid Email");
    } else if (!pass) {
      toast.warn("Please Enter Password");
    } else if (!password.test(pass)) {
      toast.warn("Please Enter Valid Password");
    } else {
      const search = users.filter((item) => item.email.includes(email));
      if (search.length > 0) {
        search.map((item) => {
          if (item.email == email && item.pass == pass) {
            localStorage.setItem("user", JSON.stringify(search));
            navigate("/");
          } else {
            toast.warn("Please Enter Valid Email & Password");
          }
        });
      }
      // localStorage.setItem("user", JSON.stringify(users));
      // navigate("/");
    }
  };

  // const user = localStorage.getItem("user");

  // if (user) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div
        className="row shadow-sm mt-5"
        style={{
          width: "600px",
          backgroundColor: "rgb(240, 242, 245)",
          borderRadius: "2%",
          padding:"10px"
        }}
      >
         <div className="col-sm-6 offset-sm-3">
         <img src="assets/Images/person-circle-outline.svg" style={{width:"100px"}} />
       
        </div>
        <h5>Login</h5>
     
        <div className="col-sm-6 offset-sm-3">
          <input
            type="text"
            className="form-control m-3"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-sm-6 offset-sm-3">
          <input
            type="password"
            className="form-control m-3"
            placeholder="Enter Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <div className="col-sm-6 offset-sm-3">
          <button className="btn btn-primary m-3" onClick={loginHandler}>
            Login
          </button>
        </div>

        {/* Same as */}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
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

export default Login;
