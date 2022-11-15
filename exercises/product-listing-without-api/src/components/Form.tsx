import React from 'react';
import { observer } from 'mobx-react';
import { FieldTypes, ValidationResult } from '../interfaces';
import { StoreContext } from '../context/AppContext';
import QuantityWidget from './QuantityWidget';

interface IGenericOpts {
    name: string;
    displayName?: string;
    initialValue?: string | number | boolean;
    validation?: (val: string | number | boolean) => ValidationResult
}

interface IFieldOpts extends IGenericOpts {
    type: Exclude<FieldTypes, FieldTypes.SELECT>;
}

interface ISelectFieldOpts extends IGenericOpts {
    type: FieldTypes.SELECT;
    options: string[]
}

export type FieldsOpts = ISelectFieldOpts | IFieldOpts;

interface IFormProps {
    title?: string
    components: FieldsOpts[];
    onSubmit: (data: Record<string, number | string | boolean>) => boolean
}

@observer
class Form extends React.Component<IFormProps> {
    context: React.ContextType<typeof StoreContext> | undefined;
    static contextType = StoreContext;

    componentDidMount(): void {
        this.setInitialValues();
    }

    setInitialValues(): void {
        const initialState: Record<string, string | number | boolean> = {};
        this.props.components.forEach((component) => {
            const isButton = component.type === FieldTypes.SUBMIT || component.type === FieldTypes.RESET;
            if (isButton) return;

            if (component.initialValue !== undefined) {
                initialState[component.name] = component.initialValue;
                return;
            }

            switch (component.type) {
                case FieldTypes.NUMBER:
                    return initialState[component.name] = 0;
                case FieldTypes.TEXT:
                case FieldTypes.TEXTAREA:
                    return initialState[component.name] = '';
                case FieldTypes.SELECT:
                    return initialState[component.name] = component.options[0] ?? '';
            }
        })

        const { formStore } = this.context!;
        formStore.addInitialValues(initialState);
    }

    getInputField(component: FieldsOpts) {
        const { formStore } = this.context!;

        const doValidation = (val: string | number | boolean) => {
            if (component.validation) {
                const validationResult = component.validation(val);
                if (!validationResult.isValid) {
                    alert(validationResult.errorMessage);
                    return false;
                }
            }
            return true;
        }

        const genericOnChange: React.ChangeEventHandler<
            HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
        > = (e) => {
            if (!doValidation(e.target.value)) return;
            return formStore.updateSpecificValue(component.name, e.target.value)
        }

        const collectData = () => {
            return this.props.components
                .map((component) => ({ [component.name]: formStore.state[component.name] }))
                .reduce((prev, cur) => ({ ...prev, ...cur }), {});
        }

        switch (component.type) {
            case FieldTypes.NUMBER: {
                return <QuantityWidget
                    setValue={v => {
                        if (!doValidation(v)) return;
                        formStore.updateSpecificValue(component.name, v)
                    }}
                    quantity={formStore.state[component.name] as number ?? 0}
                />
            }
            case FieldTypes.TEXT: {
                return (
                    <input
                        type='text'
                        onChange={genericOnChange}
                        value={formStore.state[component.name] as string ?? ''}
                    />
                )
            }
            case FieldTypes.TEXTAREA: {
                return (
                    <textarea
                        onChange={genericOnChange}
                        value={formStore.state[component.name] as string ?? ''}
                    />
                );
            }
            case FieldTypes.SUBMIT: {
                return (
                    <button
                        type='submit'
                        onClick={e => {
                            e.preventDefault();
                            const isSubmitted = this.props.onSubmit(collectData())
                            if (isSubmitted) {
                                this.setInitialValues();
                            }
                        }}
                    >{component.name}</button>
                )
            }
            case FieldTypes.SELECT: {
                return (
                    <select
                        className='capitalize'
                        value={formStore.state[component.name] as string}
                        onChange={genericOnChange}
                    >
                        {component.options.map((option, idx) => <option
                            className='capitalize'
                            key={`${option}-${idx}`}
                        >{option}</option>)}
                    </select>
                )
            }
            case FieldTypes.RESET: {
                return (
                    <button
                        type='reset'
                        onClick={e => {
                            e.preventDefault();
                            this.setInitialValues();
                        }}
                    >{component.name}</button>
                )
            }
            default: {
                throw new Error('Invalid Input Field Type');
            }
        }
    }

    render() {
        return (
            <form>
                {this.props.title && <h1>{this.props.title}</h1>}
                {this.props.components.map((component, idx) => {
                    const isButton = component.type === FieldTypes.SUBMIT || component.type === FieldTypes.RESET;
                    const fieldComponent = this.getInputField(component);
                    return (
                        <div className='field' key={idx}>
                            {!isButton && <label className='capitalize'>
                                {component.displayName ?? component.name}
                            </label>
                            }
                            <div className='input-section'>
                                {fieldComponent}
                            </div>
                        </div>
                    )
                })}
            </form>
        )
    }
}

export default Form;