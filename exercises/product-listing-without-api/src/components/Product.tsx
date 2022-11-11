import { observer } from "mobx-react";
import React from "react";
import { ICartProduct, IProduct } from "../interfaces";

interface ICartProductProps {
    isCart: true;
    product: ICartProduct;
}

interface IHomeProductProps {
    isCart?: false;
    product: IProduct;
    getQtyInCart: () => number;
    incQty: () => void;
    decQty: () => void;
}

type ProductProps = ICartProductProps | IHomeProductProps;

@observer
class Product extends React.Component<ProductProps> {
    render(): React.ReactNode {
        const productData = this.props.isCart
            ? this.props.product.productData
            : this.props.product;

        let widget = null;

        if (!this.props.isCart) {
            const productQtyInCart = this.props.getQtyInCart();

            widget = (<td>
                <div className="widget">
                    <button
                        onClick={this.props.decQty}
                        disabled={productQtyInCart === 0}
                    >-</button>
                    <span>{productQtyInCart}</span>
                    <button
                        onClick={this.props.incQty}
                        disabled={this.props.product.quantity === productQtyInCart}
                    >+</button>
                </div>
            </td>)
        }

        if (this.props.isCart) {
            return <tr>
                <td>{productData.name}</td>
                <td>{productData.discountedPrice}</td>
                <td>{this.props.product.quantity}</td>
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