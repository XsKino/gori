import React from 'react';
import { Button } from '@nextui-org/react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 h-full w-1/4 flex flex-col items-center justify-center shadow-lg z-10">
      {/* Contenido de la barra lateral */}
      <Button
        className="bg-blue-500 text-white px-8 py-4 rounded-full mb-4"
        size="lg"
      >
        Option 1
      </Button>
      <Button
        className="bg-green-500 text-white px-8 py-4 rounded-full"
        size="lg"
      >
        Option 2
      </Button>
    </div>
  );
};

const App = () => {
  return (
    <div className='flex h-screen bg-black text-white'>
      <Sidebar />
      <div className="flex flex-col items-start justify-center w-3/4 p-10 relative">
        <h1 className='text-9xl mb-4'>GORI</h1>
        <p className='text-4xl mb-6'>Welcome to the Dungeons And Dragons</p>
        <div className="flex mb-6">
          <Button
            className="bg-blue-500 text-white px-8 py-4 rounded-full mr-4"
            size="lg"
          >
            Loging
          </Button>
          <Button
            className="bg-red-800 text-white px-8 py-4 rounded-full"
            size="lg"
          >
            Create account
          </Button>
        </div>
        <hr className="w-full border-t border-gray-500 mb-6" />
        <div className="bg-#FA3D3B p-6">
          <Button
            className="bg-red-800 text-white px-8 py-4 rounded-full mr-4"
            size="lg"
          >
            Maps
          </Button>
          <Button
            className="bg-blue-500 text-white px-8 py-4 rounded-full mr-4"
            size="lg"
          >
            Chacacters
          </Button>
        </div>
        <img
          src="https://i.pinimg.com/736x/6d/87/d1/6d87d1304baee4faf2a02699fbcce04e.jpg"
          alt="Imagen"
          className="absolute top-15 right-0 w-3/10 h-auto"
        />
      </div>
    </div>
  );
};

export default App;
