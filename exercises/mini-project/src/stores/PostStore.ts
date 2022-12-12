import { IPost, Paginated, QueryData } from "../interfaces";
import Networking from "../networking";
import ListTableStore from "./ListTableStore";
import RootStore from "./RootStore";

class PostStore {
    postListingStore: ListTableStore<IPost>;

    constructor(
        public rootStore: RootStore
    ) {
        this.postListingStore = new ListTableStore('posts', this.getPosts);
    }

    getPosts = async (queryData: QueryData) => {
        const {
            pageNumber,
            pageSize
        } = queryData;

        const searchParams = new URLSearchParams({
            limit: pageSize.toString(),
            skip: ((pageNumber - 1) * pageSize).toString()
        });

        const url = `posts/?${searchParams.toString()}`;

        return Networking.getData<Paginated<IPost>>(url);
    }
}

export default PostStore;