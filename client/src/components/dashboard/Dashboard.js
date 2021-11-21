import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, urlBoard } from "../../actions/authActions";
import Dashnav from "./Dashnav";

class Dashboard extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.urlBoard({ email: this.props.auth.user.email })
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div class="row">
        <Dashnav />
        <div class="col s12 m8 l9" style={{ marginTop: "9rem" }}>
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]} What's Up?<br></br>
              <h className="flow-text grey-text text-darken-1">
                You are logged into{" "}
                <span style={{ fontFamily: "monospace" }}>Vircom</span> Ideas app 👏
              </h>
            </h4>

          </div>
          <div class="row">
            <div class="col s12 m6">
              <div id="cardsit" class="card grey z-depth-4" style={{ padding: "1rem" }} >
                <div class="card-content white-text">
                  <span class="card-title"><b>Email</b> </span>
                  <p>Your Email is {user.email}</p>
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                <div class="card-content white-text">
                  <span class="card-title"><b>Eth Address</b> </span>
                  <p style={{
                    display: "inline-block",
                    overflow: "hidden",
                    maxWidth: "40ch",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"


                  }}>Ethereum Address</p>
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                <div class="card-content white-text">
                  <span class="card-title"><b>Links</b> </span>
                  <p>Links Shortened {this.props.urllist.length}</p>
                </div>
              </div>
            </div>
            <div class="col s12 m6">
              <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                <div class="card-content white-text">
                  <span class="card-title"><b>Date</b> </span>
                  <p>Date Created {user.date.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  urlBoard: PropTypes.func.isRequired,
  urllist: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
  urllist: state.url.urllist,
});
export default connect(
  mapStateToProps,
  { logoutUser, urlBoard }
)(Dashboard);