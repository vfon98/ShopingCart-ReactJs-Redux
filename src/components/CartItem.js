/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { udpateCartItem, deleteCartItem } from "../actions";

const CartItem = props => {
  const initialState = props.quantity;
  const [quantity, setQuantity] = useState(initialState);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <tr>
        <td data-th='Product'>
          <div className='row'>
            <div className='col-lg-2 col-sm-4'>
              <img
                src={props.image}
                alt='Missing image'
                className='img-fluid'
              />
            </div>
            <div className='col-lg-10 col-sm-8'>
              <h5 className='font-weight-bolder'>{props.name}</h5>
              <h6>Category: {props.category}</h6>
            </div>
          </div>
        </td>
        <td data-th='Price' className='text-center'>
          ${props.price.toLocaleString("en-EN")}
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
          ${(props.price * quantity).toLocaleString("en-EN")}
        </td>
        <td className='actions text-center' data-th=''>
          <button
            className='btn btn-info btn-sm'
            // Use current quantity of CartItem
            onClick={() => dispatch(udpateCartItem({ ...props, quantity }))}
          >
            <i className='fa fa-refresh'></i>
          </button>
          <button
            className='btn btn-danger btn-sm'
            onClick={() => dispatch(deleteCartItem(props.id))}
          >
            <i className='fa fa-trash-o'></i>
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default CartItem;
