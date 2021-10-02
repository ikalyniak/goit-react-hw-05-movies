import { useState, useEffect } from 'react';

import * as API from '../../services/movie-API';
import noImg from '../../images/noImg.jpg';
import styles from './Cast.module.css';

export default function Cast({ id }) {
  // const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    API.fetchCast(id).then(response => setCast(response.cast));
  }, [id]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(item => {
            return (
              <li className={styles.card} key={item.id}>
                <img
                  width="100"
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                      : noImg
                  }
                  alt={item.name}
                ></img>
                <p className={styles.text}>{item.name}</p>
                <p className={styles.text}>
                  <span>
                    <b>Character</b>
                  </span>
                  : {item.character}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
