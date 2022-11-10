import React from "react";
import RootStore from "../stores/RootStore";

interface IAppContextProviderProps {
    children: React.ReactNode
    rootStore: RootStore
}

export const StoreContext = React.createContext<RootStore | null>(null);

class AppContextProvider extends React.Component<IAppContextProviderProps> {
    constructor(props: IAppContextProviderProps) {
        super(props);
    }

    render(): React.ReactNode {
        return <StoreContext.Provider value={this.props.rootStore} >
            {this.props.children}
        </StoreContext.Provider>
    }
}

export default AppContextProvider;