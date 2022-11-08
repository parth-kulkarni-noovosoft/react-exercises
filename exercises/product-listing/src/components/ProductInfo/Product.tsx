import React from "react";
import { IProductInfo } from "../../types";
import './Product.css';

interface IProductProps {
    product: IProductInfo;
    addProductToCart: () => void;
    removeProductFromCart: () => void;
    isAddedToCart: boolean;
}

const Product: React.FC<IProductProps> = ({ product, addProductToCart, isAddedToCart, removeProductFromCart }) => {
    const discountedPrice = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(2);

    return <div className="products-container">
        <div className="img-container bordered">
            <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="details-container bordered">
            <span className="details__title">{product.title} ({product.brand})</span>
            <span>Price: ${discountedPrice} <s>(${product.price})</s></span>
            <span>Category: {product.category}</span>
            <span className="details__description">{product.description}</span>
        </div>
        <div className="cta-container bordered">
            <span className="details__rating">Rating {product.rating}</span>
            <button
                onClick={() => {
                    isAddedToCart ? removeProductFromCart() : addProductToCart()
                }}
                className={`btn ${isAddedToCart ? 'remove-btn' : 'add-btn'}`}
            >
                {isAddedToCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
        </div>
    </div>
}

export default Product;