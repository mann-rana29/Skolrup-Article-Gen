import { useState } from 'react'
import './App.css'
import { Button, } from './components/ui/button'
import { Card } from './components/ui/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-neutral-950 flex font-serif justify-center items-center  text-white w-full h-screen' >
        <Card className='w-[50%] h-[50%]  opacity-10 justify-center items-center'>
          
        </Card>
      </div>
    </>
  )
}

export default App
