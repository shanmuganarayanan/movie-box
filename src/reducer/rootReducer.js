import { combineReducers } from "redux";
import apiLoaderReducer from "./apiLoaderReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
    Loading: apiLoaderReducer,
    Moviedata : moviesReducer,
})

export default rootReducer;