import AddProductStore from "./AddProduct";

export default class FormStore {
    addProductStore: AddProductStore;

    constructor() {
        this.addProductStore = new AddProductStore();
    }
}