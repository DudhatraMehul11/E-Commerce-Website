import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addproduct, buyNow } from "../../Actions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";


function MostRatedProduct(props) {

  const [product, setProduct] = useState([]);
  const [open, setopen] = useState("");
  const [view, setView] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await axios({
      baseURL: "http://localhost:3000/Product",
      method: "GET",
    });
    setProduct(res.data);
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

  return (
    <div className="main">
      <h3>Product List</h3>
      <div className="product_container">
        <div className="items">
          {product.map((item) =>
            
              <div className="item shadow-sm">
                <div onClick={() => viewproductHandler (item)}>
                  <img src={item.file} alt="img" />
                </div>
                <div className="item_disc">
                <span>
                  <b>{item.name}</b> 
                </span>
                <span>
                  <b>Rs. {item.price}</b> 
                </span>
                </div>
                <div style={{display:"flex", justifyContent:"start"}}>
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
                  onClick={() => dispatch(addproduct({ item }))}
                >
                  Add To Cart
                </button>
              </div>
          )}
        </div>
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
                <table className="table">
                  <tbody>
                    {" "}
                    <tr>
                      <td>
                        <span>
                          {/* <img src={view.file} alt="img" width="200px" /> */}
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: "Wristwatch by Ted Baker London",
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
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              style={{ hover: { color: "white" } }}
                            >
                              Black
                            </button>{" "}
                            &nbsp; &nbsp;
                            <button
                              type="button"
                              class="btn btn-outline-dark"
                              style={{ hover: { color: "white" } }}
                            >
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
      <div>
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
    </div>
    
  );
}

export default MostRatedProduct;
