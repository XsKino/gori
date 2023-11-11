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

const Dnd = ({ data, backgroundImage, disabled }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  //boton
  //

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
                <p className={`${item.type === 'IA' ? 'text-red-500' : 'text-green-500'}`}>
                  <span className='text-2xl uppercase'>{item.name}</span>{' '}
                  <span className='text-white text-2xl'>— </span>
                  <span className={`${item.type === 'IA' ? 'text-cyan-50' : 'text-gray-400'}`}>
                    {item.text}
                  </span>
                </p>
              </div>
            ))}
            <div className='flex items-center'>
              <Input type='user' label='Escribe algo' />
              <Button onPress={onOpen}>Click me</Button>
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
                      <ModalFooter>
                        <Button color='danger' variant='light' onPress={onClose}>
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
