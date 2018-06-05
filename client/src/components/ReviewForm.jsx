import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ReviewForm extends Component {
  constructor(props) {
    console.log('ReviewForm props',props)
    super(props);
    this.state = {
      redirectHome: false,
      review: Object.assign({

        overall_rating: '',
        price_rating: '',
        food_quality: '',
        comments: ''
      }, props.initialValue)
    }
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmitReview = this.handleSubmitReview.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState((prevState, props) => ({
      review: {
        ...prevState.review,
        [name]: value
      }
    }));
  }

  handleSubmitReview(e) {
    e.preventDefault();
    this.props.onSubmit({...this.state.review, creator_email: this.props.email, res_id: this.props.restaurant.id, restaurant_name: this.props.restaurant.name });
    this.setState({
      redirectHome: true
    });
  }

  render() {
    const { creator_email, res_id, restaurant_name, overall_rating, price_rating, food_quality, comments, id } = this.state.review
    return (
      <div className='login-wrapper'>
        <div className='login-div'>
          <form onSubmit={ this.handleSubmitReview }>
          {this.state.redirectHome && <Redirect to='/restaurants' />}
          { !id && <h2>Create Review</h2> }

            <label>
              Overall Rating (1-5):
              <input
                type='integer'
                pattern="[1-5]"
                onChange={ this.handleInputChange }
                value={ this.state.overall_rating }
                name='overall_rating'
              />
            </label>

            <label>
              Price Rating (1-5):
              <input
                type='integer'
                onChange={ this.handleInputChange }
                value={ this.state.price_rating }
                name='price_rating'
              />
            </label>

            <label>
              Food Quality (1-5):
              <input
                type='integer'
                onChange={ this.handleInputChange }
                value={ this.state.food_quality }
                name='food_quality'
              />
            </label>

               <label>
              Comments:
              <input
                type='text'
                onChange={ this.handleInputChange }
                value={ this.state.comments }
                name='comments'
              />
            </label>

            <button
              type='submit'
              className='login-button'
            > { id ? 'Edit Review' : 'Create Review'}
            </button>

            <Link to='/restaurants'>Cancel</Link>
          </form>
        </div>
      </div>
    )
  }
}

export default ReviewForm;
