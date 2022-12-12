import PostStore from "./PostStore";
import ProductStore from "./ProductStore";
import UserStore from "./UserStore";

class RootStore {
    public productStore = new ProductStore(this);
    public postStore = new PostStore(this);
    public userStore = new UserStore(this);
}

export default RootStore;