import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedAction } from "../redux/store";

export const FeedUpsert = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const formEl = useRef();

  const [query, setQuery] = useState("");
  const [feedDate, setFeedDate] = useState("");
  const [feedTime, setFeedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [relevance, setRelevance] = useState("");
  const [totalComments, setTotalComments] = useState("");
  const [likes, setLikes] = useState("");

  const updateQuery = (e) => setQuery(e.target.value);
  const updateFeedDate = (e) => setFeedDate(e.target.value);
  const updateFeedTime = (e) => setFeedTime(e.target.value);
  const updateTopic = (e) => setTopic(e.target.value);
  //   const updateRelevance = (e) => setRelevance(e.target.value);
  //   const updateTotalComments = (e) => setTotalComments(e.target.value);
  const updateLikes = (e) => setLikes(e.target.value);

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
          feedDate,
          feedTime,
          topic,
          relevance,
          totalComments,
          likes,
        })
      );

      // clear the form
      setQuery("");
      setFeedDate("");
      setFeedTime("");
      setTopic("");
      setRelevance("");
      setTotalComments("");
      setLikes("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div>
      <div className="alert alert-secondary">
        <h3>Feed Create</h3>
      </div>

      {state.progress && (
        <div className="mx-4 alert alert-success">
          Feed Created Successfully
        </div>
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
        </div>

        <div>
          <input
            type="date"
            value={feedDate}
            onChange={updateFeedDate}
            className="form-control form-control-lg mb-1"
            placeholder="Enter the Feed Date"
            required
          />
        </div>

        <div>
          <input
            type="time"
            value={feedTime}
            onChange={updateFeedTime}
            className="form-control form-control-lg mb-1"
            placeholder="Enter the Feed Time"
            required
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
        </div>

        <div>
          <input
            type="text"
            value={relevance}
            onChange={updateRelevance}
            className="form-control form-control-lg mb-1"
            placeholder="Enter the percentage Relevance"
            maxLength="2"
            required
          />
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
          <input
            type="Number"
            value={likes}
            onChange={updateLikes}
            className="form-control form-control-lg mb-1"
            placeholder="Enter a Like"
            required
          />
        </div>

        <div>
          <input
            type="button"
            onClick={addNewFeed}
            value="Add Feed"
            className="btn btn-lg btn-secondary w-100"
          />
        </div>
      </form>
    </div>
  );
};
