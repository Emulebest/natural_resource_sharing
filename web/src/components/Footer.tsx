import * as React from "react";
import "../styles/footer.css"
export class Footer extends React.Component {
    render() {
        return (

            <footer className="footer mt-auto py-3">
                <br/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>About Us</h3>
                            <p>Water </p>

                        </div>
                        <div className="col-md-2 list">
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                            </ul>

                        </div>
                        <div className="col-md-2 list">
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Lorem Ipsum</a></li>
                            </ul>

                        </div>
                        <div className="col-md-2">

                        </div>
                        <div className="col-md">
                            <h5><strong>Contact Info</strong></h5>
                            <p><strong>Adress:</strong> 514 S. Magnolia St.
                                Orlando, FL 32806
                            </p>
                            <p><strong>Email:</strong> email@example.com</p>
                            <p><strong>Tel.:</strong> (888) 888 8888</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }


}