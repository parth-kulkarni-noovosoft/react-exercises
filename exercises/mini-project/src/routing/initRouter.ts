import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    RouterStore
} from 'mobx-state-router'

export const routes = [
    {
        name: 'listings',
        pattern: '/listings/:id?'
    },
    {
        name: 'forms',
        pattern: '/forms/:id?'
    },
    {
        name: 'notFound',
        pattern: '/notFound'
    }
];

const notFound = createRouterState('notFound');

export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);
    
    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}