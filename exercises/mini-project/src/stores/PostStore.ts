import { reaction } from "mobx";
import { IPost, IUser, Paginated, QueryData } from "../interfaces";
import Networking from "../networking";
import ListTableStore from "./ListTableStore";
import RootStore from "./RootStore";

class PostStore {
    postListingStore: ListTableStore<IPost>;

    constructor(
        public rootStore: RootStore
    ) {
        this.postListingStore = new ListTableStore('posts', this.getPosts);

        reaction(
            () => this.postListingStore.entities,
            (posts) => {
                const userStore = this.rootStore.userStore;
                Promise.all(
                    posts.map(post =>
                        userStore.userMap.has(post.userId)
                            ? null
                            : userStore.getUser(post.userId)
                    )
                ).then(users => userStore.updateMap(
                    users.filter((user): user is IUser => user !== null)
                ))
            }
        )
    }

    getPosts = (queryData: QueryData) => {
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