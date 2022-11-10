import React from 'react';
import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    Route,
    RouterStore,
} from 'mobx-state-router';
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import EntityForm from "./components/EntityForm";

const notFound = createRouterState('notFound');

const routes: Route[] = [
    {
        name: 'home',
        pattern: '/'
    },
    {
        name: 'notFound',
        pattern: '/notFound'
    },
    {
        name: 'createPet',
        pattern: '/create-pet'
    },
    {
        name: 'createOwner',
        pattern: '/create-owner'
    }
];

export const viewMap = {
    home: <Home />,
    notFound: <NotFound />,
    createOwner: <EntityForm type='owner' />,
    createPet: <EntityForm type='pet' />,
};

export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);

    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}