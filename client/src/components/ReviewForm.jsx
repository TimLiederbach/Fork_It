import React, { Component } from 'react';

class ReviewForm extends Component {
  constructor() {
    super();
    this.state = {
      creator_email: '',
      res_id: '',
      restaurant_name: '',
      overall_rating: '',
      price_rating: '',
      food_quality: '',
      comments:
    }
  this.handleInputChange = this.handleInputChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmitReview(e) {
    e.preventDefault();
    this.props.onLogin(this.state);
    this.setState({
      creator_email: '',
      res_id: '',
      restaurant_name: '',
      overall_rating: '',
      price_rating: '',
      food_quality: '',
      comments: '',
      hasSubmitted: true
    });
  }

  render() {
    return (
      <div>

        { this.state.hasSubmitted && <Redirect to ='/restaurants/' />}

        <form onSubmit={ this.handleSubmitReview }>

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
          >Submit
          </button>

        </form>
      </div>
    )
  }
}

export default ReviewForm;
