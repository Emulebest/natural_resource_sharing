import * as React from "react";
import {inject, observer} from "mobx-react";
import {ProfileStore} from "../store/profile";
import {httpWithHeaders} from "../utils/custom_http";
import {withRouter} from "react-router";
import "../styles/personalProfile.css"
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
        country: "",
        email: "",
        username: "",
        password: ""

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
            email: res.data.email,
            password: res.data.password,
            username: res.data.username,
        })

    }

    handleSubmit = async () => {
        const res = await httpWithHeaders().patch(`/profile/${this.injected.profile.profile_id}/`, {
            name: this.state.name,
            surname: this.state.surname,
            city: this.state.city,
            country: this.state.country,
            email: this.state.email
        });
    };

    render() {
        return (

            <div className="content py-5  bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <span className="anchor" id="formUserEdit"></span>

                            <div className="card card-outline-secondary">
                                <div className="card-header">
                                    <h3 className="mb-0">User Information</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form">
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">First
                                                name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={this.state.name}
                               onChange={(e) => this.setState({name: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Last
                                                name</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={this.state.surname}
                            onChange={(e) => this.setState({surname: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={this.state.email}
                                                       onChange={(e) => this.setState({email: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">City</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={this.state.city}
                                                       onChange={(e) => this.setState({city: e.target.value})}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Country</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value={this.state.country}
                       onChange={(e) => this.setState({country: e.target.value})}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Username</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="text" value="janeuser"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Password</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" value="11111122333"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                className="col-lg-3 col-form-label form-control-label">Confirm</label>
                                            <div className="col-lg-9">
                                                <input className="form-control" type="password" value="11111122333"/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-lg-3 col-form-label form-control-label"></label>
                                            <div className="col-lg-9">
                                                    <input type="button" className="btn btn-primary"
                                                           value="Save Changes" onClick={this.handleSubmit}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}


