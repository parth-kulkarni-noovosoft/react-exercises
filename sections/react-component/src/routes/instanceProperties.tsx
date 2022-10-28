import React from "react";
import Counter from "../components/Counter";

class NamedCounter extends React.Component<{ name: string }> {
    render(): React.ReactNode {
        return <div className="box">
            <div>Instance Prop 'name': <strong>{this.props.name}</strong></div>
            Instance State stored in this counter: <Counter />
        </div>
    }
}

type CounterCreatorProps = {
    addCounter: (name: string) => void
};
type CounterCreatorState = {
    input: string;
}
class CounterCreator extends React.Component<CounterCreatorProps, CounterCreatorState> {
    constructor(props: CounterCreatorProps) {
        super(props);
        this.state = {
            input: ''
        }
    }

    handleOnChange(name: string) {
        this.setState({
            input: name
        })
    }

    handleSubmit(e: React.MouseEvent) {
        e.preventDefault();
        if (this.state.input === '') return;
        this.props.addCounter(this.state.input)
    }

    render(): React.ReactNode {
        return <form className="box">
            <strong>Counter Creator</strong>
            <br />
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" value={this.state.input} onChange={e => this.handleOnChange(e.target.value)} />
            <button type="submit" onClick={e => this.handleSubmit(e)}>Create Counter</button>
        </form>
    }
}

type InstancePropertiesState = {
    counters: string[];
}

export default class InstanceProperties extends React.Component<unknown, InstancePropertiesState> {
    constructor(props: unknown) {
        super(props);
        this.state = {
            counters: []
        }
        this.addCounter = this.addCounter.bind(this);
    }

    addCounter(name: string) {
        this.setState(state => ({
            counters: state.counters.concat(name)
        }))
    }

    render(): React.ReactNode {
        return <div className="m-2">
            <CounterCreator addCounter={this.addCounter} />

            {this.state.counters.map((name, i) => <NamedCounter key={i} name={name} />)}
        </div>
    }
}