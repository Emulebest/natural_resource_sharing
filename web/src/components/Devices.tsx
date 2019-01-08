import * as React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {DeviceStore} from "../store/devices";
import Modal from 'react-responsive-modal';
import {httpWithHeaders} from "../utils/custom_http";

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
            address_off: this.state.address_off,
            purpose: this.state.purpose,
            liter_per_second: this.state.liter_per_second
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
                <button onClick={this.onOpenModal}>Add new device</button>
                <Modal onClose={this.onCloseModal} open={this.state.createModal} center>
                    <input type="text" placeholder="Name" onChange={(e) => {this.setState({name: e.target.value})}}/>
                    <input type="text" placeholder="Address On" onChange={(e) => {this.setState({address_on: e.target.value})}}/>
                    <input type="text" placeholder="Address Off" onChange={(e) => {this.setState({address_off: e.target.value})}}/>
                    <input type="text" placeholder="Liters per second" onChange={(e) => {this.setState({liter_per_second: e.target.value})}}/>
                    <input type="textarea" placeholder="Purpose" onChange={(e) => {this.setState({purpose: e.target.value})}}/>
                    <button onClick={this.handleSubmit}>Submit</button>
                </Modal>

                {this.injected.devices.devices.map((device) => {
                    return (
                        <div>
                            <h2>{device.name}</h2>
                            <button onClick={(e) => {
                                this.setState({activeModal: device.id})
                            }}> Details
                            </button>
                            <button onClick={(e) => {
                                this.handleDeleteClick(device.id)
                            }}> Delete
                            </button>
                            <Modal onClose={this.Close} open={this.state.activeModal === device.id}>
                                <h2>Name: {device.name}</h2>
                                <h2>Address to on: {device.address_on}</h2>
                                <h2>Address to off: {device.address_off}</h2>
                                <h2>Purpose: {device.purpose}</h2>
                                <h2>Liter per second: {device.liter_per_second}</h2>
                            </Modal>
                        </div>
                    )
                })}
            </div>
        )
    }
}