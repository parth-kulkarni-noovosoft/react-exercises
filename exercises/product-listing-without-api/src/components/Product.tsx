import { observer } from "mobx-react";
import React from "react";
import { IProduct } from "../interfaces";
import QuantityWidget from "./QuantityWidget";

interface IProductProps {
    isCart: boolean;
    product: IProduct;
    getQtyInCart: () => number;
    changeQty: (v: number) => void;
}

@observer
class Product extends React.Component<IProductProps> {
    render(): React.ReactNode {
        const productData = this.props.product;

        const productQtyInCart = this.props.getQtyInCart();
        const widget = (<td>
            <QuantityWidget
                setValue={(v) => {
                    if (productData.quantity < v) {
                        alert('Request over item quantity');
                        return;
                    }
                    this.props.changeQty(v)
                }}
                quantity={productQtyInCart}

                isDecDisabled={productQtyInCart === 0}
                isIncDisabled={productData.quantity === productQtyInCart}
            />
        </td>)

        if (this.props.isCart) {
            return <tr>
                <td>{productData.name}</td>
                <td>${productData.price} <s className="hide">${productData.discountedPrice}</s></td>
                {widget}
            </tr>
        }

        return <tr>
            <td>{productData.name}</td>
            <td className="hide">{productData.category}</td>
            <td>${productData.price} <s className="hide">${productData.discountedPrice}</s></td>
            <td className="hide">{productData.description}</td>
            <td>{productData.quantity}</td>
            {widget}
        </tr>
    }
}

export default Product;