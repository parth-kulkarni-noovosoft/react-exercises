import { RouterContext, RouterView } from 'mobx-state-router';
import RootStoreContext from './context/RootStoreContext';
import { viewMap } from './routing';
import Navbar from './components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <RootStoreContext.Consumer>
      {(routerStore) => (
        <RouterContext.Provider value={routerStore.routerStore} >
          <Navbar />
          <RouterView viewMap={viewMap} />
        </RouterContext.Provider>
      )}
    </RootStoreContext.Consumer>
  );
}

export default App;
