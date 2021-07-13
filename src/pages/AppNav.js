import { Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { updateRenderAction } from "../redux/FeedReducer";

export const AppNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const clearFeedUref = () => {
    dispatch(updateRenderAction({}));
    history.push("/feed-upsert");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Developer Community App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={Link}
            to="/feed-list"
            className="btn btn-secondary text-light mb-2 mr-4 btn-sm btn-outline-info"
          >
            Feed List
          </Nav.Link>
          <Nav.Link
            onClick={clearFeedUref}
            className="btn btn-secondary text-light mb-2 mr-2 btn-sm btn-outline-info"
          >
            Feed Upsert
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
