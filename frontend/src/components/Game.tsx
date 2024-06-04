import React from 'react'
import ChessBoard from './ChessBoard'
import { Button } from './Button'
import { useNavigate } from 'react-router-dom'
import { useSocket } from '../hooks/useSocket'

export const JOIN = "join";

export const MOVE = "move"

export const GAME_OVER = "game over"

export default function Game() {
  const socket = useSocket();
  if(!socket) return <div>
    Connecting...
  </div>
  // const navigate = useNavigate()
  return (
    <div className='flex justify-center text-white'>
     <div className="p-8 max-w-screen-lg w-full">
     <div className='grid grid-cols-6 gap-7'>
      <div className='col-span-4 bg-red-500'>
      <ChessBoard/>
      </div>
      <button className='col-span-2 w-full bg-blue-500'>
        Play
      </button>
     </div>
     </div>
    <Button
      onClick={()=>socket.send(JSON.stringify(
        {
          type: JOIN,

        }
  ))}
    >
      Play Online
    </Button>
    </div>
  )
}
