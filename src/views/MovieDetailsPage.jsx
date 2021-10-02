import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as API from '../services/movie-API';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    API.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <img
            width="300"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://lh3.googleusercontent.com/proxy/mDLHqf1LeZJiGOEkrFMUd-hZnv7t-EYJVVyIyUyBdm3Iwd-ojhubeyc1D3UMN9VAfx97Jgq5nccaWB5iUyjmf1jV1vp35K8BrwJTu2C7bgekGNhn8PLv8Us'
            }
            alt="Poster_image"
          />
          <h2>{movie.original_title}</h2>
          <p>User score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{movie.genres.map(item => item.name).join(', ')}</p>
        </>
      )}
    </>
  );
}
