import React from 'react'
import { Link} from 'react-router-dom'
import SearchBar from './SearchBar'
export default function Navbar({onSearch,user,logout}) {
  return (
    <div>
        <nav className='navbar'>
            <Link to='/' ><h1>NIKHIL'S TMBD</h1></Link>
            {user && <>
                <ul className='nav'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/tv">TV</Link>
                </li>
                <li>
                    <Link to="/favmov">Movie Library</Link>
                </li>
                <li>
                    <Link to="/favtv">TV Library</Link>
                </li> 
            </ul>
            <SearchBar onSearch={onSearch}/>
            </>}

            {user?<button onClick={logout} className='authbtn' >Logout</button>:<>
                <button className='authbtn'><Link to="/signUp">SignUp</Link></button>
                <button className='authbtn'><Link to="/signIn">SignIn</Link></button>
            </>}
            
            
        </nav>
    </div>
  )
}
