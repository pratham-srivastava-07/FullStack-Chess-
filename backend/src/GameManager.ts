import {WebSocket} from "ws"
import { JOIN, MOVE } from "./messages";
import {Game} from "./Game"


export class GameManager {
    private games: Game[];
    private users: WebSocket[];
    private pendingUser: WebSocket | null;

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addPlayer(socket: WebSocket) {
        this.users.push(socket);
        this.handleMessage(socket);
    }


    removePlayer(socket: WebSocket) {
        this.users = this.users.filter(user => (user !== socket))
    }


    private startGame(socket: WebSocket) {
        if(this.pendingUser){
            // start the  game 
            const game = new Game(this.pendingUser, socket)
            this.games.push(game);
            this.pendingUser = null;

           }
           else {
            this.pendingUser = socket;
           }
    }
    private handleMessage(socket: WebSocket) {
        // console.log("message mila");
        
        socket.on("message", (data)=> {
            const msg = JSON.parse(data.toString());
            if(msg.type === "create") {
                this.pendingUser = socket;
                // this.createGame(socket);
            }
            if(msg.type === JOIN) {
              this.startGame(socket)
            }

            if(msg.type === MOVE) {
                // console.log("first move");
                
                const game = this.games.find(game=> game.player1 === socket || game.player2 === socket)
                if(game) {
                    game.makeMove(socket, msg.move)
                }
            }
        })
    }
}