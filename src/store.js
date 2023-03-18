import { createStore } from "redux";
import rootreducer from "./Components/reducer";


export const store = createStore(rootreducer);