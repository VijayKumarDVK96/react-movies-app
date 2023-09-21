import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useParams } from 'react-router-dom';

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    const formattedType = type ? type.replace('-', '_') : 'popular';
    const typeTitle = formattedType.replace('_', ' ');

    useEffect(() => {
      getData(formattedType);
    }, [formattedType]);

    const getData = (dataType) => {
        fetch(`https://api.themoviedb.org/3/movie/${dataType}?api_key=0acf69043f7b4a093612f3bf53ce81c5`)
        .then(res => res.json())
        .then(data => setMovieList(data.results));
    }
    
    return (
        <div className='movie__list'>
            <h2 className='list__title'>{typeTitle.toUpperCase()}</h2>
    
            <div className='list_cards'>
                {
                    movieList.map(movie => (
                        <Card key={movie.id} movie={movie}/>
                    ))
                }
            </div>
        </div>
    );
}

export default MovieList;
