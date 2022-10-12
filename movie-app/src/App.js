import {useState, useEffect } from 'react';
//dc259aec
import './App.css';
import SearchIcon from './search.svg';

import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com?apikey=dc259aec';

const movie1 = {
    "Title": "The Batman",
    "Year": "2022",
    "imdbID": "tt1877830",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg"
}

//fetch data from API as soon as component loads

const App = () => {

    const [movies,setMovies] = useState([]);

    const[searchTerm, setSearchTerm] = useState([]);



    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(`Batman`);
    },[]);

  return (
    <div className='app'>
        <h1>MovieLibrary</h1>

        <div className='search'>

        <input placeholder='Search for Movies' 
        value={searchTerm} 
        onChange={(e)=> {setSearchTerm(e.target.value)}}/>


        <img src ={SearchIcon} alt="search" onClick={()=> searchMovies(searchTerm)}
        />
        </div>
    
    
        {movies?.length > 0
        ? (   
            <div className='container'>
                {movies.map((movie)=>(
                    <MovieCard movie={movie}/>
                ) )}
                </div>
                ) : (
                    <div className='empty'>
                    <h2>No movies found</h2>
                    </div>
                )
        }
    </div>
  );
}

export default App;


