import React from "react";
import { IProductInfo } from "../typings";
import './ItemInfo.css';

interface IItemInfoProps {
    item: IProductInfo;
    addItemToCart: () => void;
    removeFromCart: () => void;
    isAddedToCart: boolean;
}

const ItemInfo: React.FC<IItemInfoProps> = ({ item, addItemToCart, isAddedToCart, removeFromCart }) => {
    const discountedPrice = ((item.price * (100 - item.discountPercentage))/100).toFixed(2); 
    
    return <div className="item-container">
        <div className="img-container">
            <img src={item.thumbnail} alt={item.title} />
        </div>
        <div className="details-container bordered">
            <span className="details__title">{item.title} ({item.brand})</span>
            <span>Price: ${discountedPrice} <s>(${item.price})</s></span>
            <span>Category: {item.category}</span>
            <span className="details__description">{item.description}</span>
        </div>
        <div className="cta-container bordered">
            <span className="details__rating">Rating {item.rating}</span>
            <button
                onClick={() => {
                    isAddedToCart ? removeFromCart() : addItemToCart()
                }}
                className={`btn ${isAddedToCart ? 'remove-btn' : 'add-btn'}`}
            >
                {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
    </div>
}

export default ItemInfo;