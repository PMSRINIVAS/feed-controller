import axios from "axios";

const initState = {
  feedList: [],
  progress: false,
  developer: [],
  feed: [],
  uref: {},
};

// ACTION TYPES

const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const FEED_GET_ALL_ACTION_TYPE = "FEED_GET_ALL_ACTION_TYPE";

const FEED_UPDATE_RENDER_ACTION_TYPE = "FEED_UPDATE_RENDER_ACTION_TYPE";

const FEED_GET_BY_ID_ACTION_TYPE = "FEED_GET_BY_ID_ACTION_TYPE";
const FEED_GET_BY_TOPIC_ACTION_TYPE = "FEED_GET_BY_TOPIC_ACTION_TYPE";
const FEED_CREATE_ACTION_TYPE = "FEED_CREATE_ACTION_TYPE";
const FEED_UPDATE_ACTION_TYPE = "FEED_UPDATE_ACTION_TYPE";
const FEED_DELETE_ACTION_TYPE = "FEED_DELETE_ACTION_TYPE";

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

//Get by Id
export const getFeedByIdAction = (payload) => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/feeds/get/${payload}`;
    const response = await axios.get(url);

    console.log(response);

    // UI UPDATE
    if (response.data) {
      dispatch({
        type: "FEED_GET_BY_ID_ACTION_TYPE",
        payload: [response.data],
      });
    }
  };
};

export const createFeedAction = (payload) => {
  return async (dispatch) => {
    //MAKING THE SERVER CALL
    const url = `http://localhost:8080/api/v1/feeds/post/devId/${payload.devId}`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    //after 5 seconds PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateFeedAction = (payload) => {
  return async (dispatch) => {
    //MAKING THE SERVER CALL
    const url = `http://localhost:8080/api/v1/feeds/get/${payload.id}`;
    await axios.put(url, payload);

    //making the uref empty again
    updateRenderAction({});

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

// step4
export const updateRenderAction = (payload) => {
  //ONLY UPDATING THE UI

  //step5
  return { type: FEED_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};

// REDURE FOR STATE UPDTE
export function FeedReducer(state = initState, action) {
  switch (action.type) {
    case FEED_GET_ALL_ACTION_TYPE:
      return { ...state, feedList: action.payload };

    case FEED_GET_BY_ID_ACTION_TYPE:
      return { ...state, feedList: action.payload };

    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };

    //step6
    case FEED_UPDATE_RENDER_ACTION_TYPE:
      return { ...state, uref: action.payload };

    default:
      return state;
  }
}
