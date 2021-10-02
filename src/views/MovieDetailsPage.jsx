import { useState, useEffect } from 'react';
import { useParams, Route, useRouteMatch, NavLink } from 'react-router-dom';

import Cast from '../components/Cast/Cast';
import Reviews from '../components/Reviews/Reviews';
import noImg from '../images/noImg.jpg';
import * as API from '../services/movie-API';
import styles from './styles.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const { url, path } = useRouteMatch();

  useEffect(() => {
    API.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <div className={styles.container}>
          <div>
            <img
              width="200"
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : noImg
              }
              alt={movie.title}
            />
          </div>

          <div className={styles.textContainer}>
            <h2 className={styles.text}>{movie.original_title}</h2>
            <p className={styles.text}>User score: {movie.vote_average}</p>
            <h3 className={styles.text}>Overview</h3>
            <p className={styles.text}>{movie.overview}</p>
            <h4 className={styles.text}>Genres</h4>
            <p className={styles.text}>
              {movie.genres.map(item => item.name).join(', ')}
            </p>
          </div>
        </div>
      )}
      <h3 className={styles.text}>Additional information</h3>
      <ul>
        <li>
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            to={`${url}/cast`}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            to={`${url}/reviews`}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Route path={`${path}/cast`}>
        <Cast id={movieId} />
      </Route>
      <Route path={`${path}/reviews`}>
        <Reviews id={movieId} />
      </Route>
    </>
  );
}
