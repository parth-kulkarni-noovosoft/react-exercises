import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../themeContext";

// Demo for useState, useContext, useEffect and Custom Hook

interface IAutoCounterProps {
    isEnabled: boolean;
}
const AutoCounterWithFunction: React.FC<IAutoCounterProps> = ({ isEnabled }) => {
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
            <strong>Auto Counter with useState function</strong> - {isEnabled ? 'Enabled' : 'Disabled'} - {count}
        </div>
    )
}

const AutoCounterWithoutFunction: React.FC<IAutoCounterProps> = ({ isEnabled }) => {
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
            <strong>Auto Counter without useState function</strong> - {isEnabled ? 'Enabled' : 'Disabled'} - {count}
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

const HooksDemo: React.FC<{ switchTheme: () => void }> = ({ switchTheme }) => {
    const theme = useContext(ThemeContext);
    const [isEnabled, setIsEnabled] = useState(false); 

    const toggleEnable = () => {
        setIsEnabled(!isEnabled);
    }

    return <div className={`container color-${theme}`}>
        <button onClick={e => {
            e.preventDefault();
            toggleEnable();
        }}>{isEnabled ? 'Disable' : 'Enable'}</button>

        <AutoCounterWithoutFunction isEnabled={isEnabled} />
        <AutoCounterWithFunction isEnabled={isEnabled} />
        <AutoCounterWithCustomHook isEnabled={isEnabled} />

        <button
            onClick={switchTheme}
        >Toggle Theme</button>

    </div>
}

export default HooksDemo;