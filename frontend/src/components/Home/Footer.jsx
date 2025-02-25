import React from 'react'

const Footer = () => {
  return (
    <div className='bg-[#f0f0f5] px-40 py-20'>
        <div className='flex items-center gap-2'>
        <img src="logo.svg" alt="" className="h-12  w-12 p-2 bg-[#ff5200] rounded-2xl" />
        <p className='text-3xl font-bold text-[#ff5200]'>Jomato</p>
        </div>
        <div className='h-1 bg-gray-600 my-10'></div>
    </div>
  )
}

export default Footer