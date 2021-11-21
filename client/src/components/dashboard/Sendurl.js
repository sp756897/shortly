import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Dashnav from "./Dashnav";
import { sendUrl } from "../../actions/authActions"


class Sendurl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullurl: "",
            errors: {},
            email: ""
        };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUrl = {
            fullurl: this.state.fullurl,
            email: this.state.email
        }
        this.props.sendUrl(newUrl, this.props.history);
        console.log(newUrl);
    }

    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;
        this.state.email = user.email;

        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9">
                    <div className="">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s2">
                                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                    <h4>
                                        Enter <b>URL</b> below
                                    </h4>
                                </div>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="input-field col s12">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.fullurl}
                                            error={errors.invalidurl}
                                            id="fullurl"
                                            type="text"
                                            className={classnames("", {
                                                invalid: errors.urlalready || errors.invalidurl
                                            })}
                                        />
                                        <label htmlFor="email">Url</label>
                                        <span className="red-text">
                                            {errors.urlalready}
                                            {errors.invalidurl}
                                        </span>
                                    </div>

                                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                        <button
                                            style={{
                                                width: "150px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "1rem"
                                            }}
                                            type="submit"
                                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Sendurl.propTypes = {
    sendUrl: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { sendUrl }
)(withRouter(Sendurl));