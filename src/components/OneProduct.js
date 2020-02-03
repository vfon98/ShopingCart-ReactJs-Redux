/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cart.actions';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';
import { Col } from 'reactstrap';

const OneProduct = props => {
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartReducer);
  const auth = useSelector(state => state.authReducer);
  const history = useHistory();

  const isAdded = () => {
    return cart.cart_detail.find(item => item.product.id === props.id);
  };

  const handleAddToCart = e => {
    e.stopPropagation();
    !auth.isLogin && history.push('/login');
    dispatch(addToCart(auth.token, props.id));
  };

  const handleClick = () => {
    history.push(`/products/${props.id}/detail`);
  };

  return (
    <Col md="3" sm="4" xs="6" className="mb-4">
      <div className="card card-product shadow" onClick={handleClick}>
        <img
          title={props.name}
          onError={() => setHasError(true)}
          className="card-img-top img-fluid border-bottom"
          //   src='https://via.placeholder.com/250'
          src={
            !hasError && props.image
              ? props.image
              : 'https://via.placeholder.com/250?text=placeholder'
          }
          alt="Missing image"
        />
        <div className="card-body">
          <h5
            className="card-text font-weight-bold"
            id="product-name"
            title={props.id}
          >
            {props.name}
          </h5>
          <p className="card-text font-weight-bolder text-muted mb-1">
            ${props.price.toLocaleString('en-EN')}
          </p>
          <p className="card-text mb-1">
            {props.category.map(category => category.name).join(', ')}
          </p>
          <p title={props.rating + ' stars'}>
            <StarRating rating={props.rating} />
          </p>
          <button className="btn btn-success" onClick={handleAddToCart}>
            <i
              className={'fa mr-2 ' + (isAdded() ? 'fa-check' : 'fa-cart-plus')}
            ></i>
            Add to cart
          </button>
        </div>
      </div>
    </Col>
  );
};

export default React.memo(OneProduct);
