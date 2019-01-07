import {RouterStore, syncHistoryWithStore} from "mobx-react-router"
import createBrowserHistory from "history/createBrowserHistory";

export const routingStore = new RouterStore();

const browserHistory = createBrowserHistory();

export const history = syncHistoryWithStore(browserHistory, routingStore);
