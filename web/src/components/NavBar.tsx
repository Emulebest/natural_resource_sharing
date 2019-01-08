import * as React from "react";
import {inject, observer} from "mobx-react";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import {UserStore} from "../store/user";
import {Link} from "react-router-dom"
import "../styles/navbar.css"
import {LoggedStore} from "../store/logged";
import {ProfileStore} from "../store/profile";
import {httpWithHeaders} from "../utils/custom_http";
import {withRouter} from "react-router";

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
export class NavBar extends React.Component<Props, {}> {

    get injected() {
        return this.props as InjectedProps
    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        this.injected.logged.removeUser();
        this.setState({is_logged: false});
    };

    render() {
        if (this.injected.logged.is_logged) {
            return (
                <>
                    <h1>
                        I am nav bar
                    </h1>
                    <ul>
                        <li><Link to={"/users"}>Users</Link></li>
                        <li><Link to={"/home"}>Home</Link></li>
                        <li><Link to={"/my_profile"}>Profile</Link></li>
                        <li><Link to={"/device"}>Devices</Link></li>
                        <li><Link to={"/water"}>Water supply</Link></li>
                        <li><a href={"/logout"} onClick={this.logout}>Logout</a></li>
                    </ul>
                </>
            )
        } else {
            return (
                <>
                    <h1>
                        I am nav bar
                    </h1>
                    <ul>
                        <li><Link to={"/login"}> Login </Link></li>

                    </ul>
                </>
            )
        }
    }

    async componentDidMount(): Promise<void> {
        if (localStorage.getItem("token") !== null && localStorage.getItem("username") !== null) {
            this.injected.logged.setUser(localStorage.getItem("username"), localStorage.getItem("token"));
            const res = await httpWithHeaders().get("/profile/exists/");
            if (res.data.result) {
                this.injected.profile.setProfile(res.data.id);
            }
            this.setState({is_logged: true})
        }
    }
}