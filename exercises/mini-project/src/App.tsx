import { Container } from 'reactstrap';
import './App.css';
import PostListing from './components/listings/PostListing';
import ProductListing from './components/listings/ProductListing';
import UserListing from './components/listings/UserListing';
import RootStoreContextProvider from './context/RootStoreContext';

function App() {
  return (
    <RootStoreContextProvider>
      <Container className='my-4 p-2'>
        <ProductListing />
        <UserListing />
        <PostListing />
      </Container>
    </RootStoreContextProvider>
  );
}

export default App;
