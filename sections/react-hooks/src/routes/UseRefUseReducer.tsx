import React, { Reducer, useEffect, useReducer, useRef } from "react";

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
                y: state.y + 10 >= 480 ? 0 : state.y + 10
            }
        case Actions.UP:
            return {
                ...state,
                y: state.y - 10 <= 0 ? 470 : state.y - 10
            }
        case Actions.LEFT:
            return {
                ...state,
                x: state.x - 10 <= 0 ? 630 : state.x - 10
            }
        case Actions.RIGHT:
            return {
                ...state,
                x: state.x + 10 >= 640 ? 0 : state.x + 10
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
    const [state, dispatch] = useReducer(positionReducer, { x: 320, y: 240 })

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

    return <div className="use-ref-main">
        <canvas ref={canvasRef} className='box' width={640} height={480}></canvas>
        <div className="box">Up down right left to move the rectangular box</div>
        <div className="box">
            <button onClick={() => dispatch(Actions.RESET)}>Reset Position</button>
        </div>
    </div>
}

export default UseRefUseReducer;