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
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                    <div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter username"
                                   onChange={(e) => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="text" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) =>
                                        this.setState({email: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="text" className="form-control" name="password" id="password"
                                   placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="form-check">

                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                            <div className="w-full text-center ">
                                    <Link to={"/register"}> Sign Up </Link>
                                </div>
                        </div>

                    </div>



                </div>
            )
        } else {
            return (
                <Redirect to={"/home"}/>
            )
        }

    }
}