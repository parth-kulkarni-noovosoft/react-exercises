import {action, computed, makeObservable, observable} from "mobx";
import RootStore from "./RootStore";
import {IOwner} from "./OwnerStore";

export interface IPet {
    id: number;
    name: string;
    owner: null | IOwner;
}

export default class PetStore {
    @observable pets: IPet[] = [];
    public rootStore: RootStore;

    constructor(rootStore: RootStore) {
        makeObservable(this);
        this.rootStore = rootStore;
    }

    @computed get count() {
        return this.pets.length;
    }

    @computed get nextID() {
        return this.pets.length + 1;
    }

    @action addPet(pet: { name: string, ownerID: number | null }) {
        const owner = this.rootStore.ownerStore.owners.find(owner => owner.id === pet.ownerID) ?? null;
        this.pets.push({
            name: pet.name,
            owner,
            id: this.nextID
        });
    }

    @action deletePet(id: IPet['id']) {
        const petIndex = this.pets.findIndex((pet) => pet.id === id);
        if (petIndex === -1) return;
        this.pets.splice(petIndex, 1);
    }

    @action assignPetOwner(petID: IPet['id'], ownerID: IOwner['id']) {
        const petIndex = this.pets.findIndex((pet) => pet.id === petID);
        if (petIndex === -1) return;

        const ownerIndex = this.rootStore.ownerStore.owners
            .findIndex((owner) => owner.id === ownerID);
        if (ownerIndex === -1) return;

        this.pets[petIndex].owner = this.rootStore.ownerStore.owners[ownerIndex];
    }
}