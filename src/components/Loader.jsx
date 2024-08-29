import React from 'react'

function Loader() {
  return (
    <div className='h-screen flex justify-center items-center fixed inset-0 bg-primary'>
      <div className="flex gap-5 text-6xl font-semibold sm:text-3xl">
        <h1 className="text-secondary d">O</h1>
        <h1 className="text-white o">D</h1>
        <h1 className="text-tertiary k">D</h1>
      </div>
    </div>
  )
}

export default Loader
