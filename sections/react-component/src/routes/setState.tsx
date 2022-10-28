import React from "react";
import { CounterState } from "../components/Counter";

interface AutoCounterProps {
    isEnabled: boolean;
    interval: number
}
class AutoCounterWithoutFunction extends React.Component<AutoCounterProps, CounterState> {
    public tickID = -1;

    constructor(props: AutoCounterProps) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidUpdate() {
        if (this.props.isEnabled) {
            if (this.tickID !== -1) return;
            this.tickID = setInterval(() => {
                this.incrementCounter()
            }, this.props.interval);
        } else {
            clearInterval(this.tickID);
            this.tickID = -1;
        }
    }

    incrementCounter() {
        this.setState({
            count: this.state.count + 1.5
        })
    }

    render(): React.ReactNode {
        return <div className="box">
            <strong>State Update without Function</strong> - {this.props.isEnabled ? 'Enabled' : 'Disabled'} - {this.state.count}
        </div>
    }
}

class AutoCounterWithFunction extends React.Component<AutoCounterProps, CounterState> {
    public tickID = -1;

    constructor(props: AutoCounterProps) {
        super(props);
        this.state = {
            count: 0,
        }
    }

    componentDidUpdate(): void {
        if (this.props.isEnabled) {
            if (this.tickID !== -1) return;
            this.tickID = setInterval(() => {
                this.incrementCounter()
            }, this.props.interval);
        } else {
            clearInterval(this.tickID);
            this.tickID = -1;
        }
    }

    incrementCounter() {
        this.setState((state) => ({
            count: state.count + 1.5
        }))
    }

    render(): React.ReactNode {
        return <div className="box">
            <strong>State Update with Function</strong> - {this.props.isEnabled ? 'Enabled' : 'Disabled'} - {this.state.count}
        </div>
    }
}


export default class SetStateDemo extends React.Component<unknown, { isEnabled: boolean; inputVal: number }> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            isEnabled: false,
            inputVal: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }

    toggleEnabled() {
        this.setState(state => ({
            isEnabled: !state.isEnabled
        }))
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            inputVal: +e.target.value
        })
    }

    render(): React.ReactNode {
        return <div className="m-2 box">
            <form>
                <button onClick={e => {
                    e.preventDefault();
                    this.toggleEnabled()
                }}>
                    {this.state.isEnabled ? 'Disable' : 'Enable'}
                </button>
                <br />
                <label htmlFor="interval">Interval</label>
                <input type="number" name="interval" id="interval" onChange={this.handleChange} value={this.state.inputVal} />
            </form>

            <AutoCounterWithoutFunction isEnabled={this.state.isEnabled} interval={this.state.inputVal} />
            <AutoCounterWithFunction isEnabled={this.state.isEnabled} interval={this.state.inputVal} />
        </div>
    }
}