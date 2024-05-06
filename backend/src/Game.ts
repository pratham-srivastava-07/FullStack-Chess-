import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, JOIN, MOVE } from "./messages";

export class Game {
    public player1
    public player2;
    public board: Chess
    private moves: string[]
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess()
        this.moves = [];
        this.startTime = new Date()

        this.player1.send(JSON.stringify({
            type: JOIN,
            payload: {
                color: "white"
            }
        }))

        this.player2.send(JSON.stringify({
            type: JOIN,
            payload: {
                color: "black"
            }
        }))

    }
    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {
        // throw new Error("Method not implemented.");
        if(this.moveCount % 2 === 0 && socket != this.player1) {
            return;
        }

        if(this.moveCount % 2 === 1 && socket != this.player2) {
            return;
        }

        try {
            this .board.move(move);
        } catch (err) {
            return;
        }
        
        if(this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))

            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            
            return 
        }

        if(this.moveCount % 2 === 0) {
            console.log("sent1");
            
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {
            console.log("sent2"
            );
            
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moveCount++;
    }
}