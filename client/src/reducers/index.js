import {applyMiddleware, combineReducers, createStore} from "redux";
import userReducer from "./userReducer";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension";

const rootReducer = combineReducers({
    user: userReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))