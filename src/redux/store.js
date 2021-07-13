import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import axios from "axios";

export const initState = {
  counter: 1,
  feedList: [],
  progress: false,
};

// ACTION TYPES

const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";

const FEED_GET_ALL_ACTION_TYPE = "FEED_GET_ALL_ACTION_TYPE";
const FEED_GET_BY_ID_ACTION_TYPE = "FEED_GET_BY_ID_ACTION_TYPE";
const FEED_CREATE_ACTION_TYPE = "FEED_CREATE_ACTION_TYPE";
const FEED_UPDATE_ACTION_TYPE = "FEED_UPDATE_ACTION_TYPE";
const FEED_DELETE_ACTION_TYPE = "FEED_DELETE_ACTION_TYPE";

//INCREMENT AND DECREMENT FUNCTION
const INCREMENT_ACTION_TYPE = "INCREMENT_ACTION_TYPE";
const DECREMENT_ACTION_TYPE = "DECREMENT_ACTION_TYPE";

export function incrementAction() {
  //WE ARE UPDATING THE UI
  return { type: INCREMENT_ACTION_TYPE };
}

export function decrementAction() {
  //WE ARE UPDATING THE UI
  return { type: DECREMENT_ACTION_TYPE };
}

// ACTIONS
export const getAllFeedAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/feeds/get`;
    const response = await axios.get(url);

    console.log(response);

    // UI UPDATE
    dispatch({ type: "FEED_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createFeedAction = (payload) => {
  return async (dispatch) => {
    //MAKING THE SERVER CALL
    const url = `http://localhost:8080/api/v1/feeds/post`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    //after 5 seconds PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const deleteFeedAction = (payload) => {
  return async (dispatch) => {
    //MAKE AN API/SERVER CALL
    const url = `http://localhost:8080/api/v1/feeds/delete/${payload.id}`;
    await axios.delete(url);

    //UPDATE THE UI TODO :: Fetch the updated list
    dispatch(getAllFeedAction());
  };
};

// REDURE FOR STATE UPDTE
function FeedReducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT_ACTION_TYPE:
      const newCounter = state.counter + 2;
      return { ...state, counter: newCounter };

    case DECREMENT_ACTION_TYPE:
      const newCounter1 = state.counter - 1;
      return { ...state, counter: newCounter1 };

    case FEED_GET_ALL_ACTION_TYPE:
      return { ...state, feedList: action.payload };

    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    default:
      return state;
  }
}

// MIDDLEWARE FOR THE ASYNC OPOERATION
const store = createStore(FeedReducer, applyMiddleware(thunk));
export { store };
