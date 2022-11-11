import { action } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { StoreContext } from "../context/AppContext";

@observer
class AddProduct extends React.Component {
    context: React.ContextType<typeof StoreContext> | undefined
    static contextType = StoreContext;

    render(): React.ReactNode {
        const {
            formStore: { addProductStore },
            routerStore,
            productStore
        } = this.context!;

        return <div className="container">
            <form>
                <h1>Add Product Form</h1>
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        onChange={e => addProductStore.updateSpecificValue('name', e.target.value)}
                        value={addProductStore.state.name}
                    />
                </div>
                <div className="field">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        onChange={e => addProductStore.updateSpecificValue('category', e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        value={addProductStore.state.price}
                        onChange={e => addProductStore.updateSpecificValue('price', +e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="discountedPrice">Discounted Price</label>
                    <input
                        type="number"
                        value={addProductStore.state.discountedPrice}
                        onChange={e => addProductStore.updateSpecificValue('discountedPrice', +e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        value={addProductStore.state.quantity}
                        onChange={e => addProductStore.updateSpecificValue('quantity', +e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={addProductStore.state.description}
                        onChange={e => addProductStore.updateSpecificValue('description', e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    onClick={action(e => {
                        productStore.addProduct(addProductStore.state);
                        e.preventDefault();
                        addProductStore.resetAllValues();
                        routerStore.goTo('home').catch(console.error);
                    })}
                >Add Product</button>
                <button
                    type="reset"
                    onClick={() => addProductStore.resetAllValues()}
                >
                    Reset
                </button>
            </form>
        </div>
    }
}

export default AddProduct;