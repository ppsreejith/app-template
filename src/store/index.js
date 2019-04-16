import { createStore, combineReducers } from "redux";
import reducer from "../reducers";
import Immutable from "immutable";

export const store = createStore(combineReducers({reducer}));