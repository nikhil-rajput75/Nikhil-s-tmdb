import React, { useEffect, useState } from 'react'

import "./App.css"
import TvCard from './TvCard'
import { useNavigate } from 'react-router-dom'
export default function Tvlist({series,user}) {
    const navigate=useNavigate()
    const [sortOrder,setSortOrder] = useState('asc')
    const sortedMovies = [...series].sort((a,b)=>{
      if(sortOrder === "asc"){
        return a.vote_count - b.vote_count
      } else{
        return b.vote_count - a.vote_count
      }
    })
    const handleSort =()=>{
        setSortOrder((prev)=>(prev === "asc"?"desc":"asc"))
    }
    useEffect(() => {
      if(!user){
        navigate("/signin") 
      }
      
    }, [user,navigate])
  return (
    <div style={{marginTop:"100px"}}>
        <div>
            <button onClick={handleSort}>
                Sort by vote average ({sortOrder==="asc"?"Ascending":"Descending"})
            </button>
            
        </div>
        <ul className='movielist'>
            {sortedMovies.map((tv)=>
            <TvCard  key={tv.id} tv = {tv}/>)}
        </ul>
    
    </div>
  )
}
