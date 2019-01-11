import * as React from "react";
import {inject, observer} from "mobx-react";
import {UserStore} from "../store/user";
import {Link} from "react-router-dom"
import "../styles/navbar.css"
import {LoggedStore} from "../store/logged";
import {ProfileStore} from "../store/profile";
import {httpWithHeaders} from "../utils/custom_http";
import {Redirect, withRouter} from "react-router";
import {DeviceStore} from "../store/devices";
import {WaterStore} from "../store/water";
import {WalletStore} from "../store/wallet";

interface Props {

}

interface InjectedProps extends Props {
    logged: LoggedStore,
    profile: ProfileStore,
    devices: DeviceStore,
    users: UserStore,
    water: WaterStore,
    wallet: WalletStore
}

@inject("logged", "profile", "devices", "users", "water", "wallet")
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
        this.injected.devices.emptyStore();
        this.injected.profile.emptyStore();
        this.injected.users.emptyStore();
        this.injected.water.emptyStore();
        this.injected.wallet.emptyStore();
    };

    render() {
        if (this.injected.logged.is_logged && this.injected.profile.profile_isset) {
            return (
                <nav className = "navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="http://www.uwyo.edu/haub/_files/_images/academics/icons/minor.png" width="30" height="30" alt=""/>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link"><Link to={"/users"}>Users</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={"/home"}>Home</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={"/my_profile"}>Profile</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={"/devices"}>Devices</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><Link to={"/water"}>Water supply & Wallet</Link></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"><a href={"/logout"} onClick={this.logout}>Logout</a></a>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </div>
                    </div>
                </nav>
            )
        } else if (this.injected.logged.is_logged) {
            return (
                null
            )
        } else {
            return (
                <Redirect to={"/login"}/>
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