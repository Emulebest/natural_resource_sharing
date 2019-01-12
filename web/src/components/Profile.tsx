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
        this.setState({has_profile: true});
        this.injected.profile.setProfile(res.data.id);
    };

    render() {
        if (this.state.has_profile) {
            return (
                <Redirect to={"/home"}/>
            )
        } else {
            return (












                <div className="form" id="registrationForm">
                <div>
                    <div className="form-group">

                        <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Name</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your first name if any."
                                   placeholder="Name" onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="col-xs-6">
                            <label htmlFor="second_name"><h4>Surname</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your second name if any."
                                   placeholder="Surname" onChange={(e) => this.setState({surname: e.target.value})}/>
                        </div>
                        <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>City</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your city if any."
                                   placeholder="City" onChange={(e) => this.setState({city: e.target.value})}/>
                        </div>
                        <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Country</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your country if any."
                                   placeholder="Country" onChange={(e) => this.setState({country: e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                            <br/>
                                <button className="btn btn-lg btn-success" type="submit"><i
                                    className="glyphicon glyphicon-ok-sign" onClick={this.handleSubmit}></i> Save
                                </button>
                        </div>
                    </div>

                </div>
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