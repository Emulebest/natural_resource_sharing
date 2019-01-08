import {observable} from "mobx";

export class ProfileStore {
    @observable profile_id: number | null;

    constructor() {
        this.profile_id = null;
    }

    setProfile(id: number) {
        this.profile_id = id;
    }

}