import * as React from "react";
import {Route} from "react-router";
import {UserRoutes} from "./users";
import {NavBar} from "../components/NavBar";
import {Footer} from "../components/Footer";

export class MainRouter extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Route path={"/users"} component={UserRoutes}/>
                <Footer/>
            </div>
        )
    }
}