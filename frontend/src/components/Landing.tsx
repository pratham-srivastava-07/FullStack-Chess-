import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
    const navigate = useNavigate();
  return (
    <div className='flex justify-center'>
     <div className="pt-8 max-w-scereen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-white ">
            <div className="flex justify-center">
                <img src={"/chess.jpg"} alt="chess" className='max-w-100' />
            </div>
            <div className='pt-16'>
               <div className="flex justify-center">
               <h1 className='text-4xl font-bold text-white'> Play chess online on the #1 site</h1>
               </div>
                <div className="mt-4 flex justify-center">
                    <button
                    onClick={()=> navigate("/game")}
                    className="px-20 py-4 text-2xl rounded bg-blue-500 hover:bg-blue-700 text-white font-bold">
                        Play
                    </button>
                </div>
            </div>
        </div>
     </div>
    </div>
  )
}
