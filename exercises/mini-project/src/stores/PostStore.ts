import { makeObservable, observable } from "mobx";
import { IPost, Paginated, QueryData } from "../interfaces";
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
        this.postListingStore = new ListTableStore('posts', this.getPosts);
    }

    getPosts = async (queryData: QueryData) => {
        const {
            pageNumber,
            pageSize,
            searchQuery
        } = queryData;

        const queryParams = `limit=${pageSize}&skip=${(pageNumber - 1) * pageSize}`;
        const url = searchQuery === ''
            ? `posts?${queryParams}`
            : `posts/search?q=${searchQuery}&${queryParams}`;

        return Networking.getData<Paginated<IPost>>(url);
    }
}

export default PostStore;