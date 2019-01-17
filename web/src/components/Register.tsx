import * as React from "react";
import axios from "axios"
import {inject, observer} from "mobx-react";
import {LoggedStore} from "../store/logged";
import {Redirect, withRouter} from "react-router";

interface Props {

}

interface InjectedProps extends Props {
    logged: LoggedStore
}

@inject("logged")
// @ts-ignore
@withRouter
@observer
export class Register extends React.Component<Props> {
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
        redirect: false
    };

    get injected() {
        return this.props as InjectedProps;
    }

    handleSubmit = async (): Promise<void> => {
        const result = await axios.post("http://localhost:8000/rest-auth/registration/", {
            username: this.state.username,
            password1: this.state.password,
            password2: this.state.password2,
            email: this.state.email
        });
        localStorage.setItem("token", result.data.key);
        localStorage.setItem("username", this.state.username);
        this.injected.logged.setUser(this.state.username, result.data.key);
        this.setState({redirect: true})
    };

    render() {
        if (!this.state.redirect) {
            return (
                <div className="form" id="registrationForm">
                <div>
                    <div className="form-group">

                        <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Username</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your first name if any."
                                   placeholder="Username"
                                   onChange={(e) => this.setState({"username": e.target.value})}/>
                        </div>
                        <div className="col-xs-6">
                            <label htmlFor="second_name"><h4>Email</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your second name if any."
                                   placeholder="your@emaol.com" onChange={(e) => this.setState({"email": e.target.value})}/>
                        </div>
                        <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Password</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your city if any."
                                   placeholder="password" onChange={(e) => this.setState({"password": e.target.value})}/>
                        </div>
                        <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Repeat password</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your country if any."
                                   placeholder="repeat your password" onChange={(e) => this.setState({"password2": e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <br/>
                                <button className="btn btn-success" onClick={() => this.handleSubmit()}><i
                                    className="glyphicon glyphicon-ok-sign"></i> Save
                                </button>
                        </div>
                    </div>
                </div>
                </div>
            )
        } else {
            return (
                <Redirect to={"/profile"}/>
            )
        }

    }
}