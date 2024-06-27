import {WebSocketServer} from "ws"
import { GameManager } from "./GameManager";

const wss = new WebSocketServer({port: 8080});

const gameManager = new GameManager();

wss.on("connection", function connection(ws){
    console.log("connected");
    
    gameManager.addPlayer(ws);
    ws.on("disconnect", ()=> gameManager.removePlayer(ws));
    // ws.send("something")
})

