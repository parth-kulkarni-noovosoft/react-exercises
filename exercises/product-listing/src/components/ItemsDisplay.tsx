import { IProductInfo } from "../typings";
import ItemInfo from "./ItemInfo";

interface IItemsDisplayProps {
    items: IProductInfo[]
    addItemToCart: (id: number) => void
    removeFromCart: (id: number) => void
    cart: Set<number>
}

const ItemsDisplay: React.FC<IItemsDisplayProps> = ({ addItemToCart, items, removeFromCart, cart }) => {
    return <div className="items-display-container">
        {items.slice(0, 5).map(item => <ItemInfo 
            key={item.id}
            item={item}
            addItemToCart={() => addItemToCart(item.id)}
            removeFromCart={() => removeFromCart(item.id)}
            isAddedToCart={cart.has(item.id)}
        />)}
    </div>
}

export default ItemsDisplay;