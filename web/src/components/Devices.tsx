import * as React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {DeviceStore} from "../store/devices";
import Modal from 'react-responsive-modal';
import {httpWithHeaders} from "../utils/custom_http";
import "../styles/device.css"
interface Props {

}

interface InjectedProps extends Props {
    devices: DeviceStore
}

@inject("devices")
// @ts-ignore
@withRouter
@observer
export class Devices extends React.Component {
    get injected() {
        return this.props as InjectedProps
    }

    state = {
        createModal: false,
        activeModal: null,
        name: "",
        address_on: "",
        address_off: "",
        purpose: "",
        liter_per_second: null
    };

    onOpenModal = () => {
        this.setState({createModal: true});
    };

    onCloseModal = () => {
        this.setState({createModal: false});
    };

    Close = () => {
        this.setState({activeModal: null})
    };

    handleSubmit = async (): Promise<void> => {
        const res = await httpWithHeaders().post("/device/devices/", {
            name: this.state.name,
            address_on: this.state.address_on,
        });
        this.injected.devices.addDevice(res.data.id, res.data.name, res.data.address_on, res.data.address_off, res.data.purpose, res.data.liter_per_second)
    };

    handleDeleteClick = async (id: number): Promise<void> => {
        await httpWithHeaders().delete(`/device/${id}/`);
        this.injected.devices.removeDevice(id);
    };

    async componentDidMount(): Promise<void> {
        const res = await httpWithHeaders().get("/device/devices/");
        res.data.map(device => {
            this.injected.devices.addDevice(device.id, device.name, device.address_on, device.address_off, device.purpose, device.liter_per_second)
        })
    }

    render() {
        return (
            <div>
                <button className="btn btn-success my" onClick={this.onOpenModal}>Add new device</button>
                <br/>
                <br/>
                <div>
                <Modal onClose={this.onCloseModal} open={this.state.createModal} center>
                    <div>
                    <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Device Name</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your country if any."
                                   placeholder="Device Name" onChange={(e) => this.setState({name: e.target.value})}/>
                            </div>
                    <div className="col-xs-6">
                            <label htmlFor="first_name"><h4>Http address</h4></label>
                            <input type="text" className="form-control" name="first_name" id="first_name"
                                    title="enter your country if any."
                                   placeholder="192.168.1.1" onChange={(e) => {this.setState({address_on: e.target.value})}}/>
                            </div>
                    <div className="col-xs-6">
                    <br/>
                    <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Submit</button>
                    </div>
                    </div>
                </Modal>
                </div>

                {this.injected.devices.devices.map((device) => {
                    return (
                        <div >
                        <div className="col-sm-4">
                            <div className="card mb">
                                <img className="card-img-top" src="http://www.placehold.it/286x180"
                                     alt="Card image cap"/>
                                    <div className="card-body mb">
                                        <h5 className="card-title">{device.name}</h5>
                                        <p className="card-text">Device device</p>
                                        <button type="button" className="btn btn-success mb" onClick={(e) => {
                                this.setState({activeModal: device.id})}}> Details</button>
                                        <button type="button" className="btn btn-success mb" onClick={(e) => {
                                this.handleDeleteClick(device.id)}}> Delete</button>
                                    </div>
                            <Modal onClose={this.Close} open={this.state.activeModal === device.id}>
                                <label><h2>Name: {device.name}</h2></label>
                                <h2>Address: {device.address_on}</h2>
                            </Modal>
                        </div>
                        </div>
                        </div>

                    )
                })}
            </div>

        )
    }
}