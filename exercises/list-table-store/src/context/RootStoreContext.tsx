import React from 'react';
import RootStore from '../stores/RootStore';

const rootStore = new RootStore();

export const RootStoreContext = React.createContext<RootStore>(rootStore);

class RootStoreContextProvider extends React.Component<React.PropsWithChildren> {
    render(): React.ReactNode {
        return(
            <RootStoreContext.Provider value={rootStore}>
                {this.props.children}
            </RootStoreContext.Provider>
        )
    }
}

export default RootStoreContextProvider;