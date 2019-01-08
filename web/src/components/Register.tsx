import * as React from "react";
import axios from "axios"
import {inject, observer} from "mobx-react";
import {LoggedStore} from "../store/logged";
import {withRouter} from "react-router";

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
      password2: ""
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
        this.injected.logged.setUser(this.state.username, result.data.key)
    };

    render() {
        return (
            <div>
                <input type="text" placeholder="Username" onChange={(e) => this.setState({"username": e.target.value})}/>
                <input type="text" placeholder="Email" onChange={(e) => this.setState({"email": e.target.value})}/>
                <input type="text" placeholder="Password" onChange={(e) => this.setState({"password": e.target.value})}/>
                <input type="text" placeholder="Password2" onChange={(e) => this.setState({"password2": e.target.value})}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}