import {observable} from "mobx";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import {routingStore} from "./routing";
import {UserStore} from "./user";
import {LoggedStore} from "./logged";
import {ProfileStore} from "./profile";
import {DeviceStore} from "./devices";


export const appState = {
    routing: new RouterStore(),
    users: new UserStore(),
    logged: new LoggedStore(),
    profile: new ProfileStore(),
    devices: new DeviceStore()
};