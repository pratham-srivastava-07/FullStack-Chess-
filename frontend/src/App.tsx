import { useState } from 'react'
import {  BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Landing from './components/Landing'
import Game from './components/Game'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="app h-screen bg-slate-950">
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
