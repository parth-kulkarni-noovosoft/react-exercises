import { makeObservable, observable } from "mobx";
import { IPost, Paginated } from "../interfaces";
import Networking from "../networking";
import ListTableStore from "./ListTableStore";
import RootStore from "./RootStore";

class PostStore {
    @observable post: IPost | null = null;
    postListingStore: ListTableStore<IPost>;

    constructor(
        public rootStore: RootStore
    ) {
        makeObservable(this);
        this.postListingStore = new ListTableStore(this.getPosts);
    }

    getPosts = async (pageNumber: number) => {
        const pageSize = 10;
        const url = `posts?limit=${pageSize}&skip=${(pageNumber - 1) * pageSize}`
        const data = await Networking.getData<Paginated<{ posts: IPost[] }>>(url);

        return {
            entities: data.posts,
            totalPages: data.total / pageSize
        };
    }
}

export default PostStore;