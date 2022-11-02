import { useReducer } from "react";
import CartDisplay from "./components/CartDisplay";
import ItemsDisplay from "./components/ItemsDisplay";
import Navbar from "./components/Navbar";
import UserContext from "./context/user";
import useItems from "./hooks/useItems";
import useSearchQuery from "./hooks/useSearchQuery";
import useUserCart from "./hooks/useUserCart";
import propertiesReducer from "./reducers/propertiesReducer";

const App: React.FC = () => {
  const [properties, dispatch] = useReducer(propertiesReducer, {
    category: 'All',
    query: '',
    userID: 5
  })

  const items = useSearchQuery(properties.query, properties.category);
  const cart = useUserCart(properties.userID);
  const cartItemsArray = useItems(cart.getItems());

  return (
    <UserContext.Provider value={properties.userID}>
      <div className="container">
        <Navbar 
          properties={properties}
          dispatch={dispatch}
          cartSize={cartItemsArray.length}
        />
        <ItemsDisplay
          items={items}
          addItemToCart={cart.addItem}
          removeFromCart={cart.removeItem}
          cart={cart.getItems()}
        />
        <CartDisplay
          items={cartItemsArray}
          removeFromCart={cart.removeItem}
        />
      </div>
    </UserContext.Provider>
  )
}
export default App
