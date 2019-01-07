import * as React from "react";
import {inject, observer} from "mobx-react";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import {UserStore} from "../store/user";
import {Link} from "react-router-dom"
import "../styles/navbar.css"

interface Params {

}

interface InjectedParams extends Params {
    routing: RouterStore;
    users: UserStore,
}

@inject("routing")
@observer
export class NavBar extends React.Component<Params, {}> {
    get injected() {
        return this.props as InjectedParams
    }

    render() {
        return (
            <>
                <h1>
                    I am nav bar
                </h1>
                <ul>
                    <li><Link to={"/users"}>Users</Link></li>

                </ul>
            </>
        )
    }
}