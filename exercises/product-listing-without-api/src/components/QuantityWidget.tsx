import React from "react";

interface IQuantityWidgetProps {
    isIncDisabled?: boolean;
    isDecDisabled?: boolean;
    setValue: (v: number) => void;
    quantity: number;
}

class QuantityWidget extends React.Component<IQuantityWidgetProps> {
    render() {
        return (<div className="widget">
            <button
                type="button"
                onClick={() => {
                    this.props.setValue(this.props.quantity - 1)
                }}
                disabled={this.props.isDecDisabled}
            >-</button>
            <span>
                <input
                    className='widget-input'
                    type='number'
                    value={this.props.quantity}
                    onChange={(e) => this.props.setValue(+e.target.value)}
                />
            </span>
            <button
                type="button"
                onClick={() => {
                    this.props.setValue(this.props.quantity + 1)
                }}
                disabled={this.props.isIncDisabled}
            >+</button>
        </div>)
    }
}

export default QuantityWidget;