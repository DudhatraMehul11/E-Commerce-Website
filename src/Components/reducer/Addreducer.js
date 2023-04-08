import { act } from "react-dom/test-utils";

const initialstate = {
  cartData: [],
  quantity: 0,
  amount: 0,
  totalAmount: 0,
  search :"",
};

const Addreducer = (state = initialstate, action) => {
  // if(action.type == "ViewProduct"){
  //   return({
  //     ...action.data,
  //     quantity: 1,
  //     amount: parseInt(action.data.price),
  //   })
  // }

  if (action.type == "AddToCart") {
    const itemindex = state.cartData.find(
      (items) => items.id === action.data.id
    );

    if (itemindex) {
      itemindex.quantity += 1;
      const price = parseInt(action.data.price);
      itemindex.amount = itemindex.quantity * price;
    } else {
      state.cartData.push({
        ...action.data,
        quantity: 1,
        amount: parseInt(action.data.price),
      });
    }
    const SubTotal = state.cartData.reduce(
      (intiialvalue, curEle) => intiialvalue + curEle.price * curEle.quantity,
      0
    );
    return { ...state, totalAmount: SubTotal };

  } else if (action.type == "RemoveProduct") {
    const itemindex = state.cartData.find(
      (items) => items.id === action.data.id
    );
    if (itemindex.quantity > 1) {
      itemindex.quantity -= 1;
      const price = parseInt(action.data.price);
      itemindex.amount = itemindex.quantity * price;
    } else {
      const copy = [...state.cartData];
      copy.splice(action.index, 1);
      [...state.cartData] = copy;
    }
    const SubTotal = state.cartData.reduce(
      (intiialvalue, curEle) => intiialvalue + curEle.price * curEle.quantity,
      0
    );
    return { ...state, totalAmount: SubTotal };

  } else if (action.type == "IncreaseQuantity") {
    const itemindex = state.cartData.find(
      (items) => items.id === action.data.id
    );
    if (itemindex) {
      itemindex.quantity += 1;
      const price = parseInt(action.data.price);
      itemindex.amount = itemindex.quantity * price;
    }
    const SubTotal = state.cartData.reduce(
      (intiialvalue, curEle) => intiialvalue + curEle.price * curEle.quantity,
      0
    );
    return { ...state, totalAmount: SubTotal };
  }else if(action.type == "ResetState")
  {
    return {cartData: []}
  }else if(action.type == "Search"){
    return{...state,search:action.data}
  }
   else {
    return state;
  }
};

export default Addreducer;

