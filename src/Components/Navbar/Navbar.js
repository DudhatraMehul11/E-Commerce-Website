import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartlogo from "../../assets/images/download.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
  Drawer,
} from "@mui/material";
import {
  increaseQuantity,
  removeproduct,
  SubTotal,
  ResetState,
} from "../../Actions";
import axios from "axios";

function Navbar(props) {
  const [open, setopen] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const product = useSelector((state) => state.Addreducer);
  const { totalAmount } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeBox = () => {
    setopen(false);
  };

  useEffect(() => {
    product.cartData.map((item) => setopen(item.flag));
  }, [product]);

  // const setCartData = async () => {
  //   const res = await axios({
  //     baseURL: "http://localhost:3000/cart",
  //     method: "POST",
  //     data: {product, userid: uid.id}
  //   });
  // };

  const totalQuantity =product.cartData.reduce(
    (intiialvalue, curEle) => intiialvalue + curEle.quantity,
    0
  )
  console.log(totalQuantity);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(ResetState());
    navigate("/login");
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link
              to="/"
              className="navbar-brand"
              style={{ color: "firebrick" }}
            >
              E Commerce
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {user ? (
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        {" "}
                        Most Rated Products
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                  <Link className="nav-link" to="/addproduct">
                    {" "}
                    Add Product
                  </Link>
                </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/ratedproduct">
                        {" "}
                        All Products
                      </Link>
                    </li>
                  </ul>
                  <ul className="navbar-nav ">
                    <li
                      class="nav-item dropdown"
                      style={{ marginRight: "55px" }}
                    >
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="assets/Images/person-circle-outline.svg"
                          alt="logo"
                          width="30px"
                        />{" "}
                        Hello, <b>{user.map((item) => item.name)}</b>
                      </a>
                      <ul class="dropdown-menu">
                        <li>
                          <Link class="dropdown-item" to="/profile">
                            Profile
                          </Link>
                        </li>

                        <li>
                          <Link class="dropdown-item" to="/orderdetails">
                            Your Orders
                          </Link>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <a class="dropdown-item" onClick={logoutHandler}>
                            Logout
                          </a>
                        </li>
                        <li className="nav-item"></li>
                      </ul>
                    </li>
                    <Link onClick={() => setopen(true)}>
                      {" "}
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src="assets/Images/cart-outline.svg"
                        alt="cart-logo"
                      />
                    </Link>
                    <span className="cartData">{totalQuantity}
                    </span>
                  </ul>
                </>
              ) : (
                <>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                  <ul className="navbar-nav ">
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">
                        {" "}
                        SignUp
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                  <Link className="nav-link" to="/addproduct">
                    {" "}
                    Add Product
                  </Link>
                </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        {" "}
                        Login
                      </Link>
                    </li>
                  </ul>{" "}
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* <Dialog
        onClose={() => setopen(false)}
        open={open}
        disableEscapeKeyDown={true}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {" "}
          <Typography variant="h4">Cart</Typography>
        </DialogTitle>

        <DialogContent>
          {product.cartData.length > 0 ? (
            <>
              <div>
                <table className="table">
                  <tbody>
                    {" "}
                    {product.cartData.map((item, index) => (
                      <tr>
                        <td>
                          <span>
                            <img src={item.file} alt="img" width="50px" />
                          </span>
                        </td>
                        <td>
                          <span>
                            <b>Product Name :</b>
                            {item.name}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <span>
                            <b>Price:</b> Rs.{item.price}
                          </span>
                        </td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => dispatch(removeproduct(index, item))}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <span> &nbsp;&nbsp;{item.quantity}&nbsp;&nbsp; </span>
                          <button
                            className="btn btn-success"
                            onClick={() => dispatch(increaseQuantity(item))}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </td>
                        <td>
                          <b>Total :</b> {item.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          <Typography variant="h5">
            <span>SubTotal:{totalAmount} </span>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setopen(false)}>
            Close
          </Button>
          {product.cartData.length > 0 ? (
            <Link
              className="btn btn-warning m-3"
              to="/checkout"
              onClick={() => setopen(false)}
            >
              Continue Payment
            </Link>
          ) : (
            <button className="btn btn-warning" disabled>
              Continue Payment
            </button>
          )}
        </DialogActions>
      </Dialog> */}
      <Drawer
        open={open}
        onClose={() => setopen(false)}
        direction="right"
        className="bla bla bla"
        anchor="right"
      >
        <DialogTitle>
          {" "}
          <Typography variant="h4">Cart</Typography>
        </DialogTitle>

        <DialogContent>
          {product.cartData.length > 0 ? (
            <>
              <div>
                <table className="table">
                  <tbody>
                    {" "}
                    {product.cartData.map((item, index) => (
                      <tr>
                        <td>
                          <span>
                            <img src={item.file} alt="img" width="50px" />
                          </span>
                        </td>
                        <td>
                          <span>
                            <b>product Name : </b> {item.name} <br />
                            <b>Price: </b>{item.price}
                          </span>
                        </td>
                        <td> </td>
                        <td>
                          {" "}
                          <button
                            className="btn btn-danger"
                            onClick={() => dispatch(removeproduct(index, item))}
                          >
                            {" "}
                            -{" "}
                          </button>
                          <span> &nbsp;&nbsp;{item.quantity}&nbsp;&nbsp; </span>
                          <button
                            className="btn btn-success"
                            onClick={() => dispatch(increaseQuantity(item))}
                          >
                            {" "}
                            +{" "}
                          </button>
                        </td>
                        <td>
                          <b>Total :</b> {item.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : null}

          <Typography variant="h5">
            <span><b>SubTotal : </b><span style={{color:"darkred"}}> Rs.{totalAmount}</span> </span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setopen(false)}>
            Close
          </Button>
          {product.cartData.length > 0 ? (
            <Link
              className="btn btn-warning m-3"
              to="/checkout"
              onClick={() => setopen(false)}
            >
              Continue Payment
            </Link>
          ) : (
            <button className="btn btn-warning" disabled>
              Continue Payment
            </button>
          )}
        </DialogActions>
      </Drawer>
    </>
  );
}

export default Navbar;
