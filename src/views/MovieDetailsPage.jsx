import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';

import Loader from 'react-loader-spinner';

import noImg from '../images/noImg.jpg';
import * as API from '../services/movie-API';
import styles from './styles.module.css';

const Cast = lazy(() => import('../components/Cast/Cast'));
const Reviews = lazy(() => import('../components/Reviews/Reviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    API.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const back = location?.state?.from ?? '/movies';

  const onGoBack = () => {
    history.push(back);
  };

  return (
    <>
      <button type="button" onClick={onGoBack} className={styles.formBtn}>
        &#x021D0;
      </button>
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
      <ul className={styles.nav}>
        <li>
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            // to={`${url}/cast`}
            to={{
              pathname: `${url}/cast`,
              state: { from: back },
            }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            activeClassName={styles.activeLink}
            // to={`${url}/reviews`}
            to={{
              pathname: `${url}/reviews`,
              state: { from: back },
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense
        fallback={
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        }
      >
        <Route path={`${path}/cast`}>
          <Cast id={movieId} />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews id={movieId} />
        </Route>
      </Suspense>
    </>
  );
}
