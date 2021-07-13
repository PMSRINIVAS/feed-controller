import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { FeedReducer } from "./FeedReducer";

const rootReducer = combineReducers({
  feed: FeedReducer,
});

// MIDDLEWARE FOR THE ASYNC OPOERATION
const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
