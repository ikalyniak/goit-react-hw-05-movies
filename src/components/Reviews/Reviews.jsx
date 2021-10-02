import { useState, useEffect } from 'react';

import * as API from '../../services/movie-API';
import styles from './Reviews.module.css';

export default function Reviews({ id }) {
  // const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    API.fetchReviews(id).then(response => setReviews(response.results));
  }, [id]);

  return (
    <>
      {reviews && reviews > 0 ? (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.author}>
                <h3 className={styles.reviewTitle}>{review.author}</h3>
                <p className={styles.review}>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        'No reviews...'
      )}
    </>
  );
}

/**
 <ul>
        {results && results.length > 0 ? (
          results.map(result => (
            <li key={result.id} className={s.ReviewCard}>
              <div className={s.imageSection}>
                <b>{result.author}:</b>
                <p>{result.content}</p>
              </div>
            </li>
          ))
        ) : (
          <b>No reviews!</b>
        )}
      </ul>
 
 */
