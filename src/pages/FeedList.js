import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFeedAction, getAllFeedAction } from "../redux/store";
import { decrementAction, incrementAction } from "../redux/store";

export const FeedList = () => {
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

  const increment = (item) => {
    //   dispatch({type:"INCREMENT"});
    dispatch(incrementAction(item));
  };

  const decrement = (item) => {
    // dispatch({ type: "DECREMENT" });
    dispatch(decrementAction(item));
  };

  return (
    <div>
      <div className="alert alert-secondary">
        <h3>Feed List</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
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
          {state.feedList.map((item, index, counter) => (
            <tr key={index}>
              <th scope="row">{item.id}</th>
              <td>{item.query}</td>
              <td>{item.feedDate}</td>
              <td>{item.feedTime}</td>
              <td>{item.topic}</td>
              <td>{item.relevance}</td>
              <td>{item.totalComments}</td>
              {/* <td>{item.likes}</td> */}
              <td>{state.counter}</td>

              <td>
                <input
                  type="button"
                  value="DELETE"
                  // onClick={deleteRecord}
                  onClick={() => deleteRecord(item)}
                  className="btn btn-outline-danger btn-sm mb-1 ml-1 mr-2 "
                />

                <input
                  type="button"
                  value="Likes"
                  onClick={() => increment(item)}
                  className="btn btn-primary btn-sm"
                />

                <input
                  type="button"
                  value="Dislikes"
                  onClick={() => decrement(item)}
                  className="btn btn-danger btn-sm ml-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
