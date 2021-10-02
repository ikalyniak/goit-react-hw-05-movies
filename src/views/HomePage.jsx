import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as API from '../services/movie-API';
import styles from './styles.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    API.fetchTrending().then(response => {
      setMovies(response.results);
    });
  }, []);

  return (
    <>
      <h1 className={styles.text}>Trending today</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link className={styles.link} to={`movies/${movie.id}`}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
