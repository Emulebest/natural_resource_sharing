import * as React from "react";
import * as ReactDOM from "react-dom";
import {LoggedStore} from "../store/logged";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom"
import axios from "axios"
import {Redirect} from "react-router-dom"
import {withRouter} from "react-router";
import "../styles/login.css"

interface Props {

}

interface InjectedProps extends Props {
    logged: LoggedStore
}

@inject("logged")
// @ts-ignore
@withRouter
@observer
export class Login extends React.Component<Props> {
    state = {
        username: "",
        email: "",
        password: "",
        error: "",
        redirect: false
    };

    get injected() {
        return this.props as InjectedProps
    }

    handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:8000/rest-auth/login/", {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            this.injected.logged.setUser(this.state.username, res.data.key);
            localStorage.setItem("token", res.data.key);
            localStorage.setItem("username", this.state.username);
            this.setState({error: ""});
            this.setState({redirect: true})
        } catch (e) {
            this.setState({error: "Something went wrong"})
        }
    };

    render() {
        if (!this.state.redirect) {
            return (
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <div className="login100-form validate-form">
					<span className="login100-form-title p-b-34">
						Natural resource sharing
					</span>

                                <div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20">
                                    <input id="first-name" type="text" className="input100" placeholder="Username"
                           onChange={(e) => this.setState({username: e.target.value})}/>
                                        <span className="focus-input100"></span>
                                </div>
                                <div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20">
                                    <input className="input100" type="text" placeholder="Email" onChange={(e) =>
                                        this.setState({email: e.target.value})}/>
                                        <span className="focus-input100"></span>
                                </div>
                                <div className="wrap-input100 rs3-wrap-input100 validate-input m-b-20">
                                    <input className="input100" type="password" name="pass" placeholder="Password"
                           onChange={(e) => this.setState({password: e.target.value})}/>
                                        <span className="focus-input100"></span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <button className="login100-form-btn" onClick={this.handleSubmit}>
                                        Sign in
                                    </button>
                                </div>


                                <div className="w-full text-center ">
                                    <Link to={"/register"}> Sign Up </Link>
                                </div>
                            </div>

                            <div className="login100-more"></div>
                        </div>
                    </div>
                </div>

            // <div>
            //         <input type="text" placeholder="Username"
            //                onChange={(e) => this.setState({username: e.target.value})}/>
            //         <input type="text" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
            //         <input type="text" placeholder="Password"
            //                onChange={(e) => this.setState({password: e.target.value})}/>
            //         {this.state.error === "" ? null : <h2>{this.state.error}</h2>}
            //         <button onClick={this.handleSubmit}>Submit</button>
            //         <div>
            //             <h3>Don't have an account?</h3>
            //             <Link to={"/register"}> Register </Link>
            //         </div>
            //     </div>
            )
        } else {
            return (
                <Redirect to={"/home"}/>
            )
        }

    }
}