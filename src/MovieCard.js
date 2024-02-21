import React, { useEffect, useState } from 'react'
import {FaHeart,FaRegHeart} from "react-icons/fa"
export default function MovieCard({movie}) {
    
  const {id,poster_path,title,release_date,vote_count,vote_average}= movie;
  const [isFavorite, setIsFavorite] = useState(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
    return favoriteMovies ? favoriteMovies.some(([_, movieId]) => movieId === id) : false;
  });

  const toggleFavorite =()=>{
    setIsFavorite(prev => !prev)
  }
  useEffect(()=>{
    const favMovies =JSON.parse(localStorage.getItem("favoriteMovies")) || []
    if(isFavorite){
         localStorage.setItem('favoriteMovies', JSON.stringify([...favMovies, [title,id]]))
    } else {
        localStorage.setItem('favoriteMovies',
        JSON.stringify(favMovies.filter(([_,movieId])=>movieId !== id)))
    }
  },[isFavorite,title,id])
  return (
    <div className="card">
    <img className='poster' height="150" width="150" src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt='title'/>
    <div className="card__content">
      <p className="card__title">{title}</p>
      <section className='fav-heart'>
                  <div className='heart-icon'>
                      <p>Rating: {vote_average}</p>
                      <p>Votes: {vote_count} </p>
                  </div>
                  <div>
                      <p>Release: {release_date} </p>
                      <div className='heart'>
                      <div>
                      {isFavorite ? (
                          <FaHeart className='fav-icon' color='red' onClick={toggleFavorite}/>
                      ):(
                          <FaRegHeart className='fav-icon' onClick={toggleFavorite}/>
                      )}
                      </div>
                      </div>
                      
                  </div>
      </section>
    </div>
  </div>
  )
}
