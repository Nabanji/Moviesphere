import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  async function fetchMovies(query) {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=45a7a9fc`);
    const data = await response.json();

    console.log(data.Response);

    if (data.Response == "True") {
      setMovies(data.Search || []);
    } else {
      setError(data.Error);
      setMovies([]);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  function handleFormSubmit(e) {
    // Prevent the page from reloading once the user submits the form
    e.preventDefault();

    // After submission, the form input return to an empty string
    setSearchValue("");

    // Call the function to display movies
    fetchMovies(searchValue)
  } 


  

  return (
    <div className="movie-container">

      <nav className='navbar'>
        <h3>Movie<span>sphere</span></h3>
        <form className='search-form' onSubmit={handleFormSubmit}>
          <input 
            type="search" 
            name="search" 
            id="search" 
            value={searchValue}
            onChange={handleSearchChange}
            placeholder='Search movie...'
          />
          <button type="submit">Seach</button>
        </form>
      </nav>

      <div className="movies-container" onSubmit={handleSearchChange}>
        {error && <p className="error">{error}</p>}
        {movies.length > 0 ? (
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID}>
                <h4>{movie.Title}</h4>
                <p>{movie.Year}</p>
                <img src={movie.Poster} alt={`${movie.Title} poster`} />
              </li>
            ))}
          </ul>
          ) : (
            !error && <p>No movies found. Try searching!</p>
          )}
      </div>

    </div>


  )
}

export default App
