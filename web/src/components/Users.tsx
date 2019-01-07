import {inject, observer} from "mobx-react";
import {UserStore} from "../store/user";
import * as React from "react";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import {NavBar} from "./NavBar";

interface MyProps {
    msg: string
}

interface InjectedProps extends MyProps {
    users: UserStore,
    routing: RouterStore;
}


@inject("users")
@observer
export class UsersComponent extends React.Component<MyProps, {}> {
    get injected() {
        return this.props as InjectedProps;
    }

    render() {
        const {createUser} = this.injected.users;

        return (
            <div>
                <button onClick={createUser}>Add users</button>
                {this.injected.users.users.map(user => {
                    return (<div>{user.name}</div>)
                })}
            </div>
        )

    }
}