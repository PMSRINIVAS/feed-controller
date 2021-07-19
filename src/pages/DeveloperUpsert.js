import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createDeveloperAction,
  updateDeveloperAction,
} from "../redux/DeveloperReducer";
//import { AppNav } from "./AppNav";

export const DeveloperUpsert = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  const formEl = useRef();

  const [name, setName] = useState(state.developer.uref.name);

  const [skillLevel, setSkillLevel] = useState(state.developer.uref.skillLevel);
  const [memberSince, setMemberSince] = useState(
    state.developer.uref.memberSince
  );
  const [isBlocked, setIsBlocked] = useState(state.developer.uref.isBlocked);
  const [isVerified, setIsVerified] = useState(state.developer.uref.isVerified);
  const [reputation, setReputation] = useState(state.developer.uref.reputation);
  const [totalFeeds, setTotalFeeds] = useState(state.developer.uref.totalFeeds);

  const updateName = (e) => setName(e.target.value);
  const updateSkillLevel = (e) => setSkillLevel(e.target.value);
  const updateMemberSince = (e) => setMemberSince(e.target.value);
  const updateIsBlocked = (e) => setIsBlocked(e.target.value);
  const updateIsVerified = (e) => setIsVerified(e.target.value);
  const updateReputation = (e) => setReputation(e.target.value);
  const updateTotalFeeds = (e) => setTotalFeeds(e.target.value);

  const addNewDeveloper = (e) => {
    // WRITE LOGIC FOR THE VALIDATION :: FORM_ELEMENT / FORM_TAG
    // console.log(formEl.current);
    // console.log(formEl.current.checkValidity());
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        createDeveloperAction({
          name,
          skillLevel,
          memberSince,
          isBlocked,
          isVerified,
          reputation,
          totalFeeds,
        })
      );

      // clear the form
      setName("");
      setSkillLevel("");
      setMemberSince("");
      setIsBlocked("");
      setIsVerified("");
      setReputation("");
      setTotalFeeds("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  const updateDeveloper = (e) => {
    e.preventDefault();

    const isFormValid = formEl.current.checkValidity();
    if (isFormValid) {
      dispatch(
        updateDeveloperAction({
          devId: state.developer.uref.devId,
          name,
          skillLevel,
          memberSince,
          isBlocked,
          isVerified,
          reputation,
          totalFeeds,
        })
      );

      // clear the form
      setName("");
      setSkillLevel("");
      setMemberSince("");
      setIsBlocked("");
      setIsVerified("");
      setReputation("");
      setTotalFeeds("");
    } else {
      e.stopPropagation();
      formEl.current.classList.add("was-validated");
    }
  };

  return (
    <div>
      <div className="alert alert-secondary">
        {state.developer.uref.devId ? (
          <h5>DEVELOPER UPDATE</h5>
        ) : (
          <h5>DEVELOPER CREATE</h5>
        )}
      </div>

      {state.developer.progress && (
        <div className="mx-4 alert alert-success">Operation Success</div>
      )}

      <form ref={formEl} className="mx-4 needs-validation" noValidate>
        <div>
          <input
            type="text"
            value={name}
            onChange={updateName}
            className="form-control form-control-lg mb-1"
            placeholder="Enter  Name"
            minLength="3"
            maxLength="30"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={skillLevel}
            onChange={updateSkillLevel}
            className="form-control form-control-lg mb-1"
            placeholder="Enter skill level"
            minLength="3"
            maxLength="30"
            required
          />
        </div>

        <div>
          <input
            type="date"
            value={memberSince}
            onChange={updateMemberSince}
            className="form-control form-control-lg mb-1"
            placeholder="Enter member since"
            minLength="6"
            maxLength="30"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={isBlocked}
            onChange={updateIsBlocked}
            className="form-control form-control-lg mb-1"
            placeholder="Enter is Blocked"
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={isVerified}
            onChange={updateIsVerified}
            className="form-control form-control-lg mb-1"
            placeholder="Enter is verified"
            minLength="2"
            maxLength="30"
            required
          />
        </div>

        <div>
          <input
            type="number"
            value={reputation}
            onChange={updateReputation}
            className="form-control form-control-lg mb-1"
            placeholder="Enter Reputation"
            minLength="0"
            maxLength="30"
            required
          />
        </div>
        <div>
          <input
            type="number"
            value={totalFeeds}
            onChange={updateTotalFeeds}
            className="form-control form-control-lg mb-1"
            placeholder="Enter total feeds"
            minLength="0"
            maxLength="30"
            required
          />
        </div>
        <div>
          {state.developer.uref.devId ? (
            <input
              type="button"
              onClick={updateDeveloper}
              value="Update Developer"
              className="btn btn-lg btn-secondary w-100"
            />
          ) : (
            <input
              type="button"
              onClick={addNewDeveloper}
              value="Add Developer"
              className="btn btn-lg btn-secondary w-100"
            />
          )}
        </div>
      </form>
    </div>
  );
};
