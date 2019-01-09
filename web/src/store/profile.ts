import {computed, observable} from "mobx";

export class ProfileStore {
    @observable profile_id: number | null;

    constructor() {
        this.profile_id = null;
    }

    setProfile(id: number) {
        this.profile_id = id;
    }

    @computed get profile_isset(): boolean {
        return this.profile_id !== null;
    }

    emptyStore() {
        this.profile_id = null;
    }
}