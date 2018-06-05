import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route, Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Review from './Review';
import dotenv from 'dotenv';
const BASE_URL = process.env.REACT_APP_BASE_URL;

class ReviewList extends Component {
  constructor(props)  {
    super(props);
    this.state = {

    }
    this.handleCreateReview = this.handleCreateReview.bind(this);
  }

  handleCreateReview(review)  {
    console.log('ReviewList review', review)
    this.props.onSubmit(review);
    this.setState({
      wantsToCreate: true
    });
  }

  render() {
    { this.state.wantsToCreate && <Redirect to='/restaurants' /> }
  const restaurantId = this.props.restaurant[0].restaurant.R.res_id
  const reviews = this.props.reviews.filter(review =>
    review.res_id === restaurantId)
  console.log('this.props.email', this.props)

    return(
      <div>

        <ReviewForm
          email={ this.props.email }
          restaurant={ this.props.restaurant[0].restaurant }
          onSubmit={ this.handleCreateReview }
        />

        { reviews.map(review => (
          <Router>
            <Switch key={ review.id }>
              <Route
                render={() => (
                  <Review
                    onDelete={()=> this.props.onDelete(review.id)}
                    review={ review }
                    email={ this.props.email }
                  />
                )}
              />
            </Switch>
          </Router>
        ))}

      </div>
    )
  }
}

export default ReviewList;

// import React, { Component } from 'react';
// import dotenv from 'dotenv';

// const BASE_URL = process.env.REACT_APP_BASE_URL;

// class ReviewList extends Component {
//   constructor(props)  {
//     console.log('Review list props.restaurant[0].restaurant.R.res_id', props.restaurant[0].restaurant.R.res_id)
//     console.log('Review list props.reviews[0].res_id', props.reviews[0].res_id)
//     super(props);
//     this.state = {
//     }
//   }

//   render()  {
//     const restaurantId = this.props.restaurant[0].restaurant.R.res_id
//     const reviews = this.props.reviews.filter(review =>
//       review.res_id === restaurantId)
//     return(
//       <div>
//         <button>Create Review</button>
//         { reviews.map(review => (
//           <div key ={ review.id } >
//             <h3>Comment: { review.comments } </h3>
//             <h4>Overall Rating: { review.overall_rating } </h4>
//             <h4>Price Rating: { review.price_rating } </h4>
//             <h4>Food Quality: { review.food_quality } </h4>
//             <h5>Reviewer: { review.creator_email } </h5>
//           </div>
//         ))}
//       </div>
//       )
//   }
