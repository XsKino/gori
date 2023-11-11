'use client'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import React, { useState } from 'react'

const Dnd = ({ data, backgroundImage, disabled }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  //boton
  const [isLabelDisabled, setLabelDisabled] = useState(false)
  const toggleLabel = () => setLabelDisabled(() => !isLabelDisabled)
  //

  return (
    disabled === false && (
      <div
        className='h-screen w-screen bg-red-500'
        style={
          {
            // backgroundImage: `url(${backgroundImage})`
          }
        }>
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
            <Input type='email' label='Email' disabled={isLabelDisabled} />
          </div>
        </div>
      </div>
    )
  )
}

export default Dnd
