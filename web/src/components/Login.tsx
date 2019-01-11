import * as React from "react";
import {LoggedStore} from "../store/logged";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom"
import axios from "axios"
import {Redirect} from "react-router-dom"
import {withRouter} from "react-router";
import {httpWithHeaders} from "../utils/custom_http";
import {ProfileStore} from "../store/profile";

interface Props {

}

interface InjectedProps extends Props {
    logged: LoggedStore,
    profile: ProfileStore
}

@inject("logged", "profile")
// @ts-ignore
@withRouter
@observer
export class Login extends React.Component<Props> {
    state = {
        username: "",
        email: "",
        password: "",
        error: "",
        redirect: false,
        redirectProfile: false,
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
            const profile_res = await httpWithHeaders().get("/profile/exists/");
            if (res.data.result) {
                this.injected.profile.setProfile(profile_res.data.id);
                this.setState({error: ""});
                this.setState({redirect: true})
            } else {
                this.setState({error: "", redirectProfile: true})
            }
        } catch (e) {
            this.setState({error: "Something went wrong"})
        }
    };

    render() {
        if (this.state.redirectProfile) {
            return (
                <Redirect to={"/profile"}/>
            )
        }
        if (!this.state.redirect) {
            return (
                <div>
                    <input type="text" placeholder="Username"
                           onChange={(e) => this.setState({username: e.target.value})}/>
                    <input type="text" placeholder="Email" onChange={(e) => this.setState({email: e.target.value})}/>
                    <input type="text" placeholder="Password"
                           onChange={(e) => this.setState({password: e.target.value})}/>
                    {this.state.error === "" ? null : <h2>{this.state.error}</h2>}
                    <button onClick={this.handleSubmit}>Submit</button>
                    <div>
                        <h3>Don't have an account?</h3>
                        <Link to={"/register"}> Register </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to={"/devices"}/>
            )
        }

    }
}