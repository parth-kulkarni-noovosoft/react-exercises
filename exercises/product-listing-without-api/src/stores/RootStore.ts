import CartStore from './CartStore';
import ProductStore from './ProductStore';
import {
    RouterStore,
    createRouterState,
    type Route
} from 'mobx-state-router';
import FormStore from './Forms';


export default class RootStore {
    public productStore: ProductStore;
    public cartStore: CartStore;
    public routerStore: RouterStore;
    public formStore: FormStore;

    constructor(routes: Route[]) {
        this.productStore = new ProductStore(this);
        this.cartStore = new CartStore(this);
        this.formStore = new FormStore(this);

        this.routerStore = new RouterStore(
            routes,
            createRouterState('notFound'),
            {
                rootStore: this
            }
        );
    }
}