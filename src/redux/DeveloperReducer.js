import axios from "axios";

const initState = {
  developerList: [],
  progress: false,
  uref: {},
};

// ACTION TYPES :: EMPLOYEE :: ENITY1
const PROGRESS_ACTION_TYPE = "PROGRESS_ACTION_TYPE";
const DEVELOPER_GET_ALL_ACTION_TYPE = "DEVELOPER_GET_ALL_ACTION_TYPE";
const DEVELOPER_UPDATE_RENDER_ACTION_TYPE =
  "DEVELOPER_UPDATE_RENDER_ACTION_TYPE";

// ACTIONS
export const getAllDeveloperAction = () => {
  return async (dispatch) => {
    // API CALL :: FETCH RECORDS
    const url = `http://localhost:8080/api/v1/developer/get`;
    const response = await axios.get(url);

    console.log(response);

    // UI UPDATE
    dispatch({ type: "DEVELOPER_GET_ALL_ACTION_TYPE", payload: response.data });
  };
};

export const createDeveloperAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/developer/post`;
    await axios.post(url, payload);

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateDeveloperAction = (payload) => {
  return async (dispatch) => {
    // making the server call.
    const url = `http://localhost:8080/api/v1/developer/get/${payload.devId}`;
    await axios.put(url, payload);

    // making the uref empty again.
    updateRenderAction1({});

    // update the ui. TODO
    dispatch({ type: PROGRESS_ACTION_TYPE, payload: true });

    // after 5 second PROGRESS :: FALSE AGAIN
    setTimeout(() => {
      dispatch({ type: PROGRESS_ACTION_TYPE, payload: false });
    }, 5000);
  };
};

export const updateRenderAction1 = (payload) => {
  // ONLY UPDATEING THE UI
  // 5
  return { type: DEVELOPER_UPDATE_RENDER_ACTION_TYPE, payload: payload };
};
// REDURE FOR STATE UPDTE
export function DeveloperReducer(state = initState, action) {
  switch (action.type) {
    case DEVELOPER_GET_ALL_ACTION_TYPE:
      return { ...state, developerList: action.payload };
    case PROGRESS_ACTION_TYPE:
      return { ...state, progress: action.payload };
    case DEVELOPER_UPDATE_RENDER_ACTION_TYPE:
      return { ...state, uref: action.payload };
    default:
      return state;
  }
}
