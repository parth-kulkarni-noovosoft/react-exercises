import React from 'react';
import RootStore from '../stores/RootStore';
import { initRouter } from '../routing/initRouter';

const routerStore = initRouter()
const rootStore = new RootStore(routerStore);

const RootStoreContext = React.createContext<RootStore>(rootStore);

export default RootStoreContext;