import React, {useEffect, useState} from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList';

const Home = () => {

    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0acf69043f7b4a093612f3bf53ce81c5')
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, []);
    

  return (
    <>
        <div className='poster'>
            <Carousel showThumbs={false} 
                autoPlay={true} transitionTime={3} 
                infiniteLoop={true} showStatus={false}>
                    {
                        popularMovies.map(movie => (
                            <Link key={movie.id} style={{textDecoration: "none", color: "white"}} to={`/movie/${movie.id}`}>
                                <div className='posterImage'>
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt={movie.original_title}/>
                                </div>

                                <div className='posterImage__overlay'>
                                    <div className='posterImage__title'>{movie ? movie.original_title : ''}</div>
                                    
                                    <div className='posterImage__runtime'>
                                        {movie ? movie.release_date : ''}
                                        <span className='posterImage__rating'>{movie ? movie.vote_average : ''} <i className='fas fa-star'></i></span>
                                    </div>

                                    <div className='posterImage__description'>
                                        {movie ? movie.overview : ''}
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
            </Carousel>

            <MovieList />
        </div>
    </>
  )
}

export default Home