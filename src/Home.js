import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home({user}) {
  const navigate = useNavigate()
  
  
  
  return (

    <div className='homebtns'>
      <button onClick={()=>navigate("/movies")}>Movies</button>
      <button onClick={()=>navigate("/tv")}>Tv</button>
    </div> 
  )
}
