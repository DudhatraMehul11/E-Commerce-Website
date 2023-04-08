import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const viewproduct = (products) => {
//   return {
//     type: "ViewProduct",
//     data: products,
//   };
// };


export const addproduct = (products) => {
  toast.success("Product Added")
  const { id, name, price, file } = products.item;
  return {
    type: "AddToCart",
    data: { id, name, price, file},
  };
};


export const removeproduct = (index, products) => {
  const { id, name, price } = products;

  return {
    type: "RemoveProduct",
    index: index,
    data: { id, name, price },
  };
};

export const increaseQuantity = (products) => {
  const { id, name, price } = products;
  return {
    type: "IncreaseQuantity",
    data: { id, name, price },
  };
};
export const ResetState = () => {
  return {
    type: "ResetState",
  }
}
// --------------------------------Order Details -------------------------------
export const shippingDetails = (user) => {
    
    return {
      type: "OrderDetails",
      data:user,
    }
}

export const buyNow = (products) => {
  return{
    type:"BuyNow",
    data: products,
  }
}

export const SearchData = (search) => {
  return{
    type:"Search",
    data: search,
  }
}

export const Reset = () => {
  return {
    type: "Reset",
  }
}
