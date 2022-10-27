import React, { ReactNode, useEffect, useState } from "react";

type Nullable<T> = null | T;

type ClockState = {
    count: number
}
type ClockProps = {
    name: string;
}

class Clock extends React.Component<ClockProps, ClockState> {
    public tickID = -1;
    constructor(props: ClockProps) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        this.tickID = +setInterval(() => {
            this.setState((state) => ({
                count: state.count + 1
            }))
        }, 1000)
    };

    componentWillUnmount() {
        clearInterval(this.tickID);
    }

    render() {
        return <div>
            <h1>{this.props.name} - {this.state.count.toLocaleString()}</h1>
        </div>
    }
}

const App = () => {
    const [clocks, setClocks] = useState<ReactNode[]>([]);
    const [tickID, setTickID] = useState<Nullable<number>>();

    useEffect(() => {
        setTickID(+setInterval(() => {
            setClocks(state => state.concat(<Clock key={state.length} name={`clock-${state.length}`} />))
        }, 1000))
    }, [])

    useEffect(() => {
        if (clocks.length >= 10 && tickID !== null) {
            clearInterval(tickID);
            setTickID(null);
        }
    }, [clocks, tickID])


    return <div>
        {clocks}
    </div>
}

export default <App></App>