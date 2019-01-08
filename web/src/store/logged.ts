import {computed, observable} from "mobx";

export class LoggedStore {
    @observable current_username: string | null;
    @observable token: string | null;

    constructor() {
        this.current_username = null;
        this.token = null;
    }

    setUser(username: string, token: string) {
        this.current_username = username;
        this.token = token;
    }

    @computed get is_logged(): boolean {
        return this.current_username !== null && this.token !== null;
    }

    removeUser() {
        this.token = null;
        this.current_username = null;
    }
}