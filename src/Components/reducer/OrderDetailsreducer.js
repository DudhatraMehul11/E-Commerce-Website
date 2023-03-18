

function OrderDetailsreducer(state = [], action) {
    
  if (action.type == "OrderDetails") {
    return [...state, {state: action.data}];
  }
  return state;
}

export default OrderDetailsreducer;
