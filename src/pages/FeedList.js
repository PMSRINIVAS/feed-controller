import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  deleteFeedAction,
  getAllFeedAction,
  updateRenderAction,
  getFeedByIdAction,
} from "../redux/FeedReducer";

export const FeedList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  //const formEl = useRef();

  const [id, setId] = useState(state.feed.uref.id);
  const updateId = (e) => setId(e.target.value);

  useEffect(() => {
    dispatch(getAllFeedAction());
  }, []);

  // const getFeedByIdRecord = (e) => {
  //   //e.preventDefault();
  //   //const isFormValid = formEl.current.checkValidity();
  //   //if (isFormValid) {
  //   dispatch(getFeedByIdAction({ e }));
  //   //}
  // };

  const getFeedByIdRecord = () => {
    dispatch(getFeedByIdAction(2));
  };

  //Static Likes function
  let [like, setlike] = useState(0);
  const addLike = () => {
    like = like + 1;
    setlike(like);
  };

  const deleteRecord = (item) => {
    console.log("DELETE RECORD", item.id);
    //dispatch the call.
    dispatch(deleteFeedAction(item));
  };

  // Step2-update
  const updateRecord = (item) => {
    console.log("UPDATE RECORD", item);

    // Step3-updating the store
    dispatch(updateRenderAction(item));

    //navigating to the page
    history.push("/feed-upsert");
  };

  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3>Feed List</h3>

        <form>
          <label htmlFor="header-search">
            <span className="visually-hidden"></span>
          </label>
          <input
            type="text"
            id="header-search"
            placeholder="Enter your search"
            onChange={updateId}
            name="s"
          />
          <button type="button" onClick={() => getFeedByIdRecord()}>
            Search
          </button>
        </form>
        {/* <form>
          <input
            type="text"
            placeholder="Enter your Search"
            value={id}
            onChange={updateId}
            className="form-control form-control-lg mb-1"
          />
          <input
            type="button"
            value="Search"
            onClick={() => getFeedByIdRecord()}
          />
        </form> */}
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">
              <div className="mr-3">Feed Id</div>
            </th>
            <th scope="col">Query</th>
            {/* <th scope="col">Dev Id</th> */}
            <th scope="col">FeedDateTime</th>

            <th scope="col">Topic</th>
            <th scope="col">Relevance</th>
            <th scope="col">TotalComments</th>

            <th scope="col" className=" text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {state.feed.feedList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.id}</th>
              <td>{item.query}</td>
              {/* <td>{item.developer.devId}</td> */}
              <td>{item.feedDateTime}</td>

              <td>{item.topic}</td>
              <td>{item.relevance}</td>
              <td>{item.totalComments}</td>

              <td>
                {/**Step1-update */}
                <input
                  type="button"
                  value="Update ✍️ "
                  className="btn btn-outline-secondary btn-sm mr-1"
                  onClick={() => updateRecord(item)}
                />

                <input
                  type="button"
                  value="DELETE 🗑️ "
                  // onClick={deleteRecord}
                  onClick={() => deleteRecord(item)}
                  className="btn btn-outline-danger btn-sm mb-1 ml-1 mr-1 "
                />
                <button
                  className=" btn btn-secondary btn-sm] text-light"
                  onClick={addLike}
                >
                  <span className="ml-3">Likes 👍 </span>
                  {like}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
