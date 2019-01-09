import {observable} from "mobx";

export class WalletStore {
    @observable id: number | null;
    @observable amount: number;
    @observable address: string | null;

    constructor() {
        this.amount = 0;
        this.address = null;
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
        this.address = null;
        this.id = null;
    }

    setAmount(amount: number) {
        this.amount = amount;
    }
}