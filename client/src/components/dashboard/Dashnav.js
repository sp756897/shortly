import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";


class Dashnav extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return (
      <div class="col s12 m4 l3">
        <Link
          to="/dashboard"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            width: "100%",
            margin: "6px 6px"
          }}
          className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
        >
          Dashboard
        </Link>

        <Link
          to="/sendurl"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            width: "100%",
            margin: "6px 6px"
          }}
          className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
        >
          Url
        </Link>
        <Link
          to="/urllist"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            width: "100%",
            margin: "6px 6px"
          }}
          className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
        >
          Url List
        </Link>
        <button
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            width: "100%",
            margin: "6px 6px"
          }}
          onClick={this.onLogoutClick}
          className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
        >
          Logout
        </button>
      </div>
    );
  }
}


Dashnav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};
export default connect(
  null,
  { logoutUser }
)(Dashnav);