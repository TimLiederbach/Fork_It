import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function RestaurantList(props) {
  console.log(props)
  return (
    <div className="restaurant-list">

      { props.restaurants.map((restaurant, index) => (
        <Link to={ '/restaurants/' + restaurant.restaurant.id }>
          <div className="restaurant" key={ restaurant.restaurant.id } >

            <h3 className='rest-text'> { restaurant.restaurant.name } </h3>

            <img className='rest-img' src={props.images[index]}/>

            <h4 className='rest-text'> Rating:
              { restaurant.restaurant.user_rating.aggregate_rating }
            </h4>

            <h5 className='rest-text'> Price for two:
              { restaurant.restaurant.average_cost_for_two }
            </h5>

            <h4 className='rest-text'>Location:
              { restaurant.restaurant.location.address }
            </h4>

          </div>
        </Link>
      ))}
    </div>
    )
  }

export default RestaurantList;


      // { props.restaurants.map(restaurant => (
      //   <div className="restaurant" key={ props.restaurants.restaurant.id} >

      //     <img src={ restaurant.image_url } height='300' />

      //     <h3> { props.restaurants.restaurant.name } </h3>

      //     <h5> Rating:
      // //       { props.restaurants.restaurant.user_rating.aggregate_rating }
      // //     </h5>

      //     <h5> Rating:
      //       { props.restaurants.restaurant.user_rating.aggregate_rating }
      //     </h5>

      //     <h4>Location:
      //       { props.restaurants.restaurant.location.address }
      //     </h4>

      //     <h5> Price for two:
      //       { props.restaurants.restaurant.average_cost_for_two }
      //     </h5>
      //   </div>
      // ))}
