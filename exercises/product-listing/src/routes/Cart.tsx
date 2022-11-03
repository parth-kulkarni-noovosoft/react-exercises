import CartDisplay from "../components/CartDisplay";
import useItems from "../hooks/useItems";
import useUserCart from "../hooks/useUserCart";

const Cart: React.FC = () => {
  const cart = useUserCart();
  const cartItemsArray = useItems(cart.getItemsID());

  return (
    <div className="container">
      <CartDisplay
        cartItems={cartItemsArray}
        removeFromCart={cart.removeItem}
      />
    </div>
  )
}

export default Cart;