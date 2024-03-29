import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import "./App.css"
import { useNavigate } from 'react-router-dom'
export default function MovieList({movies,user}) {
    const [sortOrder,setSortOrder] = useState('asc')
    const navigate = useNavigate()
    useEffect(() => {
      if(!user){
        navigate("/signin") 
      }
      
    }, [user,navigate])
    const sortedMovies = [...movies].sort((a,b)=>{
      if(sortOrder === "asc"){
        return a.vote_count - b.vote_count
      } else{
        return b.vote_count - a.vote_count
      }
    })
    const handleSort =()=>{
        setSortOrder((prev)=>(prev === "asc"?"desc":"asc"))
    }
  return (
    <div style={{marginTop:"100px"}}>
        <div>
            <button onClick={handleSort}>
                Sort by vote average ({sortOrder==="asc"?"Ascending":"Descending"})
            </button>
            
        </div>
        <ul className='movielist'>
            {sortedMovies.map((movie)=>
            <MovieCard  key={movie.id} movie={movie}/>)}
        </ul>
    
    </div>
  )
}
