import React from 'react';

function Restaurant(props) {
  console.log('props', props)
  console.log('props.restaurant', props.restaurant[0].restaurant)
  return (
    <div>
      <div className='restaurant-card'>
        <h2> { props.restaurant[0].restaurant.name } </h2>
        <h3> Rating: { props.restaurant[0].restaurant.user_rating.aggregate_rating } </h3>
        <h3> Cuisine: { props.restaurant[0].restaurant.cusines } </h3>
        <h3> Cost for Two: { props.restaurant[0].restaurant.average_cost_for_two } </h3>
        <h4> Address: { props.restaurant[0].restaurant.location.address } </h4>
      </div>
    </div>
  )
}

export default Restaurant;
