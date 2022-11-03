import { useReducer } from "react";
import ItemsDisplay from "../components/ItemsDisplay";
import Navbar from "../components/Navbar";
import useSearchQuery from "../hooks/useSearchQuery";
import useUserCart from "../hooks/useUserCart";
import propertiesReducer from "../reducers/propertiesReducer";

const App: React.FC = () => {
  const [properties, dispatch] = useReducer(propertiesReducer, {
    category: 'All',
    query: '',
  })

  const items = useSearchQuery(properties.query, properties.category);
  const cart = useUserCart();

  return (
    <div className="container">
      <Navbar
        properties={properties}
        dispatch={dispatch}
        cartSize={cart.getItemsID().size}
      />
      <ItemsDisplay
        items={items}
        addItemToCart={cart.addItem}
        removeFromCart={cart.removeItem}
        cart={cart.getItemsID()}
      />
    </div>
  )
}
export default App
