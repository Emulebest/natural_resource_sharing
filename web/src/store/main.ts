import {observable} from "mobx";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import {routingStore} from "./routing";
import {UserStore} from "./user";


export const appState = {
    routing: new RouterStore(),
    users: new UserStore(),
};