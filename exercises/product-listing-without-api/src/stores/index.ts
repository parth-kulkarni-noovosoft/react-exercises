import { configure } from "mobx";
import RootStore from "./RootStore";
import {
    browserHistory,
    HistoryAdapter,
    type Route
} from 'mobx-state-router';

const routes: Route[] = [
    {
        name: 'addProduct',
        pattern: '/add-product'
    },
    {
        name: 'notFound',
        pattern: '/not-found'
    },
    {
        name: 'home',
        pattern: '/'
    },
    {
        name: 'cart',
        pattern: '/cart'
    }
]

const initStore = () => {
    configure({ enforceActions: 'observed' });
    const rootStore = new RootStore(routes);

    const historyAdapter = new HistoryAdapter(rootStore.routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return rootStore;
}

export default initStore;