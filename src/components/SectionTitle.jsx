import React from 'react'

function SectionTitle({
    title,
}){
  return (
    <div className='flex gap-10 items-center py-10'>
      <h1 className='text-3xl  text-secondary sm:text-2xl'>{title}</h1>
      <div className='w-60 h-[1px] bg-[#135e4c82]'></div>
    </div>
  )
}

export default SectionTitle
