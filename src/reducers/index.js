import { combineReducers } from "redux";
import comom from "./comom";
import ui from "./ui";
import products from "./products";
const rootReducer = combineReducers({
    comom,
    ui,
    products,
});
export default rootReducer;