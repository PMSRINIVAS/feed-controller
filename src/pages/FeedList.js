import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  deleteFeedAction,
  getAllFeedAction,
  updateRenderAction,
} from "../redux/FeedReducer";

export const FeedList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllFeedAction());
  }, []);

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
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">
              <div className="mr-3">Feed Id</div>
            </th>
            <th scope="col">Query</th>
            <th scope="col">FeedDate</th>
            <th scope="col">FeedTime</th>
            <th scope="col">Topic</th>
            <th scope="col">Relevance</th>
            <th scope="col">TotalComments</th>
            <th scope="col">Likes</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.feed.feedList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.id}</th>
              <td>{item.query}</td>
              <td>{item.feedDate}</td>
              <td>{item.feedTime}</td>
              <td>{item.topic}</td>
              <td>{item.relevance}</td>
              <td>{item.totalComments}</td>
              <td>{item.likes}</td>
              {/* <td>{state.counter}</td> */}

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
                  className="btn btn-outline-danger btn-sm mb-1 ml-1 mr-2 "
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
