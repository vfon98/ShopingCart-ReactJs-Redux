import React from 'react';
import StarRating from '../StarRating';
import useInput from '../useInput';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../../actions/cart.actions';

const ProductInfo = props => {
  const { product } = props;
  const [quantity, bindQuantity] = useInput(1);
  const auth = useSelector(state => state.authReducer);
  const history = useHistory();
  const dispatch = useDispatch();

  const checkLogin = () => {
    !auth.isLogin && history.push('/login');
  };

  const handleBuyNow = () => {
    checkLogin();
    dispatch(addToCart(auth.token, product.id, quantity));
    history.push('/cart');
  };

  const handleAddToCart = () => {
    checkLogin();
    dispatch(addToCart(auth.token, product.id, quantity));
  };

  const renderTags = () => {
    return product.tag.split(',').map((tag, index) => (
      <span key={index} className="badge badge-pill badge-success mr-1">
        {tag}
      </span>
    ));
  };

  return (
    <div className="col-md-5 border py-2" id="prod-info">
      <h3 id="name">{product.name}</h3>
      <StarRating rating={product.rating} />
      <div>Tag: {renderTags()}</div>
      <hr />
      <div className="text-warning h2" id="price">
        US ${product.price.toLocaleString('en-EN')}
      </div>
      <dl>
        <dt>Description</dt>
        <dd>{product.description}</dd>
      </dl>
      <div>
        <dl>
          <dt>Model</dt>
          <dd>{product.model}</dd>
        </dl>
        <dl>
          <dt>Category</dt>
          <dd>{product.category.map(cate => cate.name).join(', ')}</dd>
        </dl>
        <dl>
          <dt>Color</dt>
          <dd>{product.color}</dd>
        </dl>
      </div>
      <hr className="mt-n2" />
      <form className="form-inline">
        <div className="form-group">
          <label className="col-sm-2 col-form-label">Quantity</label>
          <input
            type="number"
            className="form-control text-center col-sm-2"
            min="1"
            value={quantity}
            {...bindQuantity}
          />
          <div className="col-sm-6 text-right">
            <button className="btn btn-outline-info text-dark" type="button">
              <i className="fa fa-thumbs-o-up fa-lg text-primary"></i>{' '}
              {product.favorites}
            </button>
          </div>
        </div>
      </form>
      <hr />
      <div className="d-flex">
        <button
          type="button"
          className="btn flex-grow-1 btn-lg btn-danger m-1 text-nowrap"
          onClick={handleBuyNow}
        >
          <i className="fa fa-cart-arrow-down fa-lg mr-2"></i>Buy Now
        </button>
        <button
          type="button"
          className="btn flex-grow-1 btn-lg btn-outline-success m-1 text-nowrap"
          onClick={handleAddToCart}
        >
          <i className="fa fa-cart-plus fa-lg mr-2"></i>Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
