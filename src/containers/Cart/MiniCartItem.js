/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { udpateCartItem, deleteCartItem } from '../../actions/cart.actions';

const MiniCartItem = props => {
  const { product } = props;
  const auth = useSelector(state => state.authReducer);
  const cart = useSelector(state => state.cartReducer);
  const [quantity, setQuantity] = useState(props.amount);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(props.amount);
  }, [props.amount])

  const handleDeleteItem = () => {
    if (confirm('Are you sure to delete ?')) {
      dispatch(deleteCartItem(auth.token, product.id));
    }
  };

  return (
    <tr>
      <td data-th='Product' title={product.name}>
        <img
          src={product.image || 'https://via.placeholder.com/50'}
          className='img-fluid'
          alt=''
        />
      </td>
      <td data-th='Quantity' className='text-center'>
        <input
          type='number'
          className='form-control text-center p-0 pr-1 pl-n1 m-0'
          min='1'
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
      </td>
      <td data-th='Subtotal' className='text-center'>
        ${(product.price * quantity).toLocaleString('en-EN')}
      </td>
      <td className='actions text-center' data-th=''>
        <button
          className='btn btn-info btn-sm'
          title='Update this item'
          // Use current quantity of MiniCartItem
          onClick={() =>
            dispatch(udpateCartItem(auth.token, product.id, quantity))
          }
        >
          <i className={'fa fa-refresh' + (cart.isPending ? ' fa-spin' : '')}></i>
        </button>
        <button
          className='btn btn-danger btn-sm'
          title='Delete this item'
          onClick={handleDeleteItem}
        >
          <i className='fa fa-trash-o'></i>
        </button>
      </td>
    </tr>
  );
};

export default React.memo(MiniCartItem);
