/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions";
import { useHistory } from "react-router-dom";

const OneProduct = ({ id, name, image, price, category, userID }) => {
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const cart = useSelector(state => state.cartReducer.cart);
  const history = useHistory();
  const handleAddToCart = () => {
    if (!isLogin) {
      history.push("/login");
      return;
    }
    cart.forEach(item => {
      if (item.name === name) console.log("existed");
    });
    dispatch(
      addToCart({ id, name, image, price, category, quantity: 1, userID })
    );
  };
  return (
    <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
      <div className='card card-product shadow'>
        <img
          onError={() => setHasError(true)}
          className='card-img-top'
          //   src='https://via.placeholder.com/250'
          src={
            !hasError ? image : "https://via.placeholder.com/150?text=missing"
          }
          alt='Missing image'
        />
        <div className='card-body'>
          <h5 className='card-text font-weight-bold'>{name}</h5>
          <p className='card-text font-weight-bolder text-secondary mb-1'>
            Price: ${price}
          </p>
          <p className='card-text mb-1'>{category}</p>
          <p>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star-half-o'></i>
          </p>
          <button className='btn btn-success' onClick={handleAddToCart}>
            <i className='fa fa-cart-plus mr-2'></i>Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OneProduct);
