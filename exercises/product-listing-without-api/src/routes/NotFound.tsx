import React from "react";
import { StoreContext } from '../context/AppContext';

class NotFound extends React.Component {
    declare context: React.ContextType<typeof StoreContext>
    static contextType = StoreContext;

    render(): React.ReactNode {
        return <div>
            Page Not Found
            <button onClick={() => this.context?.routerStore.goTo('home')}>Go back Home</button>
        </div>
    }
}

export default NotFound;