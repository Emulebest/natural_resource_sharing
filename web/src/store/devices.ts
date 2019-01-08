import {observable} from "mobx";

interface Device {
    id: number
    name: string;
    address_on: string;
    address_off: string;
    purpose: string,
    liter_per_second: number
}

export class DeviceStore {
    @observable devices: Device[];

    constructor() {
        this.devices = [];
    }

    addDevice(id: number, name: string, on: string, off: string, purpose: string, liter_per_second: number) {
        this.devices.push({id: id, name: name, address_on: on, address_off: off, purpose: purpose, liter_per_second: liter_per_second})
    }

    removeDevice(id: number) {
        const idx = this.devices.findIndex(device => {
            return device.id === id;
        });
        this.devices.splice(idx, 1)
    }

    emptyStore() {
        this.devices = [];
    }
}