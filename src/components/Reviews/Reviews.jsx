import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as API from '../../services/movie-API';
import styles from './Reviews.module.css';

export default function Reviews({ id }) {
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

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};
