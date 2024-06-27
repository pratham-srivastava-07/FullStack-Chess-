"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const messages_1 = require("./messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addPlayer(socket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }
    removePlayer(socket) {
        this.users = this.users.filter(user => (user !== socket));
    }
    startGame(socket) {
        if (this.pendingUser) {
            // start the  game 
            const game = new Game_1.Game(this.pendingUser, socket);
            this.games.push(game);
            this.pendingUser = null;
        }
        else {
            this.pendingUser = socket;
        }
    }
    handleMessage(socket) {
        // console.log("message mila");
        socket.on("message", (data) => {
            const msg = JSON.parse(data.toString());
            if (msg.type === "create") {
                this.pendingUser = socket;
                // this.createGame(socket);
            }
            if (msg.type === messages_1.JOIN) {
                this.startGame(socket);
            }
            if (msg.type === messages_1.MOVE) {
                // console.log("first move");
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, msg.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
