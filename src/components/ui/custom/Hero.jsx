import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex  flex-col items-center mx-56 gap-9' >
      
      <h1 className='font-extrabold text-[50px] text-center mt-16'
      ><span className='text-[#e77364]'
      >Navigate the World with Ease.</span><br/> Personalized Itineraries at your fingertips</h1>
      <p className='text-xl text-gray-500 text-center'
      >Start planning today and make every journey unforgettable! 🚀.</p>
      <Link to={'/create-trip'}>
      <Button>Get Started It's Free</Button>
      </Link>
    
    </div>
  )
}

export default Hero
