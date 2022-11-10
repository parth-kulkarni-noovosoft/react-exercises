import OwnerStore from "./OwnerStore";
import PetStore from "./PetStore";

export default class RootStore {
    petStore: PetStore;
    ownerStore: OwnerStore;

    constructor() {
        this.ownerStore = new OwnerStore(this);
        this.petStore = new PetStore(this);
    }
}