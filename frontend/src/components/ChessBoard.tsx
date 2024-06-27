import { Color, PieceSymbol, Square } from 'chess.js';
import { useState } from 'react';
import { MOVE } from './Game';
// import React from 'react'

export default function ChessBoard({board, socket}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][],
socket: WebSocket;
}) {
  const [from, setFrom] = useState<null | Square>(null)
  const [to, setTo] = useState<null | Square>(null)
  return (
    <div className='text-black md:ml-32'>
      {
        board.map((row, i) => {
          return <div key={i} className='flex'>
            {
              row.map((square, j)=> {
                const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square
                // console.log(squareRepresentation);
                
                return <div
                 key={j} 
                 onClick={()=> {
                  if(!from) {
                    setFrom(squareRepresentation)
                  }
                  else {
                    setTo(square?.square ?? null)
                    socket.send(JSON.stringify({
                      type: MOVE,
                      payload: {
                        from,
                        to: squareRepresentation
                      }
                    }))
                    console.log({from, to})
                  }
                 }}
                 
                 className={`w-16 h-16 ${(i+j)%2===0 ? 'bg-green-500' : 'bg-white'}`}>
                  <div className="w-full flex justify-center h-full">
                    <div className="h-full flex flex-col justify-center items-center">
                    {square ? square.type : ""}
                    </div>
                  </div>
                </div>
              })
            }
          </div>
        })
      }
    </div>
  )
}
