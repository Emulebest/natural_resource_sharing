import {observable} from "mobx";

export class WaterStore {
    @observable id: number | null;
    @observable amount: number;

    constructor() {
        this.amount = 0;
        this.id = null;
    }

    add(amount: number) {
        this.amount += amount
    }

    substract(amount: number) {
        this.amount -= amount
    }

    emptyStore() {
        this.amount = 0;
        this.id = null;
    }

    setAmount(amount: number) {
        this.amount = amount;
    }

}