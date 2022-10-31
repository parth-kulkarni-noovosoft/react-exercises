import { Reducer, useEffect, useReducer, useRef } from "react";

enum Actions {
    UP = 'up',
    DOWN = 'down',
    RIGHT = 'right',
    LEFT = 'left',
    RESET = 'reset'
}

interface IPosition {
    x: number;
    y: number;
}

const positionReducer: Reducer<IPosition, Actions> = (state, action) => {
    switch (action) {
        case Actions.DOWN:
            return {
                ...state,
                y: state.y + 10
            }
        case Actions.UP:
            return {
                ...state,
                y: state.y - 10
            }
        case Actions.LEFT:
            return {
                ...state,
                x: state.x - 10
            }
        case Actions.RIGHT:
            return {
                ...state,
                x: state.x + 10
            }
        case Actions.RESET:
            return {
                x: 30,
                y: 30
            }
        default: 
            throw new Error();
    }
}

const UseRefUseReducer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [state, dispatch] = useReducer(positionReducer, { x: 30, y: 30 })

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvasRef.current.getContext('2d')!;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(state.x, state.y, 10, 10);
        ctx.stroke();
    })

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!e.key.includes('Arrow')) return;
            const direction = e.key.toLowerCase().replace('arrow', '') as Actions;
            dispatch(direction)
        }
    
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [])

    return <div>
        <canvas ref={canvasRef} className='box'></canvas>
        <div className="box">Up down right left to move the rectangular box</div>
        <div className="box">
            <button onClick={() => dispatch(Actions.RESET)}>Reset Position</button>
        </div>
    </div>
}

export default UseRefUseReducer;