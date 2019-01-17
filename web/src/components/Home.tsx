import * as React from "react";
import {withRouter} from "react-router";
import {observer} from "mobx-react";
import "../styles/home.css"
// @ts-ignore
@withRouter
@observer
export class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="blog-grids">
                            <div className="grid">
                                <div className="entry-media">
                                    <img
                                        src="https://buklya.com/wp-content/uploads/2015/12/Гордость-и-предубеждение2.jpg"
                                        alt=""/>
                                </div>
                                <div className="entry-body">
                                    <span className="cat">book</span>
                                    <h3><a href="#">Гордость и предубеждение</a></h3>
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut..</p>
                                    <div className="read-more-date">
                                        <a href="#">Read More..</a>
                                        <span className="date">3 Hours ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="entry-media">
                                    <img src="https://bitcoin.com.au/wp-content/uploads/2018/10/ethereum.jpg"
                                         alt=""/>
                                </div>
                                <div className="entry-body">
                                    <span className="cat">crypto</span>
                                    <h3><a href="#">Ethereum</a></h3>
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut..</p>
                                    <div className="read-more-date">
                                        <a href="#">Read More..</a>
                                        <span className="date">3 Hours ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="entry-media">
                                    <img src="https://i.amz.mshcdn.com/-7R3bLC1xTVhrjc86pBeYAogXFY=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F760683%2F2117d274-d2cf-46b9-b60c-698d65361438.jpg" alt=""/>
                                </div>
                                <div className="entry-body">
                                    <span className="cat">book</span>
                                    <h3><a href="#">Harry potter</a></h3>
                                    <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut..</p>
                                    <div className="read-more-date">
                                        <a href="#">Read More..</a>
                                        <span className="date">3 Hours ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}