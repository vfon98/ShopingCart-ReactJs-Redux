/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions";

const OneProduct = ({ id, name, image, price, category }) => {
  const dispatch = useDispatch();
  return (
    <div className='col-lg-3 col-md-4 col-sm-6 mb-4'>
      <div className='card card-product shadow'>
        <img
          className='card-img-top'
          //   src='https://via.placeholder.com/250'
          src={image || "https://via.placeholder.com/250"}
          alt='Missing image'
        />
        <div className='card-body'>
          <h5 className='card-text font-weight-bold'>{name}</h5>
          <p className='card-text font-weight-bolder text-secondary mb-1'>
            Price: ${price}
          </p>
          <p className=''>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star-half-o'></i>
          </p>
          <button
            className='btn btn-success'
            onClick={() =>
              dispatch(addToCart({ id, name, image, price, category, quantity: 1 }))
            }
          >
            <i className='fa fa-cart-plus mr-2'></i>Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OneProduct);