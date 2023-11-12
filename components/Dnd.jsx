/* eslint-disable no-unused-vars */
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
import Dice from '@/components/Dice'
import React, { useState } from 'react'

const Dnd = ({ backgroundImage, disabled, SendB, RollB }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2, onClose: onClose2 } = useDisclosure()

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
                  <ModalHeader className='flex flex-col gap-1 text-center'>
                    Im God, Roll the dice!
                  </ModalHeader>
                  <ModalBody className='flex  justify-center items-center '>
                    <Image
                      alt='Dado 20'
                      src='https://images-geeknative-com.exactdn.com/wp-content/uploads/2021/05/01133259/eye-dice-gif-250x250.gif?strip=all&lossy=1&sharp=1&ssl=1'
                    />
                  </ModalBody>
                  <ModalFooter className='flex  justify-center items-center'>
                    <Button
                      color='danger'
                      variant='light'
                      onPress={() => {
                        onOpenChange2()
                      }}>
                      ROLL!
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <Modal isOpen={isOpen2} onPress={onClose} onOpenChange={onOpenChange2}>
                <ModalContent>
                  <ModalHeader className='flex flex-col gap-1 text-center'>The dice says...</ModalHeader>
                  <ModalBody className='flex  justify-center items-center '>
                    <Dice
                      callback={() => {
                        setTimeout(() => {
                          onClose()
                          onClose2()
                        }, 1500)
                      }}
                    />
                  </ModalBody>
                  <ModalFooter className='flex  justify-center items-center'>Good luck...</ModalFooter>
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
