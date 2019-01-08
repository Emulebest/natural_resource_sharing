import * as React from "react";
import {httpWithHeaders} from "../utils/custom_http";
import {inject, observer} from "mobx-react";
import {ProfileStore} from "../store/profile";
import {Redirect} from "react-router-dom"
import {withRouter} from "react-router";

interface Props {

}

interface InjectedProps extends Props {
    profile: ProfileStore
}

@inject("profile")
// @ts-ignore
@withRouter
@observer
export class Profile extends React.Component<Props> {
    get injected() {
        return this.props as InjectedProps;
    }

    state = {
        has_profile: false,

        name: "",
        surname: "",
        city: "",
        country: ""
    };

    handleSubmit = async () => {
        const res = await httpWithHeaders().post("/profile/profiles/", {
            name: this.state.name,
            surname: this.state.surname,
            city: this.state.city,
            country: this.state.country
        });
        this.setState({has_profile: true})
    };

    render() {
        if (this.state.has_profile) {
            return (
                <Redirect to={"/home"}/>
            )
        } else {
            return (
                <div>
                    <input type="text" placeholder="Name" onChange={(e) => this.setState({name: e.target.value})}/>
                    <input type="text" placeholder="Surname" onChange={(e) => this.setState({surname: e.target.value})}/>
                    <input type="text" placeholder="City" onChange={(e) => this.setState({city: e.target.value})}/>
                    <input type="text" placeholder="Country" onChange={(e) => this.setState({country: e.target.value})}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            )
        }
    }

    async componentDidMount(): Promise<void> {
        const res = await httpWithHeaders().get("/profile/exists/");
        if (res.data.result) {
            this.setState({has_profile: true});
            this.injected.profile.setProfile(res.data.id);
        }
    }
}