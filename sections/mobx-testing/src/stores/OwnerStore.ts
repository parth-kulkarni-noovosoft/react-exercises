import {action, computed, makeObservable, observable} from "mobx";
import RootStore from "./RootStore";

export interface IOwner {
    id: number;
    name: string;
}

export default class OwnerStore {
    @observable owners: IOwner[] = [];
    public rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @computed get count() {
        return this.owners.length;
    }

    @computed get nextID() {
        return this.owners.length + 1;
    }

    @action addOwner(owner: Omit<IOwner, 'id'>) {
        this.owners.push({
            ...owner,
            id: this.nextID
        });
    }

    @action deleteOwner(id: IOwner['id']) {
        const ownerIndex = this.owners.findIndex((owner) => owner.id === id);
        if (ownerIndex === -1) return;
        this.owners.splice(ownerIndex, 1);
        this.rootStore.petStore.pets
            .filter(pet => pet.owner?.id === id)
            .forEach(pet => (pet.owner = null));
    }
}