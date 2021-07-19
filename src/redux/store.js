import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { DeveloperReducer } from "./DeveloperReducer";

import { FeedReducer } from "./FeedReducer";

const rootReducer = combineReducers({
  developer: DeveloperReducer,
  feed: FeedReducer,
});

// MIDDLEWARE FOR THE ASYNC OPOERATION
const store = createStore(rootReducer, applyMiddleware(thunk));
export { store };
