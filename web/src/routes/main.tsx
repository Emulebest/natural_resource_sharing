import * as React from "react";
import {Route, withRouter} from "react-router";
import {UserRoutes} from "./users";
import {NavBar} from "../components/NavBar";
import {Footer} from "../components/Footer";
import {Login} from "../components/Login";
import {Register} from "../components/Register";
import {Profile} from "../components/Profile";
import {Home} from "../components/Home";
import {PrivateRoute} from "./private";
import {PersonalProfile} from "../components/PersonalProfile";
import {observer} from "mobx-react";
import {Devices} from "../components/Devices";

// @ts-ignore
@withRouter
@observer
export class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <PrivateRoute path={"/users"} component={UserRoutes}/>
                <PrivateRoute path={"/my_profile"} component={PersonalProfile}/>
                <PrivateRoute component={Devices} path={"/devices"}/>
                <Route path={"/login"} component={Login}/>
                <Route path={"/register"} component={Register}/>
                <Route path={"/profile"} component={Profile}/>
                <PrivateRoute path={"/home"} component={Home}/>
                <Footer/>
            </div>
        )
    }
}