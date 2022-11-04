import React from "react";
import { IProductInfo } from "../typings";
import ItemInfo from "./ItemInfo";
import Paginator from "./Paginator";

interface IItemsDisplayProps {
    products: IProductInfo[]
    addItemToCart: (id: number) => void
    removeFromCart: (id: number) => void
    cart: number[]
}

const ItemsDisplay: React.FC<IItemsDisplayProps> = ({ addItemToCart, products, removeFromCart, cart }) => {
    return <div className="items-display-container">
        <Paginator items={products}>
            {items => <>{items.length === 0 ? <div>Query has no results</div> : null}
                {items.map(item => <ItemInfo
                    key={item.id}
                    item={item}
                    addItemToCart={() => addItemToCart(item.id)}
                    removeFromCart={() => removeFromCart(item.id)}
                    isAddedToCart={cart.includes(item.id)}
                />)}
            </>
            }
        </Paginator>

    </div>
}

export default ItemsDisplay;