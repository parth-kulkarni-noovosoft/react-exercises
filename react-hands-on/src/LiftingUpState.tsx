import { useState } from 'react';

const convertToC = (fahrenheit: number) => (fahrenheit - 32) * 5 / 9;
const convertToF = (celsius: number) => (celsius * 9 / 5) + 32; 

const C = ({ handleChange, temp }: { handleChange: (temp: number, scale: 'c' | 'f') => void, temp: number }) => {
    return <input
        type="number"
        onChange={(e) => handleChange(+e.target.value, 'c')}
        value={temp}
    />
}

const F = ({ handleChange, temp }: { handleChange: (temp: number, scale: 'c' | 'f') => void, temp: number }) => {
    return <input
        type='number'
        onChange={(e) => handleChange(+e.target.value, 'f')}
        value={temp}
    />
}

const WillBoil = ({ temp }: { temp: number }) => {
    return temp >= 100 
        ? <div>Will boil</div>
        : <div>Will not boil</div>
}

const App = () => {
    const [temp, setTemp] = useState<number>(0);

    const handleChange = (n: number, scale: 'c' | 'f') => {
        if (scale === 'c') setTemp(n);
        else setTemp(convertToC(n))
    } 

    return (
    <div>
        <div>
            <C handleChange={handleChange} temp={temp}/>
            <F handleChange={handleChange} temp={convertToF(temp)}/>
        </div>
        <WillBoil temp={temp}/>
    </div>
    )
}

export default <App></App>