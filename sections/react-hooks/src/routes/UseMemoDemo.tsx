import { useMemo, useState } from "react"

interface IFactorialProps {
    count: number;
    someOtherVar: string;
}

const factorial = (n: number): number => {
    console.log(`calling for ${n}`);
    if (n === 0) return 1;
    return factorial(n - 1) * n;
}

const FactorialWithMemo: React.FC<IFactorialProps> = ({ count, someOtherVar }) => {
    return <div className="box">
        <strong>Factorial With Memo</strong>
        <div>
            {factorial(count)}
        </div>
        <div>
            Some other prop that causes re-render: {someOtherVar}
        </div>
    </div>
}

const FactorialWitouthMemo: React.FC<IFactorialProps> = ({ count, someOtherVar }) => {
    const memoizedFactorial = useMemo(() => factorial(count), [count]);
    return <div className="box">
        <strong>Factorial Without Memo</strong>
        <div>
            {memoizedFactorial}
        </div>
        <div>
            Some other prop that causes re-render: {someOtherVar}
        </div>
    </div>
}

const UseMemoDemo: React.FC = () => {
    const [count, setCount] = useState(0);
    const [someOtherVar, setSomeOtherVar] = useState('');
    
    const changeBy = (n: number) => {
        setCount(count => count + n);
    }

    return <div className="box">
        The factorial for 'factorial with memo' isn't recalculated due to memo but is always recalculated for 'factorial without memo'
        <FactorialWithMemo count={count} someOtherVar={someOtherVar} />
        <FactorialWitouthMemo count={count} someOtherVar={someOtherVar} />
        <button onClick={() => changeBy(1)}>Increment</button>
        <button onClick={() => changeBy(-1)}>Decrement</button>
        <div className="box">
            <label htmlFor="someOtherVar">Some Other Var</label>
            <br />
            <input type="text" onChange={e => setSomeOtherVar(e.target.value)} value={someOtherVar} />
        </div>
    </div>
}

export default UseMemoDemo;