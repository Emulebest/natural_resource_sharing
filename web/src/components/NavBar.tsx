import * as React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom"
import "../styles/navbar.css"
import {LoggedStore} from "../store/logged";
import {ProfileStore} from "../store/profile";
import {httpWithHeaders} from "../utils/custom_http";
import {Redirect, withRouter} from "react-router";
import {DeviceStore} from "../store/devices";
import {WaterStore} from "../store/water";
import {WalletStore} from "../store/wallet";
import {MarketStore} from "../store/market";

interface Props {

}

interface InjectedProps extends Props {
    logged: LoggedStore,
    profile: ProfileStore,
    devices: DeviceStore,
    water: WaterStore,
    wallet: WalletStore,
    market: MarketStore
}

@inject("logged", "profile", "devices", "water", "wallet", "market")
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
        this.injected.water.emptyStore();
        this.injected.wallet.emptyStore();
        this.injected.market.emptyStore();
    };

    render() {
        if (this.injected.logged.is_logged && this.injected.profile.profile_isset) {
            return (
                <>
                    <h1>
                        I am nav bar
                    </h1>
                    <ul>
                        <li><Link to={"/market"}>Market</Link></li>
                        <li><Link to={"/home"}>Home</Link></li>
                        <li><Link to={"/my_profile"}>Profile</Link></li>
                        <li><Link to={"/devices"}>Devices</Link></li>
                        <li><Link to={"/water"}>Water supply & Wallet</Link></li>
                        <li><a href={"/logout"} onClick={this.logout}>Logout</a></li>
                    </ul>
                </>
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