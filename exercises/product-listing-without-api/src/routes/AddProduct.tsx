import { observer } from "mobx-react";
import React from "react";
import Form, { FieldsOpts } from "../components/Form";
import { StoreContext } from "../context/AppContext";
import { FieldTypes, IProduct, ValidationResult } from "../interfaces";

@observer
class AddProduct extends React.Component {
    context: React.ContextType<typeof StoreContext> | undefined
    static contextType = StoreContext;

    render(): React.ReactNode {
        const { routerStore, productStore } = this.context!;

        const isPositiveCheck = (val: string | number | boolean): ValidationResult => {
            if (val < 0) {
                return {
                    isValid: false,
                    errorMessage: 'Value needs to be above 0'
                }
            }
            return {
                isValid: true
            }
        }

        const components: FieldsOpts[] = [
            {
                name: 'name',
                type: FieldTypes.TEXT,
            },
            {
                name: 'category',
                type: FieldTypes.SELECT,
                options: ['smartphone', 'electronics', 'chairs']
            },
            {
                name: 'price',
                type: FieldTypes.NUMBER,
                validation: isPositiveCheck
            },
            {
                name: 'discountedPrice',
                displayName: 'discounted price',
                type: FieldTypes.NUMBER,
                validation: isPositiveCheck
            },
            {
                name: 'quantity',
                type: FieldTypes.NUMBER,
                validation: isPositiveCheck
            },
            {
                name: 'description',
                type: FieldTypes.TEXTAREA,
            },
            {
                name: 'Add Product',
                type: FieldTypes.SUBMIT,
            },
            {
                name: 'Reset',
                type: FieldTypes.RESET
            }
        ];

        return <div className="container">
            <Form
                title='Add Product Form'
                components={components}
                onSubmit={(data) => {
                    const emptyFields = ['name', 'description'].some(key => data[key] === '');
                    if (emptyFields) {
                        alert('Empty fields are not allowed!');
                        return false;
                    }

                    const zeroFields = ['price', 'discountedPrice', 'quantity'].some(key => data[key] === 0);
                    if (zeroFields) {
                        alert('Zero for price, discountedPrice and quantity are not allowed');
                        return false;
                    }

                    if (data.discountedPrice > data.price) {
                        alert('Discounted Price cannot be higher than price');
                        return false;
                    }

                    productStore.addProduct(data as Omit<IProduct, 'id'>);
                    routerStore.goTo('home').catch(console.error);
                    return true;
                }}
            />
        </div>
    }
}

export default AddProduct;