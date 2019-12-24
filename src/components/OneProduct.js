/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addExistedItem } from "../actions";
import { useHistory } from "react-router-dom";

const OneProduct = props => {
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const cart = useSelector(state => state.cartReducer.cart);
  const history = useHistory();

  const isAdded = () => {
    return cart.find(item => item.name === props.name);
  };

  const handleAddToCart = () => {
    // if (!isLogin) {
    //   history.push("/login");
    //   return;
    // }

    // Check existed item
    if (isExistedItem(props.id)) {
      console.log("EXISTED");
      dispatch(addExistedItem({ ...props }));
    } else {
      dispatch(addToCart({ ...props, quantity: 1, userID: -1 }));
    }
  };

  const isExistedItem = itemID => {
    return cart.find(item => item.id === itemID);
  };

  // Redering rating stars
  const RatingStars = rating => {
    // Rounded to nearest 0.5
    rating = Math.round(rating * 2) / 2;
    let starIcons = [];
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) starIcons.push(<i key={i} className='fa fa-star'></i>);
      else if (rating === 0.5)
        starIcons.push(<i key={i} className='fa fa-half-star-o'></i>);
      else starIcons.push(<i key={i} className='fa fa-star-o'></i>);
      rating--;
    }
    return starIcons;
  };

  return (
    <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
      <div className='card card-product shadow'>
        <img
          title={props.name}
          onError={() => setHasError(true)}
          className='card-img-top img-fluid border-bottom'
          //   src='https://via.placeholder.com/250'
          src={
            !hasError && props.image
              ? props.image
              : "https://via.placeholder.com/250?text=placeholder"
          }
          alt='Missing image'
        />
        <div className='card-body'>
          <h5 className='card-text font-weight-bold' id='product-name'>
            {props.name}
          </h5>
          <p className='card-text font-weight-bolder text-muted mb-1'>
            ${props.price.toLocaleString("en-EN")}
          </p>
          <p className='card-text mb-1'>
            {props.category.map(category => category.name).join(', ')}
          </p>
          <p>{RatingStars(props.rating)}</p>
          <button className='btn btn-success' onClick={handleAddToCart}>
            <i
              className={"fa mr-2 " + (isAdded() ? "fa-check" : "fa-cart-plus")}
            ></i>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OneProduct);
