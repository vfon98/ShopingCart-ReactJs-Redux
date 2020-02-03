/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, UncontrolledPopover, PopoverBody, Button } from 'reactstrap';
import MiniCartItem from '../Cart/MiniCartItem';
import { Link, useHistory } from 'react-router-dom'

function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(state => state.cartReducer);
  const togglePopover = () => setIsOpen(!isOpen);
  const history = useHistory();

  useEffect(() => {
    history.listen(() => isOpen && togglePopover())
  }, [isOpen])

  return (
    <div id='mini-cart'>
      <UncontrolledPopover
        placement='auto'
        target='bs-mini-cart'
        isOpen={isOpen}
        toggle={togglePopover}
      >
        <PopoverBody>
          <Table
            size='sm'
            id='tbl-mini-cart'
            className='pb-0 mb-0'
            striped
            hover
            responsive
            borderless
          >
            <thead className='thead-inverse'>
              <tr>
                <th>Product</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render MiniCart */}
              {cart.cart_detail.length ? (
                cart.cart_detail.map(item => (
                  <MiniCartItem {...item} key={item.product.id} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan='4'
                    className='text-center text-danger h5 font-italic'
                  >
                    Empty cart !
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='2'>
                  <strong>Total: ${cart.total.toLocaleString('en-EN')}</strong>
                </td>
                <td colSpan='2' className='text-right p-0'>
                  <Link to='/cart'>
                    <Button
                      color='warning'
                      className='text-nowrap my-2'
                      size='sm'
                      block
                    >
                      <i className='fa fa-shopping-basket mr-1'></i>Go to cart
                    </Button>
                  </Link>
                </td>
              </tr>
              <tr>
                <td colSpan='4' className='p-0'>
                  <Link to='/checkout'>
                    <Button color='success' block>
                      <i className='fa fa-cart-arrow-down fa-lg mr-2'></i>
                      Checkout
                    </Button>
                  </Link>
                </td>
              </tr>
            </tfoot>
          </Table>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default MiniCart;
