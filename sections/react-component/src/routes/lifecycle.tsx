import React from "react";
import Counter from '../components/Counter';

type AppState = {
  display: boolean;
}
export default class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      display: true
    }
  }

  render(): React.ReactNode {
    return (
      <div className="app">
        <div>
          <button onClick={() => this.setState(state => ({ display: !state.display }))}>Toggle Display</button>
        </div>
        {this.state.display && <Counter
          onComponentDidMount={() => console.log('Component Did Mount was called')}
          onComponentDidUpdate={() => console.log('Component Did Updated was called')}
          onComponentWillUnmount={() => console.log('Component Will Unmount was called')}
          onRender={() => console.log('Render was called')}
          onConstruction={() => console.log('Constructor was called')}
        />}
        Open the Console and interact with the buttons to see the different component events being called.
      </div>
    )
  }
}