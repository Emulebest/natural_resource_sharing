import {observable} from "mobx";
import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import {routingStore} from "./routing";
import {LoggedStore} from "./logged";
import {ProfileStore} from "./profile";
import {DeviceStore} from "./devices";
import {WaterStore} from "./water";
import {WalletStore} from "./wallet";
import {MarketStore} from "./market";


export const appState = {
    routing: new RouterStore(),
    logged: new LoggedStore(),
    profile: new ProfileStore(),
    devices: new DeviceStore(),
    water: new WaterStore(),
    wallet: new WalletStore(),
    market: new MarketStore()
};