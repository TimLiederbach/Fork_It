import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SearchDashboard extends Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      entity_id: 36932
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      keyword: '',
      hasUserSubmitted: true
    });
  }

  render() {
    return (
      <div>
        <input
          type='text'
          ref='term'
          name='term'
          placeholder="Search term" />

        {this.state.isUserLoggedIn && <Redirect to ='/' />}

        <form onSubmit={this.handleSubmit}>

          <label>
            <input
              type='text'
              onChange={this.handleInputChange}
              value={this.state.keyword}
              name='keyword'
              placeholder='search cuisine or restaurant'
            />
          </label>

          <button
            type='submit'
            className='search-button'
          >Search
          </button>

        </form>
      </div>
    )
  }
}

export default SearchDashboard;
