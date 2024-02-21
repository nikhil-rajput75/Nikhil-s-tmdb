import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import MovieList from './MovieList'
import FavMovie from './FavMovie'
import Navbar from './Navbar'
import Home from './Home'
import Tvlist from './Tvlist'
import FavTv from './FavTv'
import Pagination from './Pagination'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import {signOut}  from "firebase/auth"


export default function App() {
  const [user,setUser] = useState()
  const [movies,setMovies]=useState([])
  const [series,setSeries]=useState([])
  const [currentMoviePage,setCurrentMoviePage] = useState(100);
  const [currentSeriesPage,setCurrentSeriesPage] = useState(1);
  const [totalMoviePages,setTotalMoviePages] = useState(0)
  const fetchMovies =async (page)=>{
   try {
    const reponse =await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
    const result = await reponse.json()
    setMovies(result.results);
    setTotalMoviePages(result.total_pages);

   } catch (error) {
    console.log("error",error)
   } 
  }
  const fetchSeries =async (page)=>{
    try {
     const reponse =await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=f531333d637d0c44abc85b3e74db2186&language=en-US&page=${page}`);
     const result = await reponse.json()
     setSeries(result.results);
     setTotalMoviePages(result.total_pages);
 
    } catch (error) {
     console.log("error",error)
    } 
   }

  const logout=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      setUser("")
    }).catch((error) => {
      // An error happened.
      console.log("hi")
    });
  }
  useEffect(()=>{
    fetchMovies(currentMoviePage)
    fetchSeries(currentSeriesPage) // Check this later
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user.displayName)
      }
      else{
        setUser("")
      }
    })
  },[currentMoviePage,currentSeriesPage])
  const handleMovieSearch = async (query)=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=f531333d637d0c44abc85b3e74db2186&include_adult=false&language=en-US&page=1`);
      const result = await response.json();
      setMovies(result.results);
      setTotalMoviePages(result.total_pages);
      // setCurrentPage(1);

    } catch (error) {
      console.log("error",error)
    }
  }
  // const handleTvSearch = async (query)=>{
  //   try {
  //     const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&api_key=f531333d637d0c44abc85b3e74db2186&include_adult=false&language=en-US&page=1`);
  //     const result = await response.json();
  //     setMovies(result.results);
  //     setTotalMoviePages(result.total_pages);
  //     // setCurrentPage(1);

  //   } catch (error) {
  //     console.log("error",error)
  //   }
  // }
  const handlePageChange = (page)=>{
    setCurrentMoviePage(page)
  }
  return (
    <div>
      
      <BrowserRouter>
      <Navbar onSearch={handleMovieSearch} user={user} logout={logout}/>
        <Routes>
          <Route path='/' element={<Home user={user}/>}/>
          <Route path="/movies" element={<div>
            <MovieList movies={movies} user={user} />
            <Pagination currentPage={currentMoviePage} totalPages ={totalMoviePages} onPageChange={handlePageChange} user={user}/>
          </div>}/>
          <Route path='/favmov' element={<FavMovie user={user}/>}/>
          <Route path='tv' element={<Tvlist series={series} user={user}/>}/>
          <Route path='/favTv' element={<FavTv user={user}/>}/>
          <Route path='/signUp' element={<Signup/>} />
          <Route path='/signIn' element={<Signin/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
