import React, { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import Loader from "./Loader";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async (title) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://movie-website-3.onrender.com/api/search?q=${title}`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setError('Failed to fetch movies. Please try again later.');
    }
    setLoading(false);
  }

  useEffect(() => {
    searchMovies('superman');
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className="search">
        <input 
          placeholder="Search for movies" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search"  
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      {loading ? <Loader/> :
       movies?.length > 0
       ? (
         <div className="container">
           {
             movies.map((movie, index) => (
               <MovieCard key={index} movie={movie} />
             ))
           }
         </div>
       ) : (
         <div className="empty">
           <h2>No Movies Found</h2>
         </div>
       )
      }
    </div>
  );
}

export default App;
