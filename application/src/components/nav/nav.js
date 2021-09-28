import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../login/loginSlice";
import { persistor } from "../../redux/store";
import "./nav.css";

const Nav = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogOut = () => {
    dispatch(logout());
    persistor.purge();
    history.push("/login");
  };

  return (
    <div className="nav-strip">
      <Link to={"/order"} className="nav-link">
        <div className="nav-link-style">
          <label className="nav-label">Order Form</label>
        </div>
      </Link>
      <Link to={"/view-orders"} className="nav-link" id="middle-link">
        <div className="nav-link-style">
          <label className="nav-label">View Orders</label>
        </div>
      </Link>
      <div onClick={onLogOut} className="nav-link">
        <div className="nav-link-style">
          <label className="nav-label">Log Out</label>
        </div>
      </div>
    </div>
  );
};

export default Nav;
