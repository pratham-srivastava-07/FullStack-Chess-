import { useEffect, useState } from 'react'
import ChessBoard from './ChessBoard'
import { Button } from './Button'
// import { useNavigate } from 'react-router-dom'
import { useSocket } from '../hooks/useSocket'
import { Chess } from 'chess.js'


export const JOIN = "join";

export const MOVE = "move"

export const GAME_OVER = "game over"


export default function Game() {
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess())

  const [board, setBoard] = useState(chess.board());

  useEffect(()=> {
    if(!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      switch(msg.type) {
        case JOIN:
          setChess(new Chess())
          setBoard(chess.board())
          console.log("game started")
          break;
        case MOVE: 
          const move = msg.payload;
          setBoard(chess.board())
          chess.move(move);
          console.log("move initiated");
          break;
        case GAME_OVER: 
          console.log("Game over");
          break;  
      }
    }
  }, [socket])
  // const navigate = useNavigate()
  return (
    <div className='flex justify-center text-white'>
     <div className="pt-8 max-w-screen-lg w-full">
     <div className='grid grid-cols-6 gap-4 w-full'>
      <div className='col-span-4 w-full flex justify-center'>
      <ChessBoard  board= {board} socket={socket}/>
      </div>
     </div>
     </div>
   
   <div className="col-span-2 justify-center bg-slate-500 flex rounded-md lg:mt-10  ">
      <div className='pt-20'>
          <Button
            onClick={()=> socket?.send(JSON.stringify({type: JOIN}))}>
            Play Online
          </Button>
      </div>
   </div>
    </div>
  )
}
