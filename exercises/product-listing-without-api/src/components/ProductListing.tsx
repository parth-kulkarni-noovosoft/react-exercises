import { StoreContext } from '../context/AppContext';
import { observer } from 'mobx-react';
import React from 'react';
import Product from './Product';
import { IProduct } from '../interfaces';

interface IProductListingProps {
    isCart?: boolean
}

@observer
class ProductListing extends React.Component<IProductListingProps> {
    context: React.ContextType<typeof StoreContext> | undefined
    static contextType = StoreContext;

    render(): React.ReactNode {
        const { cartStore, productStore } = this.context!;

        let products: IProduct[];
        if (this.props.isCart) {
            products = cartStore.products.map(product => product.productData);
        } else {
            products = productStore.products;
        }

        if (products.length === 0) {
            return <h2>No Products to display</h2>
        }

        const cartListingLabels = ['Name', 'Discounted price', 'Quantity in cart']
        const homeListingLabels = ['Name', 'Category', 'Price', 'Description', 'Quantity', 'Add to cart']

        const toHideForSmallerScreens = ['Description', 'Category'];

        return (
            <table>
                <tbody>
                    <tr>
                        {(this.props.isCart ? cartListingLabels : homeListingLabels)
                            .map(label => <th
                                key={label}
                                className={toHideForSmallerScreens.includes(label) ? 'hide' : ''}
                            >{label}</th>)
                        }
                    </tr>
                    {products.map(product => {
                        return <Product
                            isCart={this.props.isCart ?? false}
                            key={product.id}
                            getQtyInCart={() => cartStore.getProductQuantity(product.id)}
                            changeQty={(v: number) => cartStore.setProductQuantity(product.id, v)}
                            product={product}
                        />
                    })}
                </tbody>
            </table>
        )
    }
}

export default ProductListing;