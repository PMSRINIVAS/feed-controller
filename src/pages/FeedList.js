import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  deleteFeedAction,
  getAllFeedAction,
  updateRenderAction,
  getFeedByIdAction,
  getFeedByTopicAction,
  //getFeedByKeywordAction,
} from "../redux/FeedReducer";

export const FeedList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const formEl = useRef();

  const [id, setId] = useState(state.feed.uref.id);
  const updateId = (e) => setId(e.target.value);

  const [topic, setTopic] = useState(state.feed.uref.topic);
  const updateTopic = (e) => setTopic(e.target.value);

  useEffect(() => {
    dispatch(getAllFeedAction());
  }, []);

  const getFeedByIdRecord = (e) => {
    e.preventDefault();
    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        getFeedByIdAction({
          id,
        })
      );
      setId("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const getFeedByTopicRecord = (e) => {
    e.preventDefault();
    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        getFeedByTopicAction({
          topic,
        })
      );
      setTopic("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  // const getFeedByKeywordRecord = (e) => {
  //   e.preventDefault();
  //   const isFormValid = formEl.current.checkValidity();
  //   if (isFormValid) {
  //     dispatch(
  //       getFeedByKeywordAction({
  //         topic,
  //       })
  //     );
  //     setTopic("");
  //   } else {
  //     e.stopPropagation();
  //     formEl.current.classList.add("was-validated");
  //   }
  // };

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
    <div style={{ backgroundImage: "url(1.png)" }} className="sign-up-bg">
      <div>
        <div className="alert alert-secondary mb-0">
          <h3>Feed List ✍️ : </h3>

          <form
            ref={formEl}
            className="mx-4 needs-validation form-inline"
            noValidate
          >
            <div>
              <input
                type="number"
                placeholder="Enter your id"
                style={{ width: "200px" }}
                value={id}
                onChange={updateId}
                className="form-control form-control-sm mb-2 mr-1 "
              />
            </div>
            <div>
              <input
                type="button"
                className="btn btn-secondary btn-sm mb-2 "
                value="Search"
                onClick={getFeedByIdRecord}
              />
            </div>
          </form>

          <form
            ref={formEl}
            className="mx-4 needs-validation form-inline "
            noValidate
          >
            <div>
              <input
                type="text"
                placeholder="Enter your topic"
                value={topic}
                onChange={updateTopic}
                style={{ width: "200px" }}
                className="form-control form-control-sm mb-2 mr-1 "
                minLength="3"
                maxLength="30"
              />
            </div>
            <div>
              <input
                type="button"
                value="Search"
                className="btn btn-secondary btn-sm mb-1 "
                onClick={getFeedByTopicRecord}
              />
            </div>
          </form>

          {/* <form ref={formEl} className="mx-4 needs-validation" noValidate>
          <div>
            <input
              type="text"
              placeholder="Enter your topic keyword"
              value={topic}
              onChange={updateTopic}
              className="form-control form-control-sm mb-1 mr-5 "
            />
          </div>
          <div>
            <input
              type="button"
              value="Search"
              onClick={getFeedByKeywordRecord}
            />
          </div>
        </form> */}
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <div className="mr-3">Feed Id 🆔 </div>
              </th>
              <th scope="col">Query 📄 </th>
              {/* <th scope="col">Dev Id</th> */}
              <th scope="col">FeedDateTime 📅</th>

              <th scope="col">Topic 💯</th>
              <th scope="col">Relevance 📐 </th>
              <th scope="col">TotalComments 🗒️ </th>

              <th scope="col" className=" text-center">
                Action 🔧
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
