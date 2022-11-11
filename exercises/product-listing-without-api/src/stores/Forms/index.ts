import RootStore from "../RootStore";
import AddProductStore from "./AddProduct";

export default class FormStore {
    addProductStore: AddProductStore;

    constructor(
        public rootStore: RootStore
    ) {
        this.addProductStore = new AddProductStore(rootStore);
    }
}