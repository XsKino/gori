import { Image, Button } from '@nextui-org/react'
import { useState } from 'react'

export default function Dice({ callback }) {
  const [roll, setRoll] = useState(null)
  const rollDice = () => {
    callback()
    setRoll(Math.floor(Math.random() * 20) + 1)
  }
  return (
    <Button onClick={rollDice} className='h-40 aspect-[5/4]'>
      <Image alt='dice' src={`/img/dice/${roll}.png`} width={300} height={400} className='h-full w-full' />
    </Button>
  )
}
