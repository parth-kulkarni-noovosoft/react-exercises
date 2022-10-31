import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../themeContext";

// Demo for useState, useContext, useEffect and Custom Hook

interface IAutoCounterProps {
    isEnabled: boolean;
}
const AutoCounterWithHooks: React.FC<IAutoCounterProps> = ({ isEnabled }) => {
    const [count, setCount] = useState(0);
    let tickID = -1;

    const incrementCounter = () => setCount(val => val + 1);

    useEffect(() => {
        if (!isEnabled) return;

        tickID = +setInterval(incrementCounter, 1000);        
        console.log(tickID);
        return () => clearInterval(tickID);
    }, [isEnabled]);

    return (
        <div className="box">
            <strong>Auto Counter with hooks defined in component</strong> - {isEnabled ? 'Enabled' : 'Disabled'} - {count}
        </div>
    )
}

const useCounter = (isEnabled: boolean) => {
    const [count, setCount] = useState(0);
    let tickID = -1;

    const incrementCounter = () => setCount(val => val + 1);

    useEffect(() => {
        if (!isEnabled) return;

        tickID = setInterval(incrementCounter, 1000);        
        return () => clearInterval(tickID);
    }, [isEnabled]);
    return count;
}

const AutoCounterWithCustomHook: React.FC<IAutoCounterProps> = ({ isEnabled }) => {
    const count = useCounter(isEnabled);
    return (
        <div className="box">
            <strong>Auto Counter with Custom Hook</strong> - {isEnabled ? 'Enabled' : 'Disabled'} - {count}
        </div>
    )
}

const HooksDemo: React.FC = () => {
    const { theme, toggle } = useContext(ThemeContext);
    const [isEnabled, setIsEnabled] = useState(false); 

    const toggleEnable = () => {
        setIsEnabled(!isEnabled);
    }

    return <div className={`container color-${theme}`}>
        <button onClick={e => {
            e.preventDefault();
            toggleEnable();
        }}>{isEnabled ? 'Disable' : 'Enable'}</button>

        <AutoCounterWithHooks isEnabled={isEnabled} />
        <AutoCounterWithCustomHook isEnabled={isEnabled} />

        <button
            onClick={toggle}
        >Toggle Theme</button>

    </div>
}

export default HooksDemo;