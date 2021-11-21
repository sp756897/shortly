import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { urlBoard, urlClicks } from "../../actions/authActions";
import Dashnav from "./Dashnav";
import Stat from "./Stat";
import Stat2 from "./Stat2";
import "../../App.css"

class UrlList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.auth.user,
            browser: ""
        }
        this.props.urlBoard({ email: this.state.user.email });
        this.props.urlClicks({ email: this.state.user.email });


    }


    componentDidMount() {
        const res = this.dectect()
        this.setState({
            browser: res
        })
        console.log(res)
    }

    dectect = () => {
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
            return 'Opera';
        } else if (navigator.userAgent.indexOf("Chrome") != -1) {
            return 'Chrome';
        } else if (navigator.userAgent.indexOf("Safari") != -1) {
            return 'Safari';
        } else if (navigator.userAgent.indexOf("Firefox") != -1) {
            return 'Firefox';
        } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
            return 'IE';//crap
        } else {
            return 'Unknown';
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            urlcli: this.props.urlcli
        });
    }
    render() {

        var dict = []
        const count = this.props.urlcli.map((val, index) => {
            let v1 = val.clicked
            let ind = index + 1
            dict.push({ ind, v1 })
        })
        console.log(this.props.urllist)

        const urlsits = this.props.urllist.map((urls, key) =>
        (
            <div class="row">
                <div class="col s12 m6 l12">
                    <div class=" card blue-grey darken-1 z-depth-4" style={{ width: "100%" }}>
                        <div class="card-content white-text">
                            <span class="card-title">Link - {key + 1}</span>
                            <p>FullUrl: {urls.fullurl} </p>
                        </div>
                        <div class="card-action light-blue accent-1" >
                            <p>ShortUrl:<a href={urls.shorturl} target="_blank"> {urls.shorturl} </a></p>
                            <Link
                                to={{
                                    pathname: "/urldash",
                                    data: {
                                        clicks: dict[key],
                                        fullurl: urls.fullurl,
                                        shorturl: urls.shorturl,
                                    }
                                }}
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Analyse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9">
                    <div className="">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "4px", marginLeft: "6rem" }}>
                                    <h4>
                                        <b>URL</b> List
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 center-align">
                        {dict.length == 0 ? (<div class="center-align z-depth-3" style={{ width: "100%", height: "300px" }}>
                            <div class="center-align preloader-wrapper big active" >
                                <div class="spinner-layer spinner-blue-only">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div><div class="gap-patch">
                                        <div class="circle"></div>
                                    </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </div>) :
                            (<div style={{ paddingBottom: "30px" }}>
                                <div class="col s8"><Stat dict={dict} /></div>
                                <div class="col s4"><Stat2 dict={dict} /></div>
                            </div>)}
                    </div>

                    <div className="col s12" style={{ paddingTop: "4rem" }}>
                        {urlsits}
                    </div>
                    <div>
                    </div>

                </div>
            </div>
        );
    }
}


UrlList.propTypes = {
    urlBoard: PropTypes.func.isRequired,
    urllist: PropTypes.array.isRequired,
    urlClicks: PropTypes.func.isRequired,
    urlcli: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    urllist: state.url.urllist,
    urlcli: state.url.urlcli,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { urlBoard, urlClicks }
)(UrlList);