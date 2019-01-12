import {observable} from "mobx";
import {httpWithHeaders} from "../utils/custom_http";


interface Transaction {
    id: number,
    owner: any,
    mode: string,
    price: number,
    amount: number
    status: string
}

export class MarketStore {
    @observable pending: Transaction[];

    constructor() {
        this.pending = [];
    }

    getPending = async (): Promise<Transaction[]> => {
        const transactions = await httpWithHeaders().get("/transaction/transactions/");
        this.pending = transactions.data;
        return this.pending;
    };

    getActive(username: string): Transaction[] {
        return this.pending.filter(request => request.status !== "closed" && request.owner.username !== username)
    }

    sendTransaction = async (id: number) => {
        const result = await httpWithHeaders().post("/transaction/send/", {
            req: id
        });
    };

    emptyStore() {
        this.pending = [];
    }
}