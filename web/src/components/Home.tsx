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
                                        src="http://designlooter.com/images/jiuzhaigou-park-svg-9.jpg"
                                        alt=""/>
                                </div>
                                <div className="entry-body">
                                    <span className="cat">water</span>
                                    <h3><a href="#">Natural resource</a></h3>
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
                                    <span className="cat">cripto</span>
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
                                    <img src="https://amlifestylemedicine.com/wp-content/uploads/2018/06/water.jpg" alt=""/>
                                </div>
                                <div className="entry-body">
                                    <span className="cat">water</span>
                                    <h3><a href="#">Simple water</a></h3>
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