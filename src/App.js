/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./containers/Home/Home";
import Wrapper from "./components/Wrapper";
import LoginForm from "./containers/Form/LoginForm";
import { Switch, Route, Redirect } from "react-router-dom";
import SignupForm from "./containers/Form/SignupForm";
import Cart from "./containers/Cart/Cart";
import UserInfo from "./components/UserInfo";
import { checkLogin, fetchCartFromAPI } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "react-stripe-elements";
import Checkout from "./containers/Checkout/Checkout";
import NotFound404 from "./components/NotFound404";


function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.userReducer);
  useEffect(() => {
    if (!userInfo.isLogin) {
      dispatch(checkLogin());
    }
    dispatch(fetchCartFromAPI(userInfo.userID));
  }, [userInfo.isLogin]);

  return (
    <React.Fragment>
      <Navbar />
      <Wrapper>
        <Switch>
          <Redirect exact from='/' to='/products/All' />
          <Redirect exact from='/products' to='/products/All' />
          
          <Route path='/products/:category' component={Home} />
          <Route path='/login' exact component={LoginForm} />
          <Route path='/signup' exact component={SignupForm} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/user' exact component={UserInfo} />
          <Route path='/checkout' exact>
            {/* Stripe checkout wrapper */}
            <Elements>
              <Checkout />
            </Elements>
          </Route>
          <Route path='*' exact component={NotFound404} />
        </Switch>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;