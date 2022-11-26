import { createStore } from "redux";
import recipeReducer from "./reducer/recipeReducer";

const store = createStore(recipeReducer);
export default store;