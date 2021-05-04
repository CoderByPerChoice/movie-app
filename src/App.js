import React, { useEffect, useState } from 'react';
import './index.css';
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?api_key=26ba5e77849587dbd7df199727859189&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=26ba5e77849587dbd7df199727859189&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getMovies = (API) => {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
  }

  useEffect(() => {
    getMovies(FEATURED_API);
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  }

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  }

  return (
    <>
      <header>
        <form onSubmit={handleFormSubmit}>
          <input
            className="search"
            placeholder="Search..."
            type="search"
            value={searchTerm}
            onChange={handleOnChange} />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) =>
          <Movie {...movie} key={movie.id} />
        )}

      </div>
    </>
  );
}

export default App;
