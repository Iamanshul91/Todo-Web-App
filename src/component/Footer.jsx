import React from 'react'

const Footer = () => {

  function Heart() {
    return <div className='black'>{'\u2665'}</div>;
  }
  
  return (
    <div className='bg-orange-400 absolute w-full'>
        <div className='my-2 flex justify-center gap-2 px-2 font-bold text-sm relative bottom-0 text-white'>Made by Anshul {Heart()}</div>
    </div>
  )
}

export default Footer
