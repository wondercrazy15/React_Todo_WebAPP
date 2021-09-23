import React from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "./Components/Contexts/AuthContext";

const Header = (props) => {
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  const LogoutUser = (e) => {
    e.preventDefault();
    try {
      logout();
    } catch {
      alert("Error while logout user...!");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            {props.title}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {!currentUser ? (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/todo">
                      Todo
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userlist">
                      Userlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/about">
                      About
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <form className="d-flex ml-auto">
              {!currentUser ? (
                <>
                  <button
                    className="btn btn-light login "
                    onClick={() => history.push("/register")}
                  >
                    <i className="fa fa-sign-in-alt"></i> Register
                  </button>
                  <button
                    className="btn btn-light login ml-2"
                    onClick={() => history.push("/login")}
                  >
                    <i className="fa fa-sign-in-alt"></i>&nbsp; Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-light login mr-2"
                    //onClick={() => signOut().then(alert("Sigout Succesfully"))}
                    onClick={LogoutUser}
                  >
                    <i className="fa fa-sign-out-alt"></i>&nbsp; Logout
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

Header.defaultProps = {
  title: "Your Title Here",
};

Header.prototype = {
  title: PropTypes.string,
};
