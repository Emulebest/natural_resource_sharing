import * as React from "react";
import {withRouter} from "react-router";
import {observer} from "mobx-react";

// @ts-ignore
@withRouter
@observer
export class Home extends React.Component {
    render() {
        return (
            <div>
                Hello I am Home Page!
            </div>
        )
    }
}