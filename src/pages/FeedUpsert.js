import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedAction, updateFeedAction } from "../redux/FeedReducer";

export const FeedUpsert = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);
  const formEl = useRef();

  const [query, setQuery] = useState(state.feed.uref.query);
  const [devId, setDevId] = useState(state.feed.uref.devId);
  const [feedDateTime, setFeedDateTime] = useState(
    state.feed.uref.feedDateTime
  );
  const [topic, setTopic] = useState(state.feed.uref.topic);
  const [relevance, setRelevance] = useState(state.feed.uref.relevance);
  const [totalComments, setTotalComments] = useState(
    state.feed.uref.totalComments
  );

  const updateQuery = (e) => setQuery(e.target.value);
  const updateDevId = (e) => setDevId(e.target.value);
  const updateFeedDateTime = (e) => setFeedDateTime(e.target.value);
  const updateTopic = (e) => setTopic(e.target.value);
  const updateRelevance = (e) => {
    console.log(e.target.value);

    //REPLACING ALL THE NON-DIGIT ^\\d WITH EMPTY STRING
    const numericValue = e.target.value.replace(/[^\d]/gi, "");
    setRelevance(numericValue);
  };

  const updateTotalComments = (e) => {
    console.log(e.target.value);

    //REPLACING ALL THE NON-DIGIT ^\\d WITH EMPTY STRING
    const numericValue = e.target.value.replace(/[^\d]/gi, "");
    setTotalComments(numericValue);
  };

  const addNewFeed = (e) => {
    //WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createFeedAction({
          query,
          devId,
          topic,
          relevance,
          totalComments,
        })
      );

      // clear the form
      setQuery("");
      setDevId("");
      setTopic("");
      setRelevance("");
      setTotalComments("");
      // setLikes("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateFeed = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateFeedAction({
          id: state.feed.uref.id,
          query,
          devId,
          feedDateTime,
          topic,
          relevance,
          totalComments,
        })
      );

      // clear the form
      setQuery("");
      setDevId("");
      setFeedDateTime("");
      setTopic("");
      setRelevance("");
      setTotalComments("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div style={{ backgroundImage: "url(1.png)" }} className="sign-up-bg">
      <div>
        <div className="alert alert-secondary">
          {state.feed.uref.id ? <h5>Feed Update</h5> : <h5>Feed Create</h5>}
        </div>

        {state.feed.progress && (
          <div className="mx-4 alert alert-success">Operation Success</div>
        )}

        <form ref={formEl} className="mx-4 needs-validation " noValidate>
          <div>
            <input
              type="text"
              value={query}
              onChange={updateQuery}
              className="form-control form-control-lg mb-1"
              placeholder="Enter the Query"
              minLength="5"
              maxLength="100"
              required
            />
            <div class="invalid-feedback">Please provide a valid query!</div>
            <div class="valid-feedback">Looks good</div>
          </div>

          <div>
            <input
              type="number"
              value={devId}
              onChange={updateDevId}
              className="form-control form-control-lg mb-1"
              placeholder="Enter Dev Id"
              required
            />
            <div class="invalid-feedback">Please provide a valid Dev Id !</div>
            <div class="valid-feedback">Looks good</div>
          </div>

          <div>
            <input
              type="datetime-local"
              value={feedDateTime}
              onChange={updateFeedDateTime}
              className="form-control form-control-lg mb-1"
              placeholder="Enter the Feed Date Time"
            />
          </div>

          <div>
            <input
              type="text"
              value={topic}
              onChange={updateTopic}
              className="form-control form-control-lg mb-1"
              placeholder="Enter the Topic"
              minLength="3"
              maxLength="30"
              required
            />
            <div class="invalid-feedback">Please provide a valid Topic !</div>
            <div class="valid-feedback">Looks good</div>
          </div>

          <div>
            <input
              type="range"
              value={relevance}
              onChange={updateRelevance}
              className="form-control form-control-lg mb-1"
              placeholder="Enter the percentage Relevance"
              maxLength="2"
              required
            />
            <div class="invalid-feedback">
              Please provide a valid Relevance range !
            </div>
            <div class="valid-feedback">Looks good</div>
          </div>

          <div>
            <input
              type="text"
              value={totalComments}
              onChange={updateTotalComments}
              className="form-control form-control-lg mb-1"
              placeholder="Enter the number of comments"
              required
            />
          </div>

          <div>
            {state.feed.uref.id ? (
              <input
                type="button"
                onClick={updateFeed}
                value="Update Feed"
                className="btn btn-lg btn-secondary w-100"
              />
            ) : (
              <input
                type="button"
                onClick={addNewFeed}
                value="Add Feed"
                className="btn btn-lg btn-secondary w-100"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
