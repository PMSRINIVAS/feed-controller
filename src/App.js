import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FeedList } from "./pages/FeedList";
import { FeedUpsert } from "./pages/FeedUpsert";

function App() {
  return (
    <Router>
      <div className="bg-dark text-light p-3 d-flex justify-content-end ">
        <Link to="/feed-list">
          <h6 className="mr-3">FEED-List</h6>
        </Link>

        <Link to="/feed-upsert">
          <h6>FEED-Upsert</h6>
        </Link>
      </div>

      <Route exact path="/" component={FeedList} />
      <Route exact path="/feed-upsert" component={FeedUpsert} />
      <Route exact path="/feed-list" component={FeedList} />
    </Router>
  );
}

export default App;
