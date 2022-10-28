import { ReactElement, useState } from 'react';
import ReactDOM from 'react-dom/client';
import TemperatureVerdict from './LiftingUpState';
import Clocks from './StateAndProps';

const COMPONENTS = [TemperatureVerdict, Clocks];

const Playground = ({ children }: { children?: JSX.Element }) => {
    return <div>
        {children}
    </div>
}

const Main = () => {
    // store indexes instead of components directly
    const [component, setCurrentComponent] = useState<ReactElement>();
    const changeTo = (index: number) => {
        setCurrentComponent(COMPONENTS[index]);
    }
    return <>
        <button onClick={() => changeTo(0)}>TemperatureVerdict</button>
        <button onClick={() => changeTo(1)}>Clocks</button>
        <Playground>
            {component}
        </Playground>
    </>
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Main />);
