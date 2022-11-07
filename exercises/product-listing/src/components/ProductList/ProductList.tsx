import React from 'react';
import { IProductInfo } from "../../types";
import Paginator from "../Helpers/Paginator";
import Product from "../ProductInfo/Product";

interface IProductListProps {
    products: IProductInfo[]
    addProductToCart: (id: number) => void
    removeProductFromCart: (id: number) => void
    isAlreadyAdded: (id: number) => boolean
}

const ProductList: React.FC<IProductListProps> = ({
    products,
    addProductToCart,
    removeProductFromCart,
    isAlreadyAdded
}) => {
    return (
        <Paginator elements={products}>
            {slicedProducts => (<>
                {slicedProducts.length === 0 ? <div>Query has no results</div> : null}
                {slicedProducts.map(product => <Product
                    key={product.id}
                    product={product}
                    addProductToCart={() => addProductToCart(product.id)}
                    removeProductFromCart={() => removeProductFromCart(product.id)}
                    isAddedToCart={isAlreadyAdded(product.id)}
                />)}
            </>)}
        </Paginator>
    )
}

export default ProductList;