import React from 'react';
import { Link } from 'react-router-dom';

function Review({ email, review, onDelete, onEdit}) {
  console.log('email in Review', email)
  // const button =
  //   if(review.creator_email === email)  {
  //     button = (
  //       <button onClick={onDelete}>X</button>
  //       <Link to={`/reviews/${review.id}/edit`}>Edit</Link>
  //       )
  //   } else {
  //     button = (
  //       <h4>Not Creator</h4>
  //     )
  //   }
  return (
    <div className='review-wrapper' key ={ review.id } >
      <div className='review-inner'>
      <h2>Previous Review</h2>
      <h4>Comment: { review.comments } </h4>
      <h4>Overall Rating: { review.overall_rating } </h4>
      <h4>Price Rating: { review.price_rating } </h4>
      <h4>Food Quality: { review.food_quality } </h4>
      <h5>Reviewer: { review.creator_email } </h5>
      <button onClick={onDelete}>X</button>
      <Link to={`/reviews/${review.id}/edit`}>Edit</Link>
      </div>
    </div>
  )
}

export default Review;
