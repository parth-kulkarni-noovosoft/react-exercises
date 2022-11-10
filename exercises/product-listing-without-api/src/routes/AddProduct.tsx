import { action } from "mobx";
import React from "react";
import { StoreContext } from "../context/AppContext";
import { IProduct } from "../interfaces";

class AddProduct extends React.Component<unknown, Omit<IProduct, 'id'>> {
    declare context: React.ContextType<typeof StoreContext>
    static contextType = StoreContext;

    constructor(props: unknown) {
        super(props);

        this.state = {
            category: '',
            description: '',
            discountedPrice: 0,
            name: '',
            price: 0,
            quantity: 0
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange<T extends keyof typeof this.state>(key: T, val: typeof this.state[T]) {
        console.log(key, val);
        this.setState(state => ({
            ...state,
            [key]: val
        }))
    }

    render(): React.ReactNode {
        return <form>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    onChange={e => this.handleChange('name', e.target.value)}
                    value={this.state.name}
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    onChange={e => this.handleChange('category', e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    value={this.state.price}
                    onChange={e => this.handleChange('price', +e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="discountedPrice">Discounted Price</label>
                <input
                    type="number"
                    value={this.state.discountedPrice}
                    onChange={e => this.handleChange('discountedPrice', +e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                    type="number"
                    value={this.state.quantity}
                    onChange={e => this.handleChange('quantity', +e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={this.state.description}
                    onChange={e => this.handleChange('description', e.target.value)}
                />
            </div>
            <button
                type="submit"
                onClick={action(e => {
                    this.context?.productStore.addProduct(this.state);
                    e.preventDefault();
                    this.context?.routerStore.goTo('home');
                })}
            >Add Product</button>
        </form>
    }
}

export default AddProduct;