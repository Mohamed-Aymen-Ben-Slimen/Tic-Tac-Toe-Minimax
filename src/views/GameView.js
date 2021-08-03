import React, {useState, useEffect} from 'react';
import styles from './GameViewStyle.module.css'
import * as GameService from "../services/gameService";
import classnames from 'classnames';

function GameView() {

    const [iconX, setIconX] = useState(false);
    const [board, setBoard] = useState([ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]);


    useEffect(() => {
    }, [board])

    const onCellMouseEnter = (event) => {
        const target = event.target;
        if (iconX) {
            target.classList.add(styles.hoverX);
        } else {
            target.classList.add(styles.hoverO);
        }
    }

    const onCellMouseLeave = (event) => {
        const target = event.target;
        target.classList.remove(styles.hoverX, styles.hoverO)
    }

    const onCellClick = (event) => {
        const target = event.target;
        onCellMouseLeave(event)
        target.classList.remove(styles.empty);
        if (iconX) {
            target.classList.add(styles.x);
        } else {
            target.classList.add(styles.o);
        }
        const i = target.getAttribute("data-i");
        const j = target.getAttribute("data-j");
        board[i][j] = iconX ? 'x' : 'o';
        setBoard(board);
        const {score, move} = GameService.minimax(Array.from(board), true, true);
        console.log(score, move);
        board[move[0]][move[1]] = !iconX ? 'x' : 'o';
        console.log(board);
    }

    const updateCell = () => {

    }

    return <>
        <h1>Tic Tac Toe</h1>
        <div className={styles.gameBoard}>
            <div data-i={0} data-j={0} className={classnames(styles.cell, styles.empty, {[styles.x]: board[0][0] === 'x', [styles.o]: board[0][0] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={0} data-j={1} className={classnames(styles.cell, styles.empty, {[styles.x]: board[0][1] === 'x', [styles.o]: board[0][1] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={0} data-j={2} className={classnames(styles.cell, styles.empty, {[styles.x]: board[0][2] === 'x', [styles.o]: board[0][2] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={1} data-j={0} className={classnames(styles.cell, styles.empty, {[styles.x]: board[1][0] === 'x', [styles.o]: board[1][0] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={1} data-j={1} className={classnames(styles.cell, styles.empty, {[styles.x]: board[1][1] === 'x', [styles.o]: board[1][1] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={1} data-j={2} className={classnames(styles.cell, styles.empty, {[styles.x]: board[1][2] === 'x', [styles.o]: board[1][2] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={2} data-j={0} className={classnames(styles.cell, styles.empty, {[styles.x]: board[2][0] === 'x', [styles.o]: board[2][0] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={2} data-j={1} className={classnames(styles.cell, styles.empty, {[styles.x]: board[2][1] === 'x', [styles.o]: board[2][1] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
            <div data-i={2} data-j={2} className={classnames(styles.cell, styles.empty, {[styles.x]: board[2][2] === 'x', [styles.o]: board[2][2] === 'o'})} onMouseEnter={onCellMouseEnter} onMouseLeave={onCellMouseLeave} onClick={onCellClick}/>
        </div>
    </>;
}

export default GameView;
