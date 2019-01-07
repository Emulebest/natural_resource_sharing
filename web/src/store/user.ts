import {observable} from "mobx";

interface User {
    id: number,
    name: string
}

export class UserStore {
    @observable users: User[];

    constructor() {
        this.users = [];
    }

    createUser = () => {
        this.users.push({id: 1, name: "hello"})
    }
}