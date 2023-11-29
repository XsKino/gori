const Selection = ({ setSelectedComponent }) => {
  return (
    <div className='flex h-screen'>
      <button
        className='flex-1 bg-red-500 text-4xl flex items-center justify-center'
        onClick={() => setSelectedComponent('Preset')}>
        Usar preset
      </button>
      <button
        className='flex-1 bg-blue-500 text-4xl flex items-center justify-center'
        onClick={() => setSelectedComponent('Own')}>
        Crear nuevo
      </button>
    </div>
  )
}

export default Selection
