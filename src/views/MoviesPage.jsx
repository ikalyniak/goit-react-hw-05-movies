import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { toast } from 'react-toastify';

import * as API from '../services/movie-API';
import styles from './styles.module.css';

export default function MoviesPage() {
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  // const location = useLocation();
  // const history = useHistory();
  // const params = new URLSearchParams(location.search);
  // const foundQuery = params.get('query');

  useEffect(() => {
    if (query) {
      API.fetchSearch(query)
        .then(response => {
          // if (response.results.length === 0) {
          //   history.push({ ...location, search: '' });
          // }
          setMovies(response.results);
        })
        .catch(error => toast.error('Please, enter another movie!'));

      setQuery('');
    }
  }, [query]);

  const handleInput = event => {
    setSearchInput(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchInput.trim() === '') {
      return toast.error('Please type your query!');
    }

    setQuery(searchInput);
    setSearchInput('');
  };

  // function onInput(e) {
  //   setQuery(e.currentTarget.value.toLowerCase());
  // }
  // function onSubmit(e) {
  //   e.preventDefault();
  //   e.target.firstChild.value = '';
  //   if (query === '') {
  //     toast.warning('Please, enter movie!');
  //   } else
  //     history.push({
  //       ...location,
  //       search: `query=${query}`,
  //     });
  // }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <input
          onChange={handleInput}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
          value={searchInput}
        ></input>
        <button type="submit" className={styles.formBtn}>
          Go!
        </button>
      </form>
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
