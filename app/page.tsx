import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@nextui-org/react';

const App = () => {
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className='font-bold text-inherit'>GORI</p>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        </NavbarContent>
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Button
              disableRipple
              className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-red-800 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              size="lg"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              disableRipple
              className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-red-800 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
              size="lg"
            >
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className='flex flex-col items-start justify-center h-screen bg-black text-white pl-10 relative'>
        <h1 className='text-9xl mb-4'>GORI</h1>
        <p className='text-4xl mb-6'>Welcome to the Dungeons And Dragons</p>
        <div className="flex mb-6">
          <Button
            className="bg-blue-500 text-white px-8 py-4 rounded-full mr-4"
            size="lg"
          >
            Primer Botón
          </Button>
          <Button
            className="bg-green-500 text-white px-8 py-4 rounded-full"
            size="lg"
          >
            Segundo Botón
          </Button>
        </div>
        <hr className="w-full border-t border-gray-500 mb-6" />
        <div className="bg-#FA3D3B p-6">
        <Button
            className="bg-blue-500 text-white px-8 py-4 rounded-full mr-4"
            size="lg"
          >
            Boton random
          </Button>
          <Button
            className="bg-blue-500 text-white px-8 py-4 rounded-full mr-4"
            size="lg"
          >Boton no c
          </Button>
        </div>
        <img
          src="https://i.pinimg.com/564x/9f/8c/6c/9f8c6ce76a04090621cb8efdb060cfa1.jpg"
          alt="Imagen"
          className="absolute top-0 right-20 h-3/6"  
        />
      </div>
    </>
  );
};

export default App;
