'use client'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image
} from '@nextui-org/react'
import React, { useState } from 'react'

const Dnd = ({ data, backgroundImage, disabled, SendB, RollB }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [roll, setRoll] = useState(0)
  //boton

  //I want to make a function that rolls a number between 1 and 20

  const rollDice = () => {
    setRoll(Math.floor(Math.random() * 20) + 1)
    isOpen && onClose()
    return { type: 'roll', roll: roll }
  }

  return (
    disabled === false && (
      <div
        className='h-screen w-screen'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover'
        }}>
        <div className='bg-slate-600 opacity-90 absolute top-0 right-0 mr-40 min-h-full w-1/4'>
          <div className='text-left mt-20 pr-5 pl-5' style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            {data.map((item, index) => (
              <div key={index} className='mb-4'>
                <p
                  className={`${
                    item.type === 'IA'
                      ? 'text-red-500'
                      : item.type === 'roll'
                      ? 'text-blue-500'
                      : 'text-green-500'
                  }`}>
                  <span className='text-2xl'>{item.type === 'roll' ? item.roll : item.name}</span>{' '}
                  {item.type !== 'roll' && <span className='text-white text-2xl'>— </span>}
                  <span className={`${item.type === 'IA' ? 'text-cyan-50' : 'text-gray-400'}`}>
                    {item.type !== 'roll' ? item.text : ''}
                  </span>
                </p>
              </div>
            ))}
            <div className='flex items-center'>
              <Input type='user' label='Escribe algo' />
              <Button isDisabled={SendB}>Send</Button>
              <Button isDisabled={RollB} onPress={onOpen}>
                Roll me~
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                  {onClose => (
                    <>
                      <ModalHeader className='flex flex-col gap-1 text-center'>Roll the dice!!</ModalHeader>
                      <ModalBody>
                        <Image
                          alt='A sillycato'
                          src='https://res.cloudinary.com/djtsesvfs/image/upload/v1698138754/Fuzze/NekOmgSoCute.gif'
                        />
                      </ModalBody>
                      <ModalFooter className='flex justify-center'>
                        <Button color='danger' variant='light' onPress={rollDice}>
                          ROLL!!!
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Dnd
