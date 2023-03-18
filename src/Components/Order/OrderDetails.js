import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function OrderDetails(props) {

  const [product, setProduct] = useState([]);
  const [open, setopen] = useState("");
  const [vieworder, setVieworder] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [viewshipping, setViewshipping] = useState([]);


  const { totalAmount } = vieworder;
  const user = JSON.parse(localStorage.getItem("user"));
  const [user1] = user;

  useEffect(() => {
    getProductDetails();
    getShippingDetails();
  }, []);

  // const shippingDetails = useSelector((state) => state.OrderDetailsreducer);

  const getProductDetails = async () => {
    const result = await axios({
      baseURL: "http://localhost:3000/Order",
      method: "GET",
    });
    setProduct(result.data);
  };

  const getShippingDetails = async () => {
    const res = await axios({
      baseURL: "http://localhost:3000/shippingDetails",
      method: "GET",
    });
    setShipping(res.data);
  };

  const found = product.filter((item) => item.userid === user1.id);
  
  const orderHandler = (item) => {
    const viewshipping = shipping.filter((items) => items.id === item.id);
    setViewshipping(viewshipping);
    setVieworder(item);
    setopen(true);
  };

  return (
    <>
      <div>
        {found.length > 0? (
          <>
            <div className="row cart_container shadow-sm m-2">
              <h3>Order Details</h3>
              <div className="table" style={{ width: "60%" }}>
                <table class="table" style={{textAlign:"start"}}>
                  <tbody>
                    {found.map((item, i) => (
                      <tr>
                        <td>Order : #{i + 1}</td>

                        <td>
                        <tr>
                          {item.cartData.map((items) => (
                            
                            <td><img src={items.file} alt="img" width="50px" /> {items.name}  &nbsp; &nbsp;</td>
                           
                          ))}
                           </tr>
                        </td>

                        <td>
                          <Button onClick={() => orderHandler(item)}>
                            View Order
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <span>No Order Available</span>
            <br />{" "}
            <Link className="btn btn-primary" to="/">
              Continue Shopping
            </Link>
          </>
        )}
      </div>
      
      <Dialog
        onClose={() => setopen(false)}
        open={open}
        disableEscapeKeyDown={true}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {" "}
          <Typography variant="h4">Order Details</Typography>
        </DialogTitle>

        <DialogContent>
          <div>
            <span>
              <b>Shipping Details :</b>
            </span>

            {viewshipping.length > 0 ? (
                viewshipping.map((item) => (
                  <div>
                  <span>Name : {item.name}</span>
                  <br />
                  <span>Email : {item.email}</span>
                  <br />
                  <span>Mobile : {item.mobile}</span>
                  <br />
                  <span>City : {item.city}</span>
                  <br/>
                  <span>Address : {item.address}</span>
                </div>
                ))
            ) : (
              ""
            )}
          </div><br />
          <div>
            <h5>Order Details : </h5>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">quantity</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {vieworder.userid == user1.id
                  ? vieworder.cartData.map((item) => (
                      <tr>
                        <td>
                          <img src={item.file} alt="img" width="50px" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))
                  : ""}
                <tr>
                  <td>
                    <b>Total Amount :</b>
                    <span style={{color:"brown",fontWeight:"bold"}}> Rs.{totalAmount}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setopen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default OrderDetails;
