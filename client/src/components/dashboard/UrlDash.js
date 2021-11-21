import React, { Component } from "react";
import Dashnav from "./Dashnav";

class UrlDash extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clicks: this.props.location.data.clicks,
            fullurl: this.props.location.data.fullurl,
            shorturl: this.props.location.data.shorturl,
        }
    }

    render() {
        const { clicks, fullurl, shorturl } = this.state;

        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "9rem" }}>
                    <div className="col s12 center-align">
                        <h4>
                            Link -
                            {clicks.ind}<br></br>
                            <h className="flow-text grey-text text-darken-1">
                            </h>
                        </h4>

                    </div>
                    <div class="row">

                        <div class="col s12 m6">
                            <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Original Link</b> </span>
                                    <p style={{
                                        display: "inline-block",
                                        overflow: "hidden",
                                        maxWidth: "40ch",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"


                                    }}>Original Link is {fullurl}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Short Link</b> </span>
                                    <p>Shortened Link is {shorturl}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Clicks</b> </span>
                                    <p>Number of Clicks is {clicks.v1}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UrlDash;