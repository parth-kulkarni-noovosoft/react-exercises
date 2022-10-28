import React from "react";

export type CounterState = {
    count: number;
};

type CounterProps = {
    onComponentDidMount?: Function;
    onComponentDidUpdate?: Function;
    onComponentWillUnmount?: Function;
    onRender?: Function;
    onConstruction?: Function;
};

export default class Counter extends React.Component<CounterProps, CounterState> {
    constructor(props: CounterProps) {
        super(props);
        this.state = {
            count: 0
        }
        this.props.onConstruction?.();
    }

    changeBy(val: number) {
        this.setState(state => ({
            count: state.count + val
        }))
    }

    componentDidMount(): void {
        this.props.onComponentDidMount?.();
    }

    componentDidUpdate(prevProps: Readonly<CounterProps>, prevState: Readonly<CounterState>, snapshot?: any): void {
        this.props.onComponentDidUpdate?.(prevProps, prevState, snapshot);        
    }

    componentWillUnmount(): void {
        this.props.onComponentWillUnmount?.();
    }

    render() {
        this.props.onRender?.();
        return (
            <div>
                <div>Count: {this.state.count}</div>
                <div className="btn-container">
                    <button onClick={() => this.changeBy(1)}>+</button>
                    <button onClick={() => this.changeBy(-1)}>-</button>
                </div>
            </div>
        )
    }
}