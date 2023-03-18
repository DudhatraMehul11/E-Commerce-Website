import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addproduct,
  buyNow,
  increaseQuantity,
  removeproduct,
  Reset,
  viewproduct,
} from "../../Actions";
import mobileimg from "../../assets/images/Apple-iPhone-11-PNG-Clipart.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
  Slider,
} from "@mui/material";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import InputRange from "react-input-range";

function ProductList(props) {
  const [data, setData] = useState([]);
  const [open, setopen] = useState("");
  const [view, setView] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState(5000);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  const product = useSelector((state) => state.Addreducer);
  const { totalAmount } = product;

  useEffect(() => {
    getProduct();
    dispatch(Reset());
  }, []);

  const getProduct = async () => {
    const res = await axios({
      baseURL: "http://localhost:3000/Product",
      method: "GET",
    });
    const data = await res.data;
    setData(data);
  };

  const viewproductHandler = (item) => {
    // dispatch(viewproduct(item))
    setView(item);
    setopen(true);
  };

  const buyNowHandler = (item) => {
    dispatch(buyNow(item));
    navigate("/checkout");
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const addTOCartHandler = (item) => {
    dispatch(addproduct({ item, flag: true }));

  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="main">
      <h3>Popular Product</h3>
      <div className="filter" style={{ width: "120px", float: "left" }}>
        <h4>Filters :</h4>
        <div
          class="form-group"
          style={{ textAlign: "start" }}
        >
          <label for="exampleFormControlSelect1">Rating : &nbsp;</label>
          <select
            class="form-control-sm "
            id="exampleFormControlSelect1"
            onChange={(e) => setRating(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div
          style={{ textAlign: "start", marginTop: "20px" }}
        >
          Price Range :
          <input
            type="range"
            className="form-control-xl"
            min={2000}
            max={30000}
            onInput={handlePrice}
          />
          Rs. 2000 - Rs. {price}
        </div>
      </div>
      <div
        className="product_container"
        style={{ width: "80%", float: "right" }}
      >
        <div className="items">
          {data.map((item) =>
            item.rating >= rating && price >= parseInt(item.price) ? (
              <div className="item shadow-sm">
                <div onClick={() => viewproductHandler(item)}>
                  <img src={item.file} alt="img" />
                </div>
                <div className="item_disc">
                  <span>
                    <b>{item.name}</b>
                  </span>
                  <span>
                    <b style={{ color: "brown" }}>Rs. {item.price}</b>
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <span>Mobile Device</span>
                </div>

                <br />
                {/* <button
                  className="btn btn-success m-2"
                  onClick={() => viewproductHandler(item)}
                >
                  View Product
                </button> */}
                <button
                  className="btn btn-warning"
                  onClick={() => addTOCartHandler(item)}
                >
                  Add To Cart
                </button>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <Dialog
          onClose={() => setopen(false)}
          open={open}
          disableEscapeKeyDown={true}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>
            {" "}
            <Typography variant="h4">Product Detail</Typography>
          </DialogTitle>

          <DialogContent>
            <>
              <div>
                <table className="table ">
                  <tbody>
                    {" "}
                    <tr>
                      <td>
                        <span>
                          {/* <img src={view.file} alt="img" width="200px" /> */}
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "MobileImg",
                                isFluidWidth: true,
                                src: view.file,
                                width: 400,
                                height: 400,
                              },
                              largeImage: {
                                src: view.file,
                                width: 1200,
                                height: 1800,
                              },
                              isHintEnabled: true,
                              shouldHideHintAfterFirstActivation: false,
                            }}
                          />
                        </span>
                      </td>
                      <td>
                        <div>
                          <h3>{view.name}</h3>
                        </div>
                        <div>
                          <h3>
                            MRP :{" "}
                            <span style={{ color: "brown" }}>
                              Rs.{view.price}
                            </span>
                          </h3>
                          <span style={{ color: "rgb(150, 148, 148)" }}>
                            incl. of taxes (Also includes all applicable duties)
                          </span>
                          <br />
                          <br />
                        </div>
                        <div>
                          <span>
                            Reviews (100)
                            <ReactStars
                              count={5}
                              value={view.rating}
                              size={24}
                              activeColor="#ffd700"
                            />
                          </span>{" "}
                        </div>
                        <br />
                        <div>
                          <span>
                            <b>Select Color : &nbsp;</b>{" "}
                            <button className="btn btn-outline-dark">
                              Black
                            </button>{" "}
                            &nbsp; &nbsp;
                            <button className="btn btn-outline-dark">
                              White
                            </button>
                          </span>
                        </div>
                        <br />
                        <div>
                          <span>
                            <b>Select Option : &nbsp;</b>{" "}
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              style={{
                                hover: { color: "white" },
                                fontWeight: "bold",
                              }}
                            >
                              4 GB/64 GB
                            </button>{" "}
                            &nbsp; &nbsp;
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              style={{
                                hover: { color: "white" },
                                fontWeight: "bold",
                              }}
                            >
                              8 GB/128 GB
                            </button>
                          </span>
                        </div>
                        <br />
                        <div>
                          <span>
                            <h5>Product Discription :</h5>
                            {view.disc}
                          </span>
                        </div>
                        <br />

                        <div>
                          {" "}
                          <span>
                            <button
                              className="btn btn-primary"
                              onClick={() => buyNowHandler(view)}
                            >
                              Buy Now
                            </button>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" onClick={() => setopen(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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

export default ProductList;
