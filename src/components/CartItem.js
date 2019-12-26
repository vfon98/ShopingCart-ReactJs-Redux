/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { udpateCartItem, deleteCartItem } from "../actions";

const CartItem = props => {
  const { product } = props;
  const auth = useSelector(state => state.authReducer);
  const initialState = props.amount;
  const [quantity, setQuantity] = useState(initialState);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <tr>
        <td data-th='Product'>
          <div className='row'>
            <div className='col-lg-2 col-md-3 col-sm-4 d-flex align-items-center'>
              <img
                src={product.image}
                alt='Missing image'
                className='img-fluid rounded'
              />
            </div>
            <div className='col-lg-10 col-md-9 col-sm-8'>
              <h5 className='font-weight-bolder' title={product.name}>
                {product.name}
              </h5>
              <h6>Model: {product.model}</h6>
            </div>
          </div>
        </td>
        <td data-th='Price' className='text-center'>
          ${product.price.toLocaleString("en-EN")}
        </td>
        <td data-th='Quantity' className='text-center'>
          <input
            type='number'
            className='form-control text-center'
            min='1'
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </td>
        <td data-th='Subtotal' className='text-center'>
          ${(product.price * quantity).toLocaleString("en-EN")}
        </td>
        <td className='actions text-center' data-th=''>
          <button
            className='btn btn-info btn-sm'
            title='Update this item'
            // Use current quantity of CartItem
            onClick={() =>
              dispatch(udpateCartItem(auth.token, product.id, quantity))
            }
          >
            <i className='fa fa-refresh'></i>
          </button>
          <button
            className='btn btn-danger btn-sm'
            title='Delete this item'
            onClick={() => dispatch(deleteCartItem(auth.token, product.id))}
          >
            <i className='fa fa-trash-o'></i>
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CartItem;
