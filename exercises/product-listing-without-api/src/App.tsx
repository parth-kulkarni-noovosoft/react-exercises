import React from "react";
import { RouterContext, RouterView } from 'mobx-state-router';
import RootStore from "./stores/RootStore";
import initStore from "./stores";
import viewMap from "./routes";
import AppContextProvider from "./context/AppContext";

class App extends React.Component {
    rootStore: RootStore;

    constructor(props: {}) {
        super(props);
        this.rootStore = initStore();
    }

    render(): React.ReactNode {
        return (
            <AppContextProvider rootStore={this.rootStore}>
                {/* Should this be inside App Context Provider? */}
                <RouterContext.Provider value={this.rootStore.routerStore}>
                    <RouterView viewMap={viewMap} />
                </RouterContext.Provider>
            </AppContextProvider>
        )
    }
}

export default App;