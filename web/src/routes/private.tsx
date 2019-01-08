import * as React from "react";
import {inject, observer} from "mobx-react";
import {LoggedStore} from "../store/logged";
import {Route, Redirect} from "react-router-dom"
import {RouteComponentProps, withRouter} from "react-router";

interface Props {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
    path: string
}

interface InjectedProps extends Props {
    logged: LoggedStore
}

@inject("logged")
// @ts-ignore
@withRouter
@observer
export class PrivateRoute extends React.Component<Props> {
    get injected() {
        return this.props as InjectedProps
    }

    render() {
        if (localStorage.getItem("token") !== null && localStorage.getItem("username") !== null) {
            return <Route path={this.props.path} component={this.props.component}/>
        } else {
            return <Redirect to={"/login"}/>
        }
    }
}