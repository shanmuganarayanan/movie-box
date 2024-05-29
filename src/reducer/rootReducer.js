import { combineReducers } from "redux";
import apiLoaderReducer from "./apiLoaderReducer";

const rootReducer = combineReducers({
    Loading: apiLoaderReducer,
})

export default rootReducer;