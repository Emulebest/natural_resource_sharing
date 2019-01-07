import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observer, Provider} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {appState} from "./store/main";
import {MainRouter} from "./routes/main";
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(
    <Provider {...appState}>
        <>
            <BrowserRouter>
                <MainRouter/>
            </BrowserRouter>
            <DevTools/>
        </>
    </Provider>,
    document.getElementById('root')
);
