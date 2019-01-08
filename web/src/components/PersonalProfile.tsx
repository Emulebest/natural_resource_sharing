import * as React from "react";
import {inject, observer} from "mobx-react";
import {ProfileStore} from "../store/profile";
import {httpWithHeaders} from "../utils/custom_http";
import {withRouter} from "react-router";

interface Props {

}

interface InjectedProps {
    profile: ProfileStore
}

@inject("profile")
// @ts-ignore
@withRouter
@observer
export class PersonalProfile extends React.Component<Props> {
    state = {
        name: "",
        surname: "",
        city: "",
        country: ""
    };

    get injected() {
        return this.props as InjectedProps
    }

    async componentDidMount(): Promise<void> {
        const res = await httpWithHeaders().get(`/profile/${this.injected.profile.profile_id}/`);
        this.setState({
            name: res.data.name,
            surname: res.data.surname,
            city: res.data.city,
            country: res.data.country,
        })

    }

    handleSubmit = async () => {
        const res = await httpWithHeaders().patch(`/profile/${this.injected.profile.profile_id}/`, {
            name: this.state.name,
            surname: this.state.surname,
            city: this.state.city,
            country: this.state.country
        });
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                <input type="text" value={this.state.surname}
                       onChange={(e) => this.setState({surname: e.target.value})}/>
                <input type="text" value={this.state.city} onChange={(e) => this.setState({city: e.target.value})}/>
                <input type="text" value={this.state.country}
                       onChange={(e) => this.setState({country: e.target.value})}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}