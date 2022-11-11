import { StoreContext } from '../context/AppContext';
import { observer } from 'mobx-react';
import React from 'react';
import Product from './Product';
import { ICartProduct, IProduct } from '../interfaces';

interface IProductListingProps {
    isCart?: boolean
}

@observer
class ProductListing extends React.Component<IProductListingProps> {
    context: React.ContextType<typeof StoreContext> | undefined
    static contextType = StoreContext;

    render(): React.ReactNode {
        const { cartStore, productStore } = this.context!;

        const store = this.props.isCart ? cartStore : productStore;

        const getQtyInCart = (id: number) => cartStore.getProductQuantity(id);
        const incQty = (id: number) => cartStore.changeProductQuantity(id, 1);
        const decQty = (id: number) => cartStore.changeProductQuantity(id, -1);

        if (store.count === 0) {
            return <h2>No Products to display</h2>
        }

        const cartListingLabels = ['Name', 'Discounted price', 'Quantity in cart']
        const homeListingLabels = ['Name', 'Category', 'Price', 'Description', 'Quantity', 'Add to cart']

        const toHideForSmallerScreens = ['Description', 'Category'];

        return <table>
            <tbody>
                <tr>
                    {(this.props.isCart ? cartListingLabels : homeListingLabels)
                            .map(label => <th
                                    key={label}
                                    className={toHideForSmallerScreens.includes(label) ? 'hide': ''}
                                >{label}</th>)
                    }
                </tr>
                {store.products.map(product => {
                    if (this.props.isCart) {
                        return <Product
                            isCart={true}
                            key={product.id}
                            product={product as ICartProduct}
                        />
                    }

                    return <Product
                        decQty={() => decQty(product.id)}
                        incQty={() => incQty(product.id)}
                        getQtyInCart={() => getQtyInCart(product.id)}
                        product={product as IProduct}
                        key={product.id}
                    />
                })}
            </tbody>
        </table>
    }
}

export default ProductListing;