import * as React from "react";
import {Route, RouteComponentProps} from "react-router";
import {UsersComponent} from "../components/Users";
import {SingleUserComponent} from "../components/User";
import {NavBar} from "../components/NavBar";

export class UserRoutes extends React.Component<RouteComponentProps> {
    render(): React.ReactNode {
        return (
            <>
                <Route exact path={`${this.props.match.url}/`} component={UsersComponent}/>
                <Route path={`${this.props.match.url}/:userId`} component={SingleUserComponent}/>
            </>
        )
    }
}