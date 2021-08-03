const evaluate = (board) => {
        if ( (board[0][0] !== 0) && (board[0][0] === board[0][1]) && (board[0][0] === board[0][2])) {
            return {
                symbol: board[0][0],
                cells: [[0, 0], [0, 1], [0, 2]]
            };
        } else if ((board[1][0] !== 0) && (board[1][0] === board[1][1]) && (board[1][0] === board[1][2])) {
            return {
                symbol: board[1][0],
                cells: [[1, 0], [1, 1], [1, 2]]
            };
        } else if ((board[2][0] !== 0) && (board[2][0] === board[2][1]) && (board[2][0] === board[2][2])) {
            return {
                symbol: board[2][0],
                cells: [[2, 0], [2, 1], [2, 2]]
            };
        } else if ((board[0][0] !== 0) && (board[0][0] === board[1][0]) && (board[0][0] === board[2][0])) {
            return {
                symbol: board[0][0],
                cells: [[0, 0], [1, 0], [2, 0]]
            };
        } else if ((board[0][1] !== 0) && (board[0][1] === board[1][1]) && (board[0][1] === board[2][1])) {
            return {
                symbol: board[0][0],
                cells: [[0, 1], [1, 1], [2, 1]]
            };
        } else if ((board[0][2] !== 0) && (board[0][2] === board[1][2]) && (board[0][2] === board[2][2])) {
            return {
                symbol: board[0][0],
                cells: [[0, 2], [1, 2], [2, 2]]
            };
        } else if ((board[0][0] !== 0) && (board[0][0] === board[1][1]) && (board[0][0] === board[2][2])) {
            return {
                symbol: board[0][0],
                cells: [[0, 0], [1, 1], [2, 2]]
            };
        } else if ((board[0][2] !== 0) && (board[0][2] === board[1][1]) && (board[0][2] === board[2][0])) {
            return {
                symbol: board[0][0],
                cells: [[0, 2], [1, 1], [2, 0]]
            };
        } else {
            return null;
        }
    }

const gameOver = (board) => {
        if (evaluate(board) !== null) {
            return true;
        }
        return !board.flat().includes(0);
    }

const cloneArr = (arr) => {
    return  arr.map( (el) => {
        return el.slice();
    });
}

export const selectBestMoves = (state, playerMax, iconX) => {
    const board = cloneArr(state);

        const playerIcon = iconX ? 'x' : 'o';
        if (gameOver(board)) {
            const result = evaluate(board);
            if (result) {
                return result;
            }
            return null;
        }
        const bestMoves = [];
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                if (board[i][j] === 0) {
                    const boardCopy = cloneArr(board);
                    boardCopy[i][j] = playerIcon;
                    const result = selectBestMoves(boardCopy, !playerMax, !iconX)
                    if (result) {
                        if (result.symbol === playerIcon) {
                            bestMoves.push([i, j]);
                        } else {
                            bestMoves.push([i, j]);
                        }
                    }
                }
            }
        }
        return bestMoves;
    }

const maxPlayer = (board, ai, iconX) => {
    let best = {score: -2, move: null};
    const playerIcon = iconX ? 'x' : 'o';
    const moves = [];
    for(let i=0; i<3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                const boardCopy = cloneArr(board);
                boardCopy[i][j] = playerIcon;
                const move = minimax(boardCopy, false, false);
                moves.push(move);
                if (move.score > best.score) {
                    move.move = [i, j];
                    best = move
                }
            }
        }
    }
    return best;
}

const minPlayer = (board, ai, iconX) => {
    let best = {score: 2, move: null};
    const playerIcon = iconX ? 'x' : 'o';
    for(let i=0; i<3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 0) {
                const boardCopy = cloneArr(board);
                boardCopy[i][j] = playerIcon;
                const move = minimax(boardCopy, true, true);
                if (move.score < best.score) {
                    move.move = [i, j];
                    best = move
                }
            }
        }
    }
    return best;
}

export const minimax = (state, ai, iconX) => {
    const board = cloneArr(state);
    const playerIcon = iconX ? 'x' : 'o';
    if (gameOver(board)) {
        const result = evaluate(board);
        if (result) {
            if (result.symbol === playerIcon) {
                return {score: 1, move: null};
            } else {
                return {score: -1, move: null};
            }
        }
        return {score: 0, move: null};
    }
    let move;
    if (ai) {
        move = maxPlayer(board, ai, iconX);
    }
    if (!ai) {
        move = minPlayer(board, ai, iconX);
    }
    if (move.move === null) {
        move.score = 0;
    }
    return move;
}
