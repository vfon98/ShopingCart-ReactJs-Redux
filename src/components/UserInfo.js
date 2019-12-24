import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import userImage from "../assets/user.png";

const UserInfo = props => {
  const cart = useSelector(state => state.cartReducer);
  const userInfo = useSelector(state => state.userReducer);
  return (
    <React.Fragment>
      {!userInfo.isLogin && <Redirect to='/login' />}

      <div className='jumbotron'>
        <div className='row align-items-center'>
          <div className='col-lg-6 pb-3 text-center'>
            <img src={userImage} className='img-fluid' alt='User Information' />
          </div>
          <div className='col-lg-6'>
            <h2 className='text-success font-weight-bold'>User information</h2>
            <hr />
            <p>
              <b>First name: </b>
              {userInfo.firstName}
            </p>
            <p>
              <b>Last name: </b>
              {userInfo.lastName}
            </p>
            <p>
              <b>Email: </b>
              {userInfo.email}
            </p>
            <p>
              <b>City: </b>
              {userInfo.city || 'Unkown'}
            </p>
            <p>
              <b>Total items in cart: </b>
              {cart.totalItems}
            </p>
            <p>
              <b>Total cart price: </b>${cart.totalPrice}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(UserInfo);
