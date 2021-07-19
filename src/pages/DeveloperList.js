import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllDeveloperAction,
  updateRenderAction1,
} from "../redux/DeveloperReducer";
import { AppNav } from "./AppNav";

export const DeveloperList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllDeveloperAction());
  }, []);

  // 2
  const updateRecord = (item) => {
    console.log("Update Record", item);

    // 3 :: updating the store
    dispatch(updateRenderAction1(item));

    // navigating to the page
    history.push("/developer-upsert");
  };

  return (
    <div>
      <div className="alert alert-secondary mb-0">
        <h3> DEVELOPER LIST</h3>
      </div>

      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">DEVELOPER ID</th>
            <th scope="col">NAME</th>
            <th scope="col">MEMBER SINCE</th>
            <th scope="col">SKILL LEVEL</th>
            <th scope="col">REPUTATION</th>
            <th scope="col">TOTAL FEEDS</th>
            <th scope="col">IS VERIFIED</th>
            <th scope="col">IS BLOCK</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {state.developer.developerList.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.devId}</th>
              <td>{item.name}</td>
              <td>{item.memberSince}</td>
              <td>{item.skillLevel}</td>
              <td>{item.reputation}</td>
              <td>{item.totalFeeds}</td>
              <td>{item.isVerified ? "true" : "false"}</td>
              <td>{item.isBlock ? "true" : "false"}</td>

              <td>
                <input
                  type="button"
                  value="Update ✍️"
                  className="btn btn-outline-secondary btn-sm  mr-1"
                  // onClick={updateRecord} :1
                  onClick={() => updateRecord(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
