import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type Nullable<T> = null | T;
type PlayerOptions = 'X' | 'O';

type SquareProps = {
  value: Nullable<PlayerOptions>;
  onClick: () => void;
};

class Square extends React.Component<SquareProps> {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

type BoardProps = {
  squares: Nullable<PlayerOptions>[];
  onClick: (n: number) => void;
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  renderRow(i: number) {
    return <div className='board-row' key={`row-${i}`}>{
      Array(3)
        .fill(null)
        .map((_, j) => this.renderSquare(i * 3 + j))
    }</div>
  }

  render() {
    return (
      <div>{
        Array(3)
          .fill(null)
          .map((_, i) => this.renderRow(i))
      }</div>
    )
  }
}

type GameState = {
  history: Pick<BoardProps, 'squares'>[]
  xIsNext: boolean;
  stepNumber: number;
}

class Game extends React.Component<unknown, GameState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history.at(-1)!;
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }

    const squaresCopy = current.squares.slice();
    squaresCopy[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat({
        squares: squaresCopy,
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(move: number) {
    this.setState<'stepNumber' | 'xIsNext'>({
      stepNumber: move,
      xIsNext: (move % 2) === 0
    })
  }

  renderMoves() {
    return this.state.history
      .map((step, index) => {
        const description = index === 0
          ? 'Go to Game Start'
          : `Go to Move #${index}`

        return (
          <li key={index}>
            <button
              onClick={() => this.jumpTo(index)}
            >{description}</button>
          </li>
        )
      })
  }

  render() {
    const lastState = this.state.history.at(this.state.stepNumber)!;
    const winner = calculateWinner(lastState.squares);
    const status = winner
      ? `Winner: ${winner}`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={lastState.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{this.renderMoves()}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares: Nullable<PlayerOptions>[]): Nullable<PlayerOptions> {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const winFound = line
      .map(i => squares[i])
      .every((e, _, a) => e === a[0])
    if (winFound) return squares[line[0]];
  }
  return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Game />);