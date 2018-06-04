import React, { Component } from 'react';
import dotenv from 'dotenv';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class ReviewList extends Component {
  constructor(props)  {
    console.log('Review list props.restaurant[0].restaurant.R.res_id', props.restaurant[0].restaurant.R.res_id)
    console.log('Review list props.reviews[0].res_id', props.reviews[0].res_id)
    super(props);
    this.state = {
    }
  }

  render()  {
    const restaurantId = this.props.restaurant[0].restaurant.R.res_id
    const reviews = this.props.reviews.filter(review =>
      review.res_id === restaurantId)
    return(
      <div>
        <button>Create Review</button>
        { reviews.map(review => (
          <div key ={ review.id } >
            <h3>Comment: { review.comments } </h3>
            <h4>Overall Rating: { review.overall_rating } </h4>
            <h4>Price Rating: { review.price_rating } </h4>
            <h4>Food Quality: { review.food_quality } </h4>
            <h5>Reviewer: { review.creator_email } </h5>
          </div>
        ))}
      </div>
      )
  }
}

export default ReviewList;
