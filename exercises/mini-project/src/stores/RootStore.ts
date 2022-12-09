import PostStore from "./PostStore";
import ProductStore from "./ProductStore";

class RootStore {
    public productStore = new ProductStore(this);
    public postStore = new PostStore(this);
}

export default RootStore;