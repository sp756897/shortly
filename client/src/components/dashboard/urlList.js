import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { urlBoard, urlClicks } from "../../actions/authActions";
import Dashnav from "./Dashnav";
import Stat from "./Stat";
import Stat2 from "./Stat2";
import "../../App.css"

class UrlList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urlcli: this.props.urlcli
        }
    }

    async componentDidMount() {
        await this.props.urlBoard({ email: this.props.auth.user.email });
        await this.props.urlClicks({ email: this.props.auth.user.email });

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            urlcli: nextProps.urlcli
        });
        console.log("update", this.state.urlcli)
    }



    render() {
        const { urlcli } = this.state;

        var dict = []
        const count = urlcli.map((val, index) => {
            let v1 = val.clicked
            dict.push({ index, v1 })
        })
        console.log(dict)

        const urlsits = this.props.urllist.map((urls, key) =>
        (
            <div class="col s21 m20" key={key}>
                <ul class="collection">
                    <li class="collection-item avatar">
                        <span class="title">FullUrl: {urls.fullurl}</span>
                        <p>ShortUrl:<a href={urls.shorturl} target="_blank" onClick={() => { this.props.urlClicks({ email: this.props.auth.user.email }) }}> {urls.shorturl} </a> <br></br>
                            Second Line
                        </p>
                    </li>
                </ul>
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
                                        <b>Url</b> Board
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 center-align">
                        <div class="col s6"><Stat dict={dict} /></div>
                        <div class="col s6"><Stat2 dict={dict} /></div>
                    </div>
                    <div className="col s12">
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