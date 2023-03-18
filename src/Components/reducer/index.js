import { combineReducers } from "redux";
import Addreducer from "./Addreducer";
import OrderDetailsreducer from "./OrderDetailsreducer";
import Buynowreducer from "./Buynowreducer";
const rootreducer = combineReducers({
   Addreducer,
   OrderDetailsreducer,
   Buynowreducer,
});

export default rootreducer;
