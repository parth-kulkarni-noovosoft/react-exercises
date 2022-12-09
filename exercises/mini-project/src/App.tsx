import { Container } from 'reactstrap';
import './App.css';
import PostListing from './components/PostListing';
import ProductListing from './components/ProductListing';
import RootStoreContextProvider from './context/RootStoreContext';

function App() {
  return (
    <RootStoreContextProvider>
      <Container className='my-4 p-2'>
        <ProductListing />
        <PostListing />
      </Container>
    </RootStoreContextProvider>
  );
}

export default App;
