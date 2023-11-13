'use client'

import Dnd from '@/components/Dnd'
import { useRole } from '@/lib/gori'

export default function Play() {
  const role = useRole()

  return (
    <div>
      <Dnd
        SendB={false}
        RollB={false}
        backgroundImage='https://res.cloudinary.com/djtsesvfs/image/upload/v1699264074/SMB/boo.png'
        disabled={false}
      />
    </div>
  )
}
