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

    emptyStore() {
        this.amount = 0;
        this.address = null;
        this.id = null;
    }

    setAmount(amount: number) {
        this.amount = WalletStore.wei_to_eth(amount);
    }

    static wei_to_eth(amount: number): number {
        return amount / 1000000000000000000
    }

    setId(id: number) {
        this.id = id;
    }
}