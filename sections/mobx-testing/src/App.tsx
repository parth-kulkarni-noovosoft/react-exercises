import React from 'react';
import {RouterContext, RouterView} from "mobx-state-router";
import {initRouter, viewMap} from "./initRouter";

import './index.css';

const App = () => {
    const routerStore = initRouter();

    return (
        <RouterContext.Provider value={routerStore}>
            <RouterView viewMap={viewMap} />
        </RouterContext.Provider>
    )
}

export default App;