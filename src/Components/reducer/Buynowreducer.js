import React from "react";

const Buynowreducer = (state = [], action) => {
  if (action.type == "BuyNow") {
    state.push({
      ...action.data,
      quantity: 1,
      amount: parseInt(action.data.price),
    });
  }
  else if(action.type == "Reset"){
      state = [];
  }
  return state;
};

export default Buynowreducer;
